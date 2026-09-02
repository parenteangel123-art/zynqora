-- 0002_schema.sql
-- Esquema de datos de Zynqora.
--
-- Convenciones:
--   * clave primaria uuid (gen_random_uuid())
--   * user_id uuid references auth.users(id) on delete cascade   (cada fila pertenece a UN usuario)
--   * created_at / updated_at timestamptz
--   * updated_at lo mantiene el trigger set_updated_at()
--
-- La RLS se define en 0003_rls.sql. Las funciones (RAG, cuotas) en 0004_functions.sql.

-- ---------------------------------------------------------------------------
-- helper: trigger de updated_at
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ===========================================================================
-- PLANES (tabla de referencia — lectura pública, sin user_id)
-- ===========================================================================
create table if not exists public.plans (
  key           text primary key,                       -- 'free' | 'plus' | 'pro'
  name          text not null,
  price_month   numeric(8,2) not null default 0,
  price_year    numeric(8,2) not null default 0,
  limits        jsonb not null default '{}'::jsonb,      -- { aiMessages, files, tests, flashcards, podcasts, presentations, conceptMaps, subjects }
  features      jsonb not null default '{}'::jsonb,
  sort_order    int not null default 0
);

-- ===========================================================================
-- PROFILES  (1:1 con auth.users)
-- ===========================================================================
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  name         text,
  avatar_url   text,
  language     text not null default 'es' check (language in ('es','en')),
  theme        text not null default 'system' check (theme in ('system','light','dark')),
  accent       text not null default 'violet',
  plan_key     text not null default 'free' references public.plans(key),
  onboarding   jsonb not null default '{}'::jsonb,       -- { done, source, goals[], level }
  prefs        jsonb not null default '{}'::jsonb,       -- { goalMin, sessionLength, notifications, reminder{on,time} }
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
-- NOTA: el trigger que crea el profile automáticamente (handle_new_user) se
-- define al FINAL de este archivo, cuando ya existen todas las tablas que toca.

-- ===========================================================================
-- SUBJECTS
-- ===========================================================================
create table if not exists public.subjects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  icon        text not null default 'book',
  color       text not null default '#5A54C9',
  mastery     int  not null default 0,
  archived    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists subjects_user_idx on public.subjects(user_id);
create trigger subjects_updated_at before update on public.subjects
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- DOCUMENTS  (metadatos + texto extraído + análisis)
-- ===========================================================================
create table if not exists public.documents (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  subject_id     uuid references public.subjects(id) on delete set null,
  name           text not null,
  kind           text not null default 'file' check (kind in ('text','pdf','docx','image','file')),
  mime_type      text,
  size           bigint not null default 0,
  storage_path   text,                                    -- 'documents/<uid>/<uuid>.<ext>'  (null si es texto pegado)
  status         text not null default 'processing' check (status in ('pending','processing','ready','failed')),
  status_detail  text,                                    -- código legible del error de ingesta
  text_source    text,                                    -- 'txt'|'md'|'paste'|'pdf'|'docx'|'ocr'
  extracted_text text,
  summary        text,
  metadata       jsonb not null default '{}'::jsonb,      -- { concepts[], keyPoints[], wordCount, readMin, difficulty, pages }
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists documents_user_idx    on public.documents(user_id);
create index if not exists documents_subject_idx on public.documents(subject_id);
create trigger documents_updated_at before update on public.documents
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- DOCUMENT_CHUNKS  (RAG — pgvector)
-- ===========================================================================
-- 768 dims = text-embedding-004 de Gemini. Cambia el número si usas otro modelo.
create table if not exists public.document_chunks (
  id            uuid primary key default gen_random_uuid(),
  document_id   uuid not null references public.documents(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  content       text not null,
  chunk_index   int  not null default 0,
  embedding     extensions.vector(768),
  metadata      jsonb not null default '{}'::jsonb,       -- { page, heading }
  created_at    timestamptz not null default now()
);
create index if not exists document_chunks_doc_idx  on public.document_chunks(document_id);
create index if not exists document_chunks_user_idx on public.document_chunks(user_id);
-- índice vectorial (coseno). ivfflat necesita ANALYZE tras cargar datos; hnsw no.
create index if not exists document_chunks_embedding_idx
  on public.document_chunks using hnsw (embedding extensions.vector_cosine_ops);

-- ===========================================================================
-- CONVERSATIONS + MESSAGES
-- ===========================================================================
create table if not exists public.conversations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  subject_id  uuid references public.subjects(id) on delete set null,
  document_id uuid references public.documents(id) on delete set null,
  title       text,
  thread      jsonb not null default '{}'::jsonb,         -- estado del hilo (tema, ejercicio activo, nivel…)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists conversations_user_idx on public.conversations(user_id);
create trigger conversations_updated_at before update on public.conversations
  for each row execute function public.set_updated_at();

create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id         uuid not null references auth.users(id) on delete cascade,
  role            text not null check (role in ('user','assistant','system')),
  content         text not null default '',
  html            text,                                    -- respuesta ya renderizada (assistant)
  meta            jsonb not null default '{}'::jsonb,      -- { sources[], quiz, tutor, grounded }
  created_at      timestamptz not null default now()
);
create index if not exists messages_conv_idx on public.messages(conversation_id, created_at);
create index if not exists messages_user_idx on public.messages(user_id);

-- ===========================================================================
-- CALENDAR_TASKS
-- ===========================================================================
create table if not exists public.calendar_tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  subject_id  uuid references public.subjects(id) on delete set null,
  title       text not null,
  description text,
  type        text not null default 'study' check (type in ('study','review','exercise','exam')),
  due_date    date not null,
  due_time    text,
  done        boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists calendar_tasks_user_date_idx on public.calendar_tasks(user_id, due_date);
create trigger calendar_tasks_updated_at before update on public.calendar_tasks
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- FLASHCARDS + QUIZZES  (material generado, cacheado por documento/materia)
-- ===========================================================================
create table if not exists public.flashcards (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  subject_id  uuid references public.subjects(id) on delete set null,
  question    text not null,
  answer      text not null,
  difficulty  text default 'med' check (difficulty in ('easy','med','hard')),
  source      text not null default 'ai' check (source in ('ai','local','seed','user')),
  -- estado FSRS (ts-fsrs) — nullable hasta que se repase
  stability   double precision,
  fsrs_diff   double precision,
  due         timestamptz,
  reps        int not null default 0,
  lapses      int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists flashcards_user_idx on public.flashcards(user_id);
create index if not exists flashcards_doc_idx  on public.flashcards(document_id);
create index if not exists flashcards_due_idx  on public.flashcards(user_id, due);
create trigger flashcards_updated_at before update on public.flashcards
  for each row execute function public.set_updated_at();

create table if not exists public.quizzes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  subject_id  uuid references public.subjects(id) on delete set null,
  title       text,
  difficulty  text default 'med' check (difficulty in ('easy','med','hard')),
  questions   jsonb not null default '[]'::jsonb,          -- [{ q, opts[], correct, exp }]
  source      text not null default 'ai' check (source in ('ai','local','seed')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists quizzes_user_idx on public.quizzes(user_id);
create trigger quizzes_updated_at before update on public.quizzes
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- STUDY_SESSIONS + QUIZ_RESULTS
-- ===========================================================================
create table if not exists public.study_sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  subject_id   uuid references public.subjects(id) on delete set null,
  document_id  uuid references public.documents(id) on delete set null,
  mode         text not null check (mode in ('flashcards','test','fill','review','path')),
  score        int,
  total        int,
  duration_min int not null default 0,
  meta         jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now()
);
create index if not exists study_sessions_user_idx on public.study_sessions(user_id, created_at);

create table if not exists public.quiz_results (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  quiz_id      uuid references public.quizzes(id) on delete set null,
  document_id  uuid references public.documents(id) on delete set null,
  subject_id   uuid references public.subjects(id) on delete set null,
  score        int not null,
  total        int not null,
  answers      jsonb not null default '[]'::jsonb,          -- [{ i, picked, correct }]
  wrong        jsonb not null default '[]'::jsonb,          -- índices fallados / conceptos
  created_at   timestamptz not null default now()
);
create index if not exists quiz_results_user_idx on public.quiz_results(user_id, created_at);

-- ===========================================================================
-- STREAKS  (1:1 con usuario)
-- ===========================================================================
create table if not exists public.streaks (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  current       int not null default 0,
  longest       int not null default 0,
  active_dates  date[] not null default '{}',
  last_active   date,
  updated_at    timestamptz not null default now()
);
create trigger streaks_updated_at before update on public.streaks
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- AI_USAGE  (contador de consumo por usuario / feature / periodo mensual)
-- La verdad de los límites vive AQUÍ, no en el frontend.
-- ===========================================================================
create table if not exists public.ai_usage (
  user_id     uuid not null references auth.users(id) on delete cascade,
  feature     text not null,                               -- 'aiMessages'|'files'|'tests'|'flashcards'|'podcasts'|'presentations'|'conceptMaps'
  period      text not null,                               -- 'YYYY-MM'
  count       int  not null default 0,
  updated_at  timestamptz not null default now(),
  primary key (user_id, feature, period)
);
create trigger ai_usage_updated_at before update on public.ai_usage
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- SUBSCRIPTIONS  (freemium — listo para Stripe, sin pagos por ahora)
-- ===========================================================================
create table if not exists public.subscriptions (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null unique references auth.users(id) on delete cascade,
  plan_key              text not null default 'free' references public.plans(key),
  status                text not null default 'active' check (status in ('active','trialing','past_due','canceled')),
  billing_interval      text check (billing_interval in ('month','year')),
  stripe_customer_id    text,
  stripe_subscription_id text,
  current_period_end    timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- mantiene profiles.plan_key sincronizado con la suscripción activa
create or replace function public.sync_profile_plan()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.profiles
     set plan_key = case when new.status in ('active','trialing') then new.plan_key else 'free' end
   where id = new.user_id;
  return new;
end;
$$;
drop trigger if exists subscriptions_sync_plan on public.subscriptions;
create trigger subscriptions_sync_plan after insert or update on public.subscriptions
  for each row execute function public.sync_profile_plan();

-- ===========================================================================
-- Alta de usuario -> crea profile + streaks (ahora que ya existen todas las tablas)
-- ===========================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  insert into public.streaks (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

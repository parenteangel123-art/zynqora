-- 0003_rls.sql
-- Row Level Security: cada usuario SOLO ve y toca sus propias filas.
-- `plans` es la única tabla con lectura pública (catálogo de precios).
--
-- Patrón por tabla con user_id:
--   select / insert / update / delete  ->  using/with check (auth.uid() = user_id)
--
-- Nada de esto se puede saltar desde el frontend: la política la aplica Postgres.
-- El `service_role` (solo backend / Edge Functions) sí puede saltarse la RLS —
-- por eso la clave service_role NUNCA sale del servidor.

-- ---------- PLANS: lectura pública, escritura nadie (solo migraciones / dashboard)
alter table public.plans enable row level security;
drop policy if exists plans_read on public.plans;
create policy plans_read on public.plans for select using (true);

-- ---------- helper macro (se repite el mismo bloque por tabla)
-- PROFILES
alter table public.profiles enable row level security;
drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
drop policy if exists profiles_delete on public.profiles;
create policy profiles_select on public.profiles for select using (auth.uid() = id);
create policy profiles_insert on public.profiles for insert with check (auth.uid() = id);
create policy profiles_update on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy profiles_delete on public.profiles for delete using (auth.uid() = id);

-- STREAKS
alter table public.streaks enable row level security;
drop policy if exists streaks_all on public.streaks;
create policy streaks_all on public.streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- SUBJECTS
alter table public.subjects enable row level security;
drop policy if exists subjects_all on public.subjects;
create policy subjects_all on public.subjects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- DOCUMENTS
alter table public.documents enable row level security;
drop policy if exists documents_all on public.documents;
create policy documents_all on public.documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- DOCUMENT_CHUNKS
alter table public.document_chunks enable row level security;
drop policy if exists document_chunks_all on public.document_chunks;
create policy document_chunks_all on public.document_chunks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- CONVERSATIONS
alter table public.conversations enable row level security;
drop policy if exists conversations_all on public.conversations;
create policy conversations_all on public.conversations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- MESSAGES
alter table public.messages enable row level security;
drop policy if exists messages_all on public.messages;
create policy messages_all on public.messages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- CALENDAR_TASKS
alter table public.calendar_tasks enable row level security;
drop policy if exists calendar_tasks_all on public.calendar_tasks;
create policy calendar_tasks_all on public.calendar_tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- FLASHCARDS
alter table public.flashcards enable row level security;
drop policy if exists flashcards_all on public.flashcards;
create policy flashcards_all on public.flashcards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- QUIZZES
alter table public.quizzes enable row level security;
drop policy if exists quizzes_all on public.quizzes;
create policy quizzes_all on public.quizzes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- STUDY_SESSIONS
alter table public.study_sessions enable row level security;
drop policy if exists study_sessions_all on public.study_sessions;
create policy study_sessions_all on public.study_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- QUIZ_RESULTS
alter table public.quiz_results enable row level security;
drop policy if exists quiz_results_all on public.quiz_results;
create policy quiz_results_all on public.quiz_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- AI_USAGE  (el usuario puede LEER su consumo; solo el backend lo ESCRIBE via service_role)
alter table public.ai_usage enable row level security;
drop policy if exists ai_usage_select on public.ai_usage;
create policy ai_usage_select on public.ai_usage for select using (auth.uid() = user_id);
-- sin políticas de insert/update -> desde el cliente es de solo lectura.

-- SUBSCRIPTIONS  (el usuario LEE su plan; solo el backend / webhook de Stripe lo cambia)
alter table public.subscriptions enable row level security;
drop policy if exists subscriptions_select on public.subscriptions;
create policy subscriptions_select on public.subscriptions for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- STORAGE: políticas sobre storage.objects para los buckets de la app.
-- Estructura de ruta:  documents/<user_id>/<file>.<ext>
-- ---------------------------------------------------------------------------
drop policy if exists "documents read own"   on storage.objects;
drop policy if exists "documents write own"  on storage.objects;
drop policy if exists "documents update own" on storage.objects;
drop policy if exists "documents delete own" on storage.objects;

create policy "documents read own" on storage.objects for select
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "documents write own" on storage.objects for insert
  with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "documents update own" on storage.objects for update
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "documents delete own" on storage.objects for delete
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars read"       on storage.objects;
drop policy if exists "avatars write own"  on storage.objects;
create policy "avatars read" on storage.objects for select using (bucket_id = 'avatars');
create policy "avatars write own" on storage.objects for insert
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

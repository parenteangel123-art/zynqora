-- supabase/tests/rls_test.sql
-- Pruebas de Row Level Security con pgTAP.
-- Ejecutar con:  supabase test db
--
-- Requiere pgTAP:  create extension if not exists pgtap with schema extensions;
--
-- Crea dos usuarios de prueba, comprueba que NINGUNO ve los datos del otro.

begin;
select plan(24);

-- ---- pgTAP disponible ----
select has_extension('vector');
select has_extension('pgcrypto');

-- ---- RLS activada en todas las tablas con user_id ----
select ok((select relrowsecurity from pg_class where relname = 'profiles'), 'RLS on profiles');
select ok((select relrowsecurity from pg_class where relname = 'subjects'), 'RLS on subjects');
select ok((select relrowsecurity from pg_class where relname = 'documents'), 'RLS on documents');
select ok((select relrowsecurity from pg_class where relname = 'document_chunks'), 'RLS on document_chunks');
select ok((select relrowsecurity from pg_class where relname = 'conversations'), 'RLS on conversations');
select ok((select relrowsecurity from pg_class where relname = 'messages'), 'RLS on messages');
select ok((select relrowsecurity from pg_class where relname = 'calendar_tasks'), 'RLS on calendar_tasks');
select ok((select relrowsecurity from pg_class where relname = 'flashcards'), 'RLS on flashcards');
select ok((select relrowsecurity from pg_class where relname = 'quizzes'), 'RLS on quizzes');
select ok((select relrowsecurity from pg_class where relname = 'study_sessions'), 'RLS on study_sessions');
select ok((select relrowsecurity from pg_class where relname = 'quiz_results'), 'RLS on quiz_results');
select ok((select relrowsecurity from pg_class where relname = 'streaks'), 'RLS on streaks');
select ok((select relrowsecurity from pg_class where relname = 'ai_usage'), 'RLS on ai_usage');
select ok((select relrowsecurity from pg_class where relname = 'subscriptions'), 'RLS on subscriptions');

-- ---- usuarios de prueba ----
insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'a@test.dev'),
  ('22222222-2222-2222-2222-222222222222', 'b@test.dev')
on conflict do nothing;

-- datos del usuario A
set local role authenticated;
set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
insert into public.subjects (id, user_id, name) values
  ('aaaaaaaa-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Historia A');

select is(
  (select count(*)::int from public.subjects),
  1,
  'A ve su propia materia'
);

-- ahora como usuario B
set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from public.subjects),
  0,
  'B NO ve la materia de A'
);

select is(
  (select count(*)::int from public.subjects where id = 'aaaaaaaa-0000-0000-0000-000000000001'),
  0,
  'B NO puede leer la materia de A por id'
);

-- B intenta modificar la materia de A -> 0 filas afectadas
with upd as (
  update public.subjects set name = 'hackeada'
  where id = 'aaaaaaaa-0000-0000-0000-000000000001'
  returning 1
)
select is((select count(*)::int from upd), 0, 'B NO puede modificar la materia de A');

-- plans es público
select ok(
  (select count(*) from public.plans) >= 1,
  'plans es legible por usuario autenticado'
);

-- ai_usage: sin política de insert desde el cliente
select throws_ok(
  $$ insert into public.ai_usage (user_id, feature, period, count)
     values ('22222222-2222-2222-2222-222222222222', 'aiMessages', '2025-01', 5) $$,
  '42501',
  null,
  'cliente NO puede escribir en ai_usage'
);

select * from finish();
rollback;

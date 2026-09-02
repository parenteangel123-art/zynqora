-- 0004_functions.sql
-- Funciones RPC que usan las Edge Functions (y opcionalmente el cliente).

-- ===========================================================================
-- RAG: búsqueda semántica de chunks de UN documento (o de toda la materia).
-- Devuelve los trozos más parecidos a `query_embedding` (distancia coseno).
-- La RLS sigue aplicando: solo verás tus propios chunks aunque llames a la función.
-- ===========================================================================
create or replace function public.match_document_chunks(
  query_embedding extensions.vector(768),
  match_count     int  default 6,
  p_document_id   uuid default null,
  p_subject_id    uuid default null
)
returns table (
  id          uuid,
  document_id uuid,
  content     text,
  chunk_index int,
  similarity  float,
  metadata    jsonb
)
language sql stable
set search_path = public, extensions
as $$
  select
    c.id,
    c.document_id,
    c.content,
    c.chunk_index,
    1 - (c.embedding <=> query_embedding) as similarity,
    c.metadata
  from public.document_chunks c
  left join public.documents d on d.id = c.document_id
  where c.user_id = auth.uid()
    and c.embedding is not null
    and (p_document_id is null or c.document_id = p_document_id)
    and (p_subject_id  is null or d.subject_id  = p_subject_id)
  order by c.embedding <=> query_embedding
  limit greatest(1, least(match_count, 20));
$$;

-- ===========================================================================
-- CUOTAS: comprueba y consume 1 (o n) unidades de una feature en el mes actual.
-- SECURITY DEFINER -> escribe en ai_usage saltándose la RLS de escritura.
-- Devuelve:
--   { allowed: bool, feature, period, used, limit, remaining }
-- Si allowed = false, la Edge Function corta y devuelve 402 al frontend.
-- ===========================================================================
create or replace function public.consume_quota(
  p_feature text,
  p_amount  int default 1
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user   uuid := auth.uid();
  v_period text := to_char(now(), 'YYYY-MM');
  v_plan   text;
  v_limit  numeric;
  v_used   int;
  v_new    int;
begin
  if v_user is null then
    return jsonb_build_object('allowed', false, 'reason', 'no_auth');
  end if;

  select coalesce(p.plan_key, 'free') into v_plan from public.profiles p where p.id = v_user;
  if v_plan is null then v_plan := 'free'; end if;

  select (limits ->> p_feature) into v_limit from public.plans where key = v_plan;
  -- feature sin límite declarado -> ilimitada
  if v_limit is null then
    return jsonb_build_object('allowed', true, 'feature', p_feature, 'period', v_period,
                              'used', null, 'limit', null, 'remaining', null);
  end if;

  select count into v_used from public.ai_usage
   where user_id = v_user and feature = p_feature and period = v_period;
  v_used := coalesce(v_used, 0);

  if v_used + p_amount > v_limit then
    return jsonb_build_object('allowed', false, 'reason', 'limit_reached',
      'feature', p_feature, 'period', v_period,
      'used', v_used, 'limit', v_limit, 'remaining', greatest(0, v_limit - v_used)::int);
  end if;

  v_new := least(v_used + p_amount, v_limit::int);
  insert into public.ai_usage (user_id, feature, period, count)
  values (v_user, p_feature, v_period, v_new)
  on conflict (user_id, feature, period)
  do update set count = least(public.ai_usage.count + p_amount, v_limit::int), updated_at = now();

  return jsonb_build_object('allowed', true, 'feature', p_feature, 'period', v_period,
    'used', v_new, 'limit', v_limit::int, 'remaining', (v_limit - v_new)::int);
end;
$$;

-- lectura del consumo del mes (para pintar los contadores del frontend)
create or replace function public.current_usage()
returns jsonb
language sql stable
as $$
  select coalesce(jsonb_object_agg(feature, count), '{}'::jsonb)
  from public.ai_usage
  where user_id = auth.uid() and period = to_char(now(), 'YYYY-MM');
$$;

-- ===========================================================================
-- Borrado completo de la cuenta del usuario (RGPD / "eliminar mi cuenta").
-- Borra auth.users -> cascada elimina todo lo demás.
-- ===========================================================================
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'no auth'; end if;
  delete from auth.users where id = v_user;   -- on delete cascade limpia el resto
end;
$$;

-- ===========================================================================
-- Racha: registra actividad de hoy y recalcula (misma lógica que el frontend).
-- ===========================================================================
create or replace function public.touch_streak()
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_today date := (now() at time zone 'utc')::date;
  v_row public.streaks%rowtype;
  v_cur int;
begin
  select * into v_row from public.streaks where user_id = v_user for update;
  if not found then
    insert into public.streaks (user_id, current, longest, active_dates, last_active)
    values (v_user, 1, 1, array[v_today], v_today) returning * into v_row;
    return jsonb_build_object('current', 1, 'longest', 1);
  end if;

  if v_today = any(v_row.active_dates) then
    return jsonb_build_object('current', v_row.current, 'longest', v_row.longest);
  end if;

  if v_row.last_active = v_today - 1 or array_length(v_row.active_dates,1) is null then
    v_cur := v_row.current + 1;
  else
    v_cur := 1;
  end if;

  update public.streaks
     set current = v_cur,
         longest = greatest(v_cur, v_row.longest),
         active_dates = array_append(v_row.active_dates, v_today),
         last_active = v_today
   where user_id = v_user;

  return jsonb_build_object('current', v_cur, 'longest', greatest(v_cur, v_row.longest));
end;
$$;

grant execute on function public.match_document_chunks(extensions.vector, int, uuid, uuid) to authenticated;
grant execute on function public.consume_quota(text, int) to authenticated;
grant execute on function public.current_usage() to authenticated;
grant execute on function public.delete_my_account() to authenticated;
grant execute on function public.touch_streak() to authenticated;

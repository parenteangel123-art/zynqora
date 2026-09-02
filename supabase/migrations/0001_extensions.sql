-- 0001_extensions.sql
-- Extensiones de PostgreSQL que necesita Zynqora.
-- pgvector -> búsqueda semántica (RAG).  pgcrypto -> gen_random_uuid().

create extension if not exists "pgcrypto"  with schema extensions;
create extension if not exists "vector"    with schema extensions;

-- (opcional, para depurar consultas lentas en producción)
-- create extension if not exists "pg_stat_statements" with schema extensions;

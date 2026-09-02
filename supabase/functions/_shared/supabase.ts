// _shared/supabase.ts — clientes de Supabase para las Edge Functions
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

/**
 * Cliente "en nombre del usuario": reenvía el JWT del header Authorization.
 * TODA consulta pasa por RLS -> el usuario solo ve lo suyo.
 */
export function userClient(req: Request): SupabaseClient {
  const auth = req.headers.get("Authorization") || "";
  return createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Cliente admin (service_role): se SALTA la RLS.
 * Úsalo SOLO para operaciones de sistema (escribir ai_usage, actualizar status
 * de un documento tras la ingesta…). Nunca para leer datos "en nombre" del usuario
 * sin filtrar por user_id.
 */
export function adminClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export interface AuthedUser {
  id: string;
  email: string | null;
}

/** Verifica el JWT y devuelve el usuario, o null si no es válido. */
export async function getUser(req: Request): Promise<AuthedUser | null> {
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const admin = adminClient();
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data?.user) return null;
  return { id: data.user.id, email: data.user.email ?? null };
}

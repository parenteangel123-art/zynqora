// _shared/http.ts — CORS + helpers de respuesta JSON

const ALLOWED = (Deno.env.get("ALLOWED_ORIGIN") || "*").split(",").map((s) => s.trim());

export function corsHeaders(origin: string | null): HeadersInit {
  const allow = ALLOWED.includes("*")
    ? "*"
    : (origin && ALLOWED.includes(origin) ? origin : ALLOWED[0] || "*");
  return {
    "access-control-allow-origin": allow,
    "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
    "access-control-allow-methods": "POST, OPTIONS",
    "vary": "origin",
  };
}

export function json(body: unknown, status = 200, extra: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...extra },
  });
}

/** 402 con forma estable para que el frontend muestre el modal de "límite alcanzado". */
export function limitReached(quota: Record<string, unknown>, extra: HeadersInit = {}): Response {
  return json({ error: "limit_reached", code: "LIMIT_REACHED", quota }, 402, extra);
}

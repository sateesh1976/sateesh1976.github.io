const ORIGIN_ALLOW_PATTERNS: RegExp[] = [
  /^https:\/\/sateeshsingh\.lovable\.app$/,
  /^https:\/\/[a-z0-9-]+\.lovable\.app$/,
  /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/,
  /^https:\/\/[a-z0-9-]+\.sandbox\.lovable\.dev$/,
  /^https:\/\/sateesh1976\.github\.io$/,
  /^https:\/\/[a-z0-9-]+\.github\.io$/,
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/,
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ORIGIN_ALLOW_PATTERNS.some((re) => re.test(origin));
}

function buildCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = isAllowedOrigin(origin) ? (origin as string) : "https://sateeshsingh.lovable.app";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Vary": "Origin",
  };
}

// Constant-time-ish string compare
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!isAllowedOrigin(origin)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Shared-secret verification via request body (avoids CORS preflight
  // issues with custom headers behind the Supabase edge gateway).
  const body = await req.json().catch(() => ({}));
  const sharedSecret = Deno.env.get("EDGE_SHARED_SECRET");
  const providedSecret = typeof body?.secret === "string" ? body.secret : "";
  if (!sharedSecret || !safeEqual(providedSecret, sharedSecret)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }


  try {
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    const agentId = Deno.env.get("ELEVENLABS_AGENT_ID");
    if (!apiKey || !agentId) {
      return new Response(JSON.stringify({ error: "Voice assistant not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
      { headers: { "xi-api-key": apiKey } },
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("ElevenLabs token error:", res.status, err);
      return new Response(JSON.stringify({ error: "Token request failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ token: data.token }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("elevenlabs-token error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

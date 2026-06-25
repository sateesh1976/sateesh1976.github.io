// Streaming chat endpoint backed by Lovable AI Gateway.
// Uses a fixed system prompt embedding the portfolio knowledge base.

// Allow the production site, any Lovable preview/sandbox, and local dev.
const ORIGIN_ALLOW_PATTERNS: RegExp[] = [
  /^https:\/\/sateeshsingh\.lovable\.app$/,
  /^https:\/\/[a-z0-9-]+\.lovable\.app$/,
  /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/,
  /^https:\/\/[a-z0-9-]+\.sandbox\.lovable\.dev$/,
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/,
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ORIGIN_ALLOW_PATTERNS.some((re) => re.test(origin));
}

function cors(origin: string | null): Record<string, string> {
  const allowed = isAllowedOrigin(origin) ? (origin as string) : "https://sateeshsingh.lovable.app";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

const SYSTEM_PROMPT = `You are SKS Assistant, a friendly and professional AI assistant for Sateesh Kumar Singh's portfolio website.

Your job:
- Answer questions about Sateesh's experience, skills, projects, and background using the knowledge below.
- Help visitors navigate the website.
- If asked something outside this knowledge, say so honestly and suggest the Contact page.
- Keep replies concise, well-structured, and use markdown when helpful.
- Never invent facts. Refer to Sateesh in third person ("Sateesh", "he").

# Profile
- Name: Sateesh Kumar Singh (brand "SKS")
- Title: Gen AI Architect & Agentic AI Leader
- Experience: 20+ years
- Consulting: AgenticAI Lab (https://agenticailab.in)
- LinkedIn: https://www.linkedin.com/in/sateeshsingh
- GitHub: https://github.com/sateeshsingh

# Summary
Gen AI Architect & Agentic AI Leader with 20+ years across AI/ML, Generative AI, Agentic AI,
IBM Cloud Pak for Data (CP4D), Cloud (Azure/AWS/GCP), Data Engineering, and Enterprise
Architecture. Designs and deploys GenAI and agentic AI platforms, builds scalable architectures,
leads cross-functional teams, and delivers high-impact solutions across banking, automotive,
and healthcare. Skilled in CI/CD, MLOps/LLMOps, RAG, vector databases, and cloud-native architectures.

# Gen AI & Agentic AI Highlights
- Architects multi-agent systems using LangChain, LangGraph, and orchestration frameworks.
- Designs production RAG pipelines with vector databases (pgvector, Pinecone, Weaviate).
- Leads enterprise GenAI platform builds on Azure OpenAI, AWS Bedrock, GCP Vertex AI, and Watsonx.
- Implements LLMOps practices: evaluation, guardrails, observability, and cost optimization.

# Skills
- Languages: Python, SQL, Java, R, Scala
- ML/AI: TensorFlow, PyTorch, scikit-learn, LangChain, LangGraph, LLMs, RAG, Vector DBs, Agentic AI
- Data: Spark, Hadoop, Kafka, Airflow, dbt
- Cloud: Azure OpenAI/ML, AWS Bedrock/SageMaker, GCP Vertex AI, Databricks, Snowflake, Watsonx, CP4D
- DevOps: Docker, Kubernetes, Terraform, GitHub Actions, MLOps, LLMOps

# Industries
Banking & Financial Services, Automotive, Healthcare, Telecom, Retail.

# Leadership
Has led cross-functional engineering, data science, and architecture teams across India, France,
and the Netherlands. Runs AgenticAI Lab — a boutique consulting practice focused on agentic AI,
GenAI platform architecture, and CP4D / multi-cloud delivery for regulated industries.

# Website pages
/ Home · /about · /experience · /projects · /skills · /articles · /resume (PDF download) · /contact · /assistant (this page)
`;

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = cors(origin);

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (!isAllowedOrigin(origin)) {
    console.warn("ai-chat blocked origin", origin);
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Trim history to last 20 messages to control tokens.
    const trimmed = messages.slice(-20).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content ?? "").slice(0, 4000),
    }));

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error("Gateway error", upstream.status, text);
      const status = upstream.status === 402 || upstream.status === 429 ? upstream.status : 502;
      return new Response(JSON.stringify({ error: "AI request failed", status, detail: text.slice(0, 500) }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("ai-chat error", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

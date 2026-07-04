import { useState } from "react";
import { z } from "zod";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const emailSchema = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(255);

const NEWSLETTER_URL = "https://tenif.app.n8n.cloud/webhook/MyLinkedInNewsletter";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Invalid email");
      return;
    }
    setStatus("loading");
    const payload = {
      action: "subscribe" as const,
      email: parsed.data,
      timestamp: new Date().toISOString(),
    };
    console.info("[newsletter] subscribe", payload);
    try {
      const qs = new URLSearchParams({
        action: payload.action,
        email: payload.email,
        timestamp: payload.timestamp,
      }).toString();
      const url = `${NEWSLETTER_URL}?${qs}`;

      // Try GET first (n8n webhook is registered as GET). Fall back to POST,
      // then no-cors POST if CORS blocks the browser from reading a response.
      try {
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) throw new Error(`GET failed (${res.status})`);
      } catch (getErr) {
        console.warn("[newsletter] GET failed, trying POST", getErr);
        try {
          const res = await fetch(NEWSLETTER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(`POST failed (${res.status})`);
        } catch (postErr) {
          console.warn("[newsletter] POST failed, sending no-cors", postErr);
          await fetch(url, { method: "GET", mode: "no-cors" });
        }
      }
      setStatus("success");
      toast.success("Subscribed! Check your inbox for upcoming editions.");
      setEmail("");
    } catch (err) {
      console.error("[newsletter] subscribe failed", err);
      setStatus("idle");
      toast.error(err instanceof Error ? err.message : "Subscription failed. Please try again.");
    }
  };


  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-10 shadow-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-60"
      />

      <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium mb-3">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            LinkedIn Newsletter
          </div>
          <h3 id="newsletter-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
            Practical AI &amp; enterprise data, in your inbox.
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
            Weekly insights on Generative AI, Agentic AI, MLOps, and building
            production-grade intelligent systems. No spam, unsubscribe anytime.
          </p>
        </div>

        <div>
          {status === "success" ? (
            <div
              className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              You're subscribed. Welcome aboard!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring inline-flex items-center justify-center gap-2 shadow-md shadow-primary/20"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            By subscribing you agree to receive email updates. Unsubscribe from any email.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;

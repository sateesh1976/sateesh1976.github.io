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
      // Prefer POST + JSON for consistency with the unsubscribe action.
      let res = await fetch(NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        // Backward-compat GET fallback (existing webhook behaviour).
        res = await fetch(`${NEWSLETTER_URL}?email=${encodeURIComponent(parsed.data)}&action=subscribe`, {
          method: "GET",
        });
      }
      if (!res.ok) throw new Error(`Subscription failed (${res.status})`);
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
    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Mail className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Subscribe to my LinkedIn Newsletter</h3>
          <p className="text-sm text-muted-foreground">Weekly insights on AI, ML, and enterprise data strategy.</p>
        </div>
      </div>

      {status === "success" ? (
        <div
          className="flex items-center gap-2 text-sm text-primary"
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
            className="flex-1 h-11 rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring inline-flex items-center justify-center gap-2"
          >
            {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        You can unsubscribe at any time. We respect your inbox.
      </p>
    </div>
  );
};

export default NewsletterSubscribe;

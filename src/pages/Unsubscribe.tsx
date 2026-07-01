import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";

const emailSchema = z.string().trim().toLowerCase().email().max(255);

// Same n8n webhook used for subscribe; the `action` field differentiates intent.
const NEWSLETTER_WEBHOOK = "https://tenif.app.n8n.cloud/webhook/MyLinkedInNewsletter";

type Status = "idle" | "loading" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const initialEmail = params.get("email") ?? "";
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Unsubscribe — Sateesh Kumar Singh";
  }, []);

  const submitUnsubscribe = async (rawEmail: string) => {
    const parsed = emailSchema.safeParse(rawEmail);
    if (!parsed.success) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    const payload = {
      action: "unsubscribe" as const,
      email: parsed.data,
      timestamp: new Date().toISOString(),
    };

    setStatus("loading");
    setMessage("");
    console.info("[unsubscribe] sending webhook", { url: NEWSLETTER_WEBHOOK, payload });

    // n8n webhook is registered as GET; try that first, then POST fallbacks.
    try {
      const qs = new URLSearchParams({
        action: payload.action,
        email: payload.email,
        timestamp: payload.timestamp,
      }).toString();
      const getUrl = `${NEWSLETTER_WEBHOOK}?${qs}`;
      try {
        const res = await fetch(getUrl, { method: "GET" });
        if (!res.ok) throw new Error(`GET failed (${res.status})`);
      } catch (getErr) {
        console.warn("[unsubscribe] GET failed, trying POST", getErr);
        try {
          const res = await fetch(NEWSLETTER_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(`POST failed (${res.status})`);
        } catch (postErr) {
          console.warn("[unsubscribe] POST failed, sending no-cors", postErr);
          await fetch(getUrl, { method: "GET", mode: "no-cors" });
        }
      }
      setStatus("success");
      setMessage("You have been unsubscribed. Sorry to see you go!");
    } catch (finalErr) {
      console.error("[unsubscribe] all attempts failed", finalErr);
      setStatus("error");
      setMessage("Could not process your request. Please email us to unsubscribe.");
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitUnsubscribe(email);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Mail className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium uppercase tracking-wide">Newsletter</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Unsubscribe</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sorry to see you go. Confirm your email address and we'll remove you from future editions.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <label htmlFor="unsub-email" className="block text-sm font-medium">Email address</label>
          <input
            id="unsub-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            disabled={status === "loading" || status === "success"}
            className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            placeholder="you@example.com"
          />

          <button
            type="submit"
            disabled={status === "loading" || status === "success" || !email}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {status === "success" ? "Unsubscribed" : "Confirm unsubscribe"}
          </button>
        </form>

        {status === "error" && message && (
          <div className="mt-4 flex items-start gap-2 text-sm text-destructive" role="alert">
            <AlertCircle className="w-4 h-4 mt-0.5" aria-hidden="true" />
            <span>{message}</span>
          </div>
        )}
        {status === "success" && (
          <div className="mt-4 flex items-start gap-2 text-sm text-primary" role="status" aria-live="polite">
            <CheckCircle2 className="w-4 h-4 mt-0.5" aria-hidden="true" />
            <span>{message}</span>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Unsubscribe;

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";

const emailSchema = z.string().trim().toLowerCase().email().max(255);

const UNSUBSCRIBE_URL = "https://sateesh1976.github.io/unsubscribe";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const initialEmail = params.get("email") ?? "";
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const target = useMemo(() => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) return null;
    return `${UNSUBSCRIBE_URL}?email=${encodeURIComponent(parsed.data)}`;
  }, [email]);

  useEffect(() => {
    document.title = "Unsubscribe — Sateesh Kumar Singh";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      // Redirect to the canonical unsubscribe endpoint.
      window.location.href = `${UNSUBSCRIBE_URL}?email=${encodeURIComponent(parsed.data)}`;
      setStatus("success");
      setMessage("Redirecting to confirm your unsubscription…");
    } catch {
      setStatus("error");
      setMessage("Could not process your request. Please try again.");
    }
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
              if (status !== "idle") setStatus("idle");
            }}
            className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="you@example.com"
          />

          <button
            type="submit"
            disabled={status === "loading" || !target}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            Confirm unsubscribe
          </button>
        </form>

        {status === "error" && (
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

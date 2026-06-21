import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, AlertCircle, Loader2 } from "lucide-react";
import { fetchLinkedInArticles, type LinkedInArticle } from "@/lib/linkedinArticles";
import NewsletterSubscribe from "./NewsletterSubscribe";

const formatDate = (d: Date | null, fallback: string) => {
  if (!d) return fallback;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const ArticlesSection = () => {
  const [articles, setArticles] = useState<LinkedInArticle[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string>("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchLinkedInArticles(controller.signal)
      .then((data) => {
        setArticles(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err?.message || "Unable to load articles.");
        setStatus("error");
      });
    return () => controller.abort();
  }, []);

  const visible = showAll ? articles : articles.slice(0, 8);

  return (
    <section
      id="articles"
      aria-label="LinkedIn articles"
      className="py-20 bg-secondary/20 border-t border-border/40"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">LinkedIn Articles</span>
          </h2>
          <p className="text-muted-foreground">
            Daily writing on AI, ML, data, and enterprise architecture — sourced live from my publishing calendar.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {status === "loading" && (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2" role="status" aria-live="polite">
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Loading latest articles…</span>
            </div>
          )}

          {status === "error" && (
            <div
              className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Couldn't load articles.</p>
                <p className="opacity-80">{error}</p>
              </div>
            </div>
          )}

          {status === "ready" && articles.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">No articles published yet — check back soon.</div>
          )}

          {status === "ready" && articles.length > 0 && (
            <>
              <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden">
                {visible.map((article, idx) => {
                  const Content = (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground sm:w-36 shrink-0">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <time dateTime={article.date?.toISOString().slice(0, 10) || undefined}>
                          {formatDate(article.date, article.dateLabel)}
                        </time>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {article.topic}
                        </p>
                      </div>
                      {article.url && (
                        <ExternalLink
                          className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );

                  return (
                    <li key={`${article.articleId}-${idx}`}>
                      {article.url ? (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block hover:bg-primary/5 focus:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-colors"
                          aria-label={`Read on LinkedIn: ${article.topic}`}
                        >
                          {Content}
                        </a>
                      ) : (
                        <div className="group">{Content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {articles.length > 8 && (
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAll((s) => !s)}
                    className="text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1"
                  >
                    {showAll ? "Show less" : `Show all ${articles.length} articles`}
                  </button>
                </div>
              )}
            </>
          )}

          <div className="mt-10">
            <NewsletterSubscribe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, Mail } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404: route not found —", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page not found — Sateesh Kumar Singh"
        description="The page you were looking for doesn't exist or has been moved."
        path={location.pathname}
      />
      <section className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="section-container max-w-xl text-center">
          <p className="text-7xl md:text-8xl font-bold gradient-text leading-none">404</p>
          <h1 className="mt-4 text-2xl md:text-3xl font-semibold">This page took a detour.</h1>
          <p className="mt-3 text-muted-foreground">
            The link may be broken, or the page may have moved. Let's get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" /> Back to home
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-border bg-card hover:bg-secondary/60 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Go back
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> Report issue
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;

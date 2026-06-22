import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import NewsletterSubscribe from "./NewsletterSubscribe";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border/50 bg-secondary/30" role="contentinfo">
      <div className="section-container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-bold text-lg mb-3">
              <span className="gradient-text">Sateesh Kumar Singh</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Senior Data Scientist & Technology Leader. 20+ years across AI/ML, Cloud, and Enterprise Architecture.
            </p>
            <nav className="flex gap-3" aria-label="Social links">
              {[
                { href: "https://www.linkedin.com/in/sateesh-singh-2224b666/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://github.com/sateesh1976/", icon: Github, label: "GitHub" },
                { href: "https://agenticailab.in/", icon: Globe, label: "Website" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={l.label}
                >
                  <l.icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Explore</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/experience", label: "Experience" },
                { to: "/projects", label: "Projects" },
                { to: "/skills", label: "Skills" },
                { to: "/articles", label: "Articles" },
                { to: "/resume", label: "Resume" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Get in touch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:sateesh.singh76@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" /> sateesh.singh76@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919920074439" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" aria-hidden="true" /> +91-9920074439
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" aria-hidden="true" /> Mumbai, Maharashtra, India
              </li>
            </ul>
            <div className="mt-5">
              <NewsletterSubscribe />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sateesh Kumar Singh. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/unsubscribe" className="hover:text-primary transition-colors">Unsubscribe</Link>
            <a href="https://agenticailab.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">AgenticAI Lab</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

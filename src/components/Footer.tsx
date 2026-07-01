import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ArrowUpRight, Download, MessageCircle } from "lucide-react";
import NewsletterSubscribe from "./NewsletterSubscribe";


const exploreLinks = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
];

const resourceLinks = [
  { to: "/articles", label: "Articles" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
  { to: "/unsubscribe", label: "Unsubscribe" },
];

const socials = [
  { href: "https://www.linkedin.com/in/sateesh-singh-2224b666/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/sateesh1976/", icon: Github, label: "GitHub" },
  { href: "https://agenticailab.in/", icon: Globe, label: "AgenticAI Lab" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-border/60 bg-gradient-to-b from-secondary/20 to-secondary/40"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Site footer</h2>

      <div className="section-container py-14 lg:py-16">
        <div className="mb-10 lg:mb-12">
          <NewsletterSubscribe />
        </div>

        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12">

          {/* Brand + identity */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-bold text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-label="Sateesh Kumar Singh — Home"
            >
              <span className="gradient-text">Sateesh Kumar Singh</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-sm">
              Principal Consultant | Agentic AI Leader with 20+ years across
              AI/ML, Generative AI, Cloud, and Enterprise Architecture. Helping teams
              ship meaningful, production-grade intelligent systems.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="w-4 h-4" aria-hidden="true" /> Get in touch
              </Link>
              <a
                href="/Sateesh_Singh.pdf"
                download="Sateesh_Singh_Resume.pdf"
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="w-4 h-4" aria-hidden="true" /> Download CV
              </a>
            </div>

            <nav className="mt-6 flex gap-2" aria-label="Social media">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-foreground/80">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-foreground/80">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              {resourceLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://agenticailab.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  AgenticAI Lab <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-foreground/80">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:sateesh.singh76@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">sateesh.singh76@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919920074439"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" /> +91 99200 74439
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" /> Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Sateesh Kumar Singh. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with care in Mumbai
            <span aria-hidden="true">·</span>
            <Link to="/contact" className="hover:text-primary transition-colors">Available for select engagements</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-secondary/30 border-t border-border/50" role="contentinfo">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Open to discussing AI/ML projects, consulting opportunities, and technology partnerships.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <a
              href="mailto:sateesh.singh76@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-2 py-1"
              aria-label="Email sateesh.singh76@gmail.com"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span>sateesh.singh76@gmail.com</span>
            </a>
            <a
              href="tel:+919920074439"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-2 py-1"
              aria-label="Call +91-9920074439"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span>+91-9920074439</span>
            </a>
            <div className="flex items-center gap-2 text-muted-foreground px-2 py-1">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>

          <nav className="flex justify-center gap-4 mb-10" aria-label="Social links">
            {[
              { href: "https://www.linkedin.com/in/sateesh-singh-2224b666/", icon: Linkedin, label: "LinkedIn" },
              { href: "https://github.com/sateesh1976/", icon: Github, label: "GitHub" },
              { href: "https://agenticailab.in/", icon: Globe, label: "Website" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </nav>

          <div className="mb-10">
            <p className="text-sm text-muted-foreground mb-2">International Experience</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Bordeaux, France", "Paris, France", "Rennes, France", "Groningen, Netherlands"].map((location) => (
                <span key={location} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/50">
                  {location}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sateesh Kumar Singh. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;

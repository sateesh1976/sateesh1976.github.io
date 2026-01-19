import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-secondary/30 border-t border-border/50">
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

          {/* Contact Grid */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <a
              href="mailto:sateesh.singh76@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>sateesh.singh76@gmail.com</span>
            </a>
            <a
              href="tel:+919920074439"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+91-9920074439</span>
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10">
            <a
              href="https://www.linkedin.com/in/sateesh-singh-2224b666/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://github.com/sateesh1976/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://techconsultingmum.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
            >
              <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Onsite Experience */}
          <div className="mb-10">
            <p className="text-sm text-muted-foreground mb-2">International Experience</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Bordeaux, France", "Paris, France", "Rennes, France", "Groningen, Netherlands"].map((location, index) => (
                <span key={index} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/50">
                  {location}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
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

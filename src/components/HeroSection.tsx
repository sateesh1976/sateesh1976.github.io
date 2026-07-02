import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Download, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const PROFILE_IMG = `${import.meta.env.BASE_URL}images/sateesh-profile.jpg`;

const HeroSection = () => {
  const contactItems = [
    { icon: Phone, text: "+91-9920074439", href: "tel:+919920074439", label: "Call phone" },
    { icon: MessageCircle, text: "WhatsApp", href: "https://wa.me/919920074439", label: "Chat on WhatsApp", external: true },
    { icon: Mail, text: "sateesh.singh76@gmail.com", href: "mailto:sateesh.singh76@gmail.com", label: "Send email" },
    { icon: MapPin, text: "Mumbai, Maharashtra, India", href: null, label: "Location" },
  ];


  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/sateesh-singh-2224b666/", label: "LinkedIn profile" },
    { icon: Github, href: "https://github.com/sateesh1976/", label: "GitHub profile" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section-container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mb-6 w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-xl bg-secondary"
          >
            <img
              src={PROFILE_IMG}
              alt="Portrait of Sateesh Kumar Singh"
              width={352}
              height={352}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            <span className="gradient-text">Sateesh Kumar</span>
            <span className="text-foreground"> Singh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground font-medium mb-2"
          >
            Principal Consultant | Agentic AI Leader
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base md:text-lg text-muted-foreground font-light mb-8"
          >
            AI, GenAI, Data Science &amp; Enterprise Architecture
          </motion.p>


          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glow-border bg-secondary/50 mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">20+ Years of Experience</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8"
          >
            {contactItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <item.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm md:text-base hover:underline underline-offset-4"
                    aria-label={item.label}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.text}
                  </a>

                ) : (
                  <span className="text-sm md:text-base">{item.text}</span>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex justify-center items-center gap-4 flex-wrap"
          >
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
            <a href="/Sateesh_Singh.pdf" download="Sateesh_Singh_Resume.pdf">
              <Button variant="default" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="w-4 h-4" aria-hidden="true" />
                Download CV
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

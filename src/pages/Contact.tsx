import { Mail, Phone, MapPin, Linkedin, Github, Globe, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";

const Contact = () => (
  <>
    <SEO
      title="Contact — Sateesh Kumar Singh"
      description="Get in touch with Sateesh Kumar Singh for AI/ML consulting, technology leadership, and partnership opportunities."
      path="/contact"
    />

    <section className="py-16" aria-labelledby="contact-heading">
      <div className="section-container max-w-5xl">
        <h1 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-3">
          <span className="gradient-text">Let's connect</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Open to discussing AI/ML projects, consulting opportunities, and technology partnerships.
          The fastest way to reach me is via the form below or LinkedIn.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 rounded-2xl border border-border/60 bg-card/60 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-1">Send a message</h2>
            <p className="text-sm text-muted-foreground mb-5">I respond within a couple of business days.</p>
            <ContactForm />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
              <h2 className="font-semibold mb-4">Direct</h2>
              <ul className="space-y-3 text-sm">
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
                <li>
                  <a
                    href="https://wa.me/919920074439"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp +91 9920074439
                  </a>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" aria-hidden="true" /> Mumbai, Maharashtra, India
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
              <h2 className="font-semibold mb-4">Find me online</h2>
              <ul className="space-y-3 text-sm">
                {[
                  { href: "https://www.linkedin.com/in/sateesh-singh-2224b666/", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://github.com/sateesh1976/", icon: Github, label: "GitHub" },
                  { href: "https://agenticailab.in/", icon: Globe, label: "AgenticAI Lab" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <l.icon className="w-4 h-4" aria-hidden="true" /> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Contact;

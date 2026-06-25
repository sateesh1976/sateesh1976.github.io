import { Link } from "react-router-dom";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SummarySection from "@/components/SummarySection";
import SEO from "@/components/SEO";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sateesh Kumar Singh",
  jobTitle: "Gen AI Architect & Agentic AI Leader",
  url: "https://sateeshsingh.lovable.app/",
  email: "sateesh.singh76@gmail.com",
  telephone: "+91-9920074439",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/sateesh-singh-2224b666/",
    "https://github.com/sateesh1976/",
    "https://agenticailab.in/",
  ],
  knowsAbout: ["Artificial Intelligence", "Machine Learning", "Data Science", "Cloud Computing", "Enterprise Architecture"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sateesh Kumar Singh — Portfolio",
  url: "https://sateeshsingh.lovable.app/",
};

const Home = () => (
  <>
    <SEO
      title="Sateesh Kumar Singh — Gen AI Architect & Agentic AI Leader"
      description="Portfolio of Sateesh Kumar Singh: Gen AI Architect & Agentic AI Leader with 20+ years in AI/ML, Generative AI, Cloud (Azure, AWS, GCP), and Enterprise Architecture."
      path="/"
      jsonLd={[personJsonLd, websiteJsonLd]}
    />

    <HeroSection />
    <SummarySection />

    <section className="py-20" aria-labelledby="home-cta">
      <div className="section-container">
        <h2 id="home-cta" className="sr-only">Next steps</h2>
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="gradient-text">Let's build what's next.</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore my work, get a snapshot of my experience, or get in touch directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/projects">View Projects <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact"><Mail className="w-4 h-4" /> Contact Me</Link>
            </Button>
            <Button asChild variant="secondary">
              <a href="/Sateesh_Singh.pdf" download="Sateesh_Singh_Resume.pdf">
                <Download className="w-4 h-4" /> Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Home;

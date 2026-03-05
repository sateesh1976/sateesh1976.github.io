import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SummarySection from "@/components/SummarySection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import FooterSection from "@/components/FooterSection";
import BackToTop from "@/components/BackToTop";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sateesh Kumar Singh",
  jobTitle: "Senior Data Scientist & Technology Leader",
  url: "https://agenticailab.in/",
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
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cloud Computing",
    "Enterprise Architecture",
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <HeroSection />

        <section id="about" aria-label="About">
          <SummarySection />
        </section>

        <section id="skills" aria-label="Skills">
          <SkillsSection />
        </section>

        <section id="experience" aria-label="Experience">
          <ExperienceSection />
        </section>

        <section id="projects" aria-label="Projects">
          <ProjectsSection />
        </section>

        <section id="education" aria-label="Education">
          <EducationSection />
        </section>

        <section id="contact" aria-label="Contact">
          <FooterSection />
        </section>
      </main>

      <BackToTop />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default Index;

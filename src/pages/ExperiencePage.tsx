import ExperienceSection from "@/components/ExperienceSection";
import SEO from "@/components/SEO";

const ExperiencePage = () => (
  <>
    <SEO
      title="Experience — Sateesh Kumar Singh"
      description="Timeline of Sateesh Kumar Singh's professional experience across AI/ML, cloud, and enterprise architecture roles."
      path="/experience"
    />
    <section className="pt-12">
      <div className="section-container max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2"><span className="gradient-text">Experience</span></h1>
        <p className="text-muted-foreground mb-4">Roles, responsibilities, impact, and the technologies that powered them.</p>
      </div>
      <ExperienceSection />
    </section>
  </>
);

export default ExperiencePage;

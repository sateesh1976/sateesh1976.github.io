import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import SEO from "@/components/SEO";

const SkillsPage = () => (
  <>
    <SEO
      title="Skills & Certifications — Sateesh Kumar Singh"
      description="Technical, cloud, DevOps, AI/Data skills and certifications held by Sateesh Kumar Singh."
      path="/skills"
    />
    <section className="pt-12">
      <div className="section-container max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2"><span className="gradient-text">Skills & Certifications</span></h1>
        <p className="text-muted-foreground mb-4">Categorised technical depth across AI, data, cloud, and DevOps.</p>
      </div>
      <SkillsSection />
      <EducationSection />
    </section>
  </>
);

export default SkillsPage;

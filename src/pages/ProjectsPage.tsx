import ProjectsSection from "@/components/ProjectsSection";
import SEO from "@/components/SEO";

const ProjectsPage = () => (
  <>
    <SEO
      title="Projects — Sateesh Kumar Singh"
      description="Selected projects across AI/ML, cloud architecture, and data platforms — with technologies, outcomes, and links."
      path="/projects"
    />
    <section className="pt-12">
      <div className="section-container max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2"><span className="gradient-text">Projects</span></h1>
        <p className="text-muted-foreground mb-4">A selection of work spanning AI/ML, cloud-native platforms, and data engineering.</p>
      </div>
      <ProjectsSection />
    </section>
  </>
);

export default ProjectsPage;

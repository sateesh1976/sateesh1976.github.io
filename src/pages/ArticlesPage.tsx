import ArticlesSection from "@/components/ArticlesSection";
import SEO from "@/components/SEO";

const ArticlesPage = () => (
  <>
    <SEO
      title="Articles — Sateesh Kumar Singh"
      description="LinkedIn articles and writing on AI/ML, cloud architecture, and enterprise data platforms by Sateesh Kumar Singh."
      path="/articles"
    />
    <section className="pt-12">
      <div className="section-container max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2"><span className="gradient-text">Articles</span></h1>
        <p className="text-muted-foreground mb-4">Long-form writing pulled live from my LinkedIn feed.</p>
      </div>
      <ArticlesSection />
    </section>
  </>
);

export default ArticlesPage;

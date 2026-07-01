import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const PDF = "/Sateesh_Singh.pdf";

const ResumePage = () => (
  <>
    <SEO
      title="Resume — Sateesh Kumar Singh"
      description="Interactive resume and downloadable CV for Sateesh Kumar Singh — Principal Consultant | Agentic AI Leader."
      path="/resume"
    />
    <section className="py-12">
      <div className="section-container max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2"><span className="gradient-text">Resume</span></h1>
            <p className="text-muted-foreground">View the interactive resume below or download a PDF copy.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <a href={PDF} download="Sateesh_Singh_Resume.pdf"><Download className="w-4 h-4" /> Download PDF</a>
            </Button>
            <Button asChild variant="outline">
              <a href={PDF} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /> Open in new tab</a>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <object data={PDF} type="application/pdf" className="w-full h-[80vh]" aria-label="Resume PDF">
            <div className="p-8 text-center text-muted-foreground">
              <p className="mb-4">Your browser can't display the embedded PDF.</p>
              <Button asChild>
                <a href={PDF} download="Sateesh_Singh_Resume.pdf"><Download className="w-4 h-4" /> Download Resume</a>
              </Button>
            </div>
          </object>
        </div>
      </div>
    </section>
  </>
);

export default ResumePage;

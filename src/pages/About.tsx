import { motion } from "framer-motion";
import { Sparkles, Target, Users, Compass } from "lucide-react";
import SEO from "@/components/SEO";

const values = [
  { icon: Sparkles, title: "Innovation with intent", desc: "Apply AI where it produces measurable business outcomes — not novelty for its own sake." },
  { icon: Target, title: "Outcome focused", desc: "Anchor every design choice to a specific KPI, cost, or risk reduction." },
  { icon: Users, title: "Lead by enablement", desc: "Grow teams through clear architecture, code reviews, and mentoring." },
  { icon: Compass, title: "Pragmatic engineering", desc: "Favour simple, maintainable systems that survive contact with production." },
];

const journey = [
  { year: "2002 – 2008", text: "Began as a software engineer building distributed enterprise systems across banking and financial services." },
  { year: "2008 – 2016", text: "Specialised in data engineering and analytics platforms for global banks (State Street, Moody's Analytics) and built cloud-native pipelines." },
  { year: "2016 – 2022", text: "Led AI/ML and cloud transformation programs at Atos and Toyota Motor Engineering — Connected Car, predictive maintenance, and MLOps at scale." },
  { year: "2022 – Present", text: "Founder of AgenticAI Lab, advising enterprises on agentic AI, GenAI architecture, and CP4D / multi-cloud delivery." },
];

const About = () => (
  <>
    <SEO
      title="About — Sateesh Kumar Singh"
      description="Professional background, career journey, and values of Sateesh Kumar Singh — Principal Consultant | Agentic AI Leader."
      path="/about"
      type="profile"
    />

    <section className="py-20" aria-labelledby="about-heading">
      <div className="section-container max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 id="about-heading" className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About me</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I'm Sateesh — a Gen AI Architect and Agentic AI Leader based in Mumbai with 20+ years
            of experience designing and shipping data, AI, and cloud platforms for global enterprises.
          </p>
          <p className="text-base text-foreground/90 leading-relaxed mb-4">
            My work sits at the intersection of <span className="text-primary font-medium">applied AI</span>,
            <span className="text-primary font-medium"> cloud architecture</span>, and
            <span className="text-primary font-medium"> enterprise delivery</span>. I've led teams across India,
            France, and the Netherlands, and partnered with stakeholders in banking, automotive, healthcare,
            and capital markets.
          </p>
          <p className="text-base text-foreground/90 leading-relaxed">
            Today I run <a href="https://agenticailab.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AgenticAI Lab</a>,
            a boutique consulting practice focused on agentic AI, GenAI platform architecture, and
            CP4D / multi-cloud delivery for regulated industries.
          </p>
        </motion.div>

        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-6"><span className="gradient-text">Career journey</span></h2>
          <ol className="relative border-l border-border/60 pl-6 space-y-6">
            {journey.map((j) => (
              <li key={j.year}>
                <div className="absolute -left-[7px] w-3 h-3 rounded-full bg-primary" aria-hidden="true" />
                <time className="font-mono text-sm text-primary">{j.year}</time>
                <p className="text-foreground/90 mt-1">{j.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-6"><span className="gradient-text">What I value</span></h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-5">
                <v.icon className="w-6 h-6 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default About;

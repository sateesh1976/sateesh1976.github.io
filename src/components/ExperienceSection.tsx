import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Principal Consultant / Agentic AI Leader (Founder)",
    company: "Tech Consulting",
    period: "Apr 2025 – Present",
    description: "Deep expertise in Agentic AI, GenAI, LLMs, RAG. Leading multi-agent architectures with n8n Agentic AI workflows.",
    highlights: ["Agentic AI", "Multi-Agent Systems", "LLMs", "RAG"],
  },
  {
    title: "Senior Consultant / Specialist",
    company: "Eviden (Atos) / Syntel Ltd.",
    period: "Feb 2015 – Apr 2025",
    description: "Led architecture of AI/ML, CP4D and GenAI projects across cloud environments. Designed end-to-end solutions using Python, DataStage, GenAI, Mendix, and cloud-native services.",
    highlights: ["AI/ML Architecture", "GenAI", "Cloud Solutions", "Team Leadership"],
  },
  {
    title: "Senior Consultant",
    company: "Capgemini India",
    period: "Mar 2013 – Feb 2015",
    description: "Delivered ML models and data pipelines for banking clients like HSBC. Designed and optimized DataStage/CP4D-based DWH/ETL processes.",
    highlights: ["Banking Solutions", "ML Models", "ETL Optimization"],
  },
  {
    title: "Technical Lead",
    company: "Wipro Technologies",
    period: "Apr 2011 – Mar 2013",
    description: "Architected data solutions for Citibank and Credit Suisse with focus on CP4D, reporting, analytics, and ETL. Led development teams.",
    highlights: ["Data Architecture", "Financial Services", "Team Leadership"],
  },
  {
    title: "System Analyst",
    company: "Atos Origin India",
    period: "Aug 2007 – Apr 2011",
    description: "Designed telecom and retail data systems; improved DWH and customer analytics.",
    highlights: ["Telecom", "Retail Analytics", "DWH Design"],
  },
  {
    title: "IT Engineer",
    company: "CMC Ltd. / TCS",
    period: "Jun 2005 – Aug 2007",
    description: "Developed tax and enterprise systems; involved in Oracle Apps upgrades and Java-based portal development.",
    highlights: ["Oracle Apps", "Java Development", "Enterprise Systems"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="gradient-text">Professional Journey</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Two decades of progressive experience in technology leadership and data science
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative grid md:grid-cols-2 gap-4 md:gap-8 ${
                    index % 2 === 0 ? "" : "md:direction-rtl"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-6 w-3 h-3 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                    <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300">
                      <div className={`flex items-center gap-2 text-primary mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-mono">{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{exp.title}</h3>
                      <div className={`flex items-center gap-2 text-muted-foreground mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        {exp.highlights.map((highlight, hIndex) => (
                          <span
                            key={hIndex}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

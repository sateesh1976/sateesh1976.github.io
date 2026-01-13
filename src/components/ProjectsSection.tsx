import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Data Platform Migration (DPM)",
    client: "Credit One Bank",
    period: "Jan 2025 – Present",
    description: "Migrating legacy data warehouse to modern data platform with scalable architecture, real-time processing, and enhanced analytics capabilities.",
    technologies: ["CP4D", "AWS", "Python", "PySpark", "Snowflake", "Apache Airflow", "Presto"],
  },
  {
    title: "Market Data Analysis (MDA)",
    client: "Moody's Analytics",
    period: "Jul 2024 – Jan 2025",
    description: "Developed system to analyze market data from various vendors with data ingestion, quality validation, and predictive analytics using ML.",
    technologies: ["CP4D", "AWS", "Python", "PySpark", "CloverDX", "PostgreSQL"],
  },
  {
    title: "Toyota Connected Car Cloud (TCCC)",
    client: "Toyota Motor Engineering",
    period: "Oct 2023 – Jul 2024",
    description: "Automotive cloud system with real-time data flow, storage, and AI services. Worked on EV Charging Management, Speech Emotion Recognition, and Intoxication Detection using Deep Learning.",
    technologies: ["AI/ML", "MLOps", "Gen AI", "Mendix", "AWS Cloud"],
  },
  {
    title: "Metrics and Reporting System (MARS)",
    client: "Groupe PSA (Opel)",
    period: "Feb 2019 – Oct 2023",
    description: "Enterprise metrics and reporting for French multinational automotive corporation producing Peugeot, Citroën, DS, Opel, and Vauxhall vehicles.",
    technologies: ["IBM DataStage/CP4D", "AI/ML", "MLOps", "Data Science", "Gen AI"],
  },
  {
    title: "Charles River IMS",
    client: "State Street Global Advisors",
    period: "Nov 2017 – Feb 2019",
    description: "Investment Management Solution automating front and middle office tasks for buy-side companies across 40+ countries.",
    technologies: ["IBM DataStage 9.1", "OutSystems", "Python", "PL/SQL"],
  },
  {
    title: "ERM Credit Risk Repository",
    client: "State Street Corporation",
    period: "Apr 2016 – Nov 2017",
    description: "New Data Warehouse creating common data structure for all credit risk-related data, enabling comparison of credit, capital, and stress-related exposure values.",
    technologies: ["IBM DataStage 9.1", "Python", "PySpark", "PL/SQL"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section ref={ref} className="py-24 bg-secondary/20 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Key projects delivered across banking, automotive, and financial services industries
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-primary text-sm">{project.client}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                    {project.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {projects.length > 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    View All Projects <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Cloud, 
  Brain, 
  Database, 
  Code, 
  Settings, 
  Layers 
} from "lucide-react";

const skillCategories = [
  {
    title: "AI/ML & GenAI",
    icon: Brain,
    skills: [
      "Generative AI (OpenAI, Gemini, Hugging Face)",
      "LangChain, Crew AI, Agentic AI",
      "TensorFlow, PyTorch, Scikit-learn",
      "MLOps (MLflow, Vertex AI)",
      "Quantum ML (Qiskit, Cirq, PennyLane)",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "AWS, Azure, GCP",
      "Terraform, Ansible",
      "Docker, Kubernetes",
      "Jenkins, GitHub Actions, ArgoCD",
      "Prometheus, Grafana",
    ],
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: [
      "Apache Spark, Kafka, Flink",
      "Snowflake, BigQuery, Redshift",
      "Azure Data Factory, AWS Glue",
      "DataStage, Airflow, CloverDX",
      "Power BI, Tableau, Microsoft Fabric",
    ],
  },
  {
    title: "Architecture & Strategy",
    icon: Layers,
    skills: [
      "Solution & Enterprise Architecture",
      "Architecture Governance",
      "Technical Leadership",
      "TOGAF Methodology",
      "Security & Compliance (GDPR, DPDP)",
    ],
  },
  {
    title: "Web & Low-Code",
    icon: Code,
    skills: [
      "Django, FastAPI, Flask",
      "React.js",
      "Mendix, OutSystems, Appian",
      "UiPath, Automation Anywhere",
      "Blue Prism",
    ],
  },
  {
    title: "Databases & Languages",
    icon: Settings,
    skills: [
      "Python, R, SQL, PL/SQL",
      "Oracle, Teradata, PostgreSQL",
      "MongoDB, DynamoDB, Redis",
      "Unix/Linux, JavaScript",
      "SQL Server, Cassandra",
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="gradient-text">Technical Expertise</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comprehensive skill set across the full technology stack, from AI/ML to cloud infrastructure
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, MapPin } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Galgotias Institute of Management & Technology (GMIT)",
    location: "Noida",
    period: "2000 – 2003",
  },
  {
    degree: "Master of Science (M.Sc.) – Mathematics",
    institution: "Deen Dayal Upadhyay University",
    location: "Gorakhpur",
    period: "1998 – 2000",
  },
  {
    degree: "Bachelor of Science (B.Sc.) – Mathematics, Chemistry",
    institution: "Deen Dayal Upadhyay University",
    location: "Gorakhpur",
    period: "1995 – 1998",
  },
];

const certifications = [
  { name: "Cognitive Solutions AI & ML", issuer: "Atos", year: "2022" },
  { name: "Machine Learning with TensorFlow", issuer: "Udemy", year: "2021" },
  { name: "Cloud Engineering (Azure, AWS, GCP)", issuer: "Atos", year: "2020" },
  { name: "Apache Airflow", issuer: "Udemy", year: "2025" },
];

const awards = [
  { title: "Innovation Excellence Award", org: "Toyota Motor Engineering", desc: "AI-driven solutions in Connected Car Cloud" },
  { title: "Top Contributor Award", org: "Moody's Analytics", desc: "Market data integration and analytics pipelines" },
  { title: "Spot Recognition Award", org: "State Street Global Advisors", desc: "Investment operations automation" },
];

const EducationSection = () => {
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
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-primary" />
                <span className="gradient-text">Education</span>
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-5 hover:border-primary/30 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-muted-foreground text-sm">{edu.institution}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                      <span className="font-mono text-primary">{edu.period}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications & Awards */}
            <div className="space-y-12">
              {/* Certifications */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  <span className="gradient-text">Certifications</span>
                </h2>
                <div className="grid gap-3">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <div>
                        <p className="font-medium text-foreground">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <span className="text-sm font-mono text-primary">{cert.year}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Awards & Recognition</h3>
                <div className="space-y-3">
                  {awards.map((award, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="p-4 rounded-lg border border-primary/20 bg-primary/5"
                    >
                      <p className="font-medium text-primary">{award.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {award.org} – {award.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;

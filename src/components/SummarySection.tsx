import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SummarySection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="gradient-text">Professional Summary</span>
          </h2>

          <div className="glass-card p-8 md:p-10 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              Accomplished <span className="text-primary font-semibold">Senior Data Scientist & Technology Leader</span> with{" "}
              <span className="text-primary font-semibold">19+ years</span> of experience across AI/ML, CP4D, Cloud Platforms, 
              Data Engineering, and Enterprise Architecture. Proven expertise in designing and deploying AI-driven solutions 
              in <span className="text-primary">Azure, AWS, and GCP</span> environments.
            </p>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mt-4">
              Adept at building scalable architectures, leading cross-functional teams, and delivering high-impact solutions 
              across industries including <span className="text-primary">banking, automotive, and healthcare</span>. Skilled in 
              implementing CI/CD, MLOps, and cloud-native architectures to drive innovation, business value, and technical excellence.
            </p>
          </div>

          {/* Key highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
            {[
              { value: "19+", label: "Years Experience" },
              { value: "50+", label: "Projects Delivered" },
              { value: "3", label: "Cloud Platforms" },
              { value: "10+", label: "Industries" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-secondary/30 border border-border/50"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SummarySection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, MapPin, FileCheck, Handshake, TreePine, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "We Pick You Up",
    description: "Complimentary AC sedan from Delhi/Gurgaon to the site. Relax while we drive.",
  },
  {
    icon: MapPin,
    title: "Walk the Land",
    description: "Tour the actual plots. Feel the soil, breathe the air, see the views. Pick the one that speaks to you.",
  },
  {
    icon: FileCheck,
    title: "Transparent Paperwork",
    description: "We walk you through title deeds, registry process, and legal clearances. No hidden costs.",
  },
  {
    icon: Handshake,
    title: "No-Pressure Decision",
    description: "Take your time. We believe in relationships, not hard sells. Your pace, your choice.",
  },
];

const included = [
  { icon: Car, text: "Free pickup & drop from Delhi NCR" },
  { icon: TreePine, text: "Guided nature walk & site tour" },
  { icon: FileCheck, text: "Complete legal document review" },
  { icon: CheckCircle2, text: "Personalised investment plan" },
];

const SiteVisitSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sitevisit" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Experience before you invest
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Your <span className="italic text-forest">site visit</span> experience
          </h2>
          <p className="text-subtitle mt-4 max-w-2xl mx-auto">
            We don't just show land — we give you a day to experience the life that awaits.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative mb-20">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`pl-16 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.description}</p>
              </div>

              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-forest flex items-center justify-center shadow-lg z-10">
                <step.icon className="w-5 h-5 text-primary-foreground" />
              </div>

              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card"
        >
          <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-8">
            What's <span className="italic text-forest">included</span> in your visit
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {included.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-background/50"
              >
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-forest" />
                </div>
                <span className="text-sm font-body text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              className="btn-primary"
              onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book Your Free Site Visit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SiteVisitSection;

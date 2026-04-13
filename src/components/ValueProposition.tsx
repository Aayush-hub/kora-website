import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Home, TreePine } from "lucide-react";

const pillars = [
  {
    icon: TrendingUp,
    title: "Appreciation",
    subtitle: "Land values grow quietly over time",
    description:
      "While markets fluctuate and stocks crash, land near Delhi has consistently appreciated 12-18% annually. Your wealth grows while you sleep.",
  },
  {
    icon: Home,
    title: "Experience",
    subtitle: "A space your family actually lives in",
    description:
      "This isn't a number on a screen. It's Sunday mornings in your garden, evenings by the fire, and memories that last generations.",
  },
  {
    icon: TreePine,
    title: "Legacy",
    subtitle: "An asset you pass on",
    description:
      "Gold tarnishes. Markets reset. But land? Land is forever. Give your children something no mutual fund can — roots.",
  },
];

const ValueProposition = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="invest" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Why land. Why now.
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Three pillars of a <span className="italic text-forest">smarter</span> investment
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className="glass-card text-center group hover:shadow-lg transition-shadow duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <pillar.icon className="w-7 h-7 text-forest" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-2">{pillar.title}</h3>
              <p className="text-sm tracking-widest uppercase text-gold mb-4 font-body">
                {pillar.subtitle}
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;

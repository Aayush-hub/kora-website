import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Sprout, ShieldCheck, Clock } from "lucide-react";

const promises = [
  {
    icon: ShieldCheck,
    title: "100% Legal & Clear Title",
    description: "Every plot comes with verified registry, mutation records, and complete legal clearance. No grey areas.",
  },
  {
    icon: Sprout,
    title: "Managed Farmland Options",
    description: "Don't want to manage it yourself? We offer full farm management — from plantation to harvest to returns.",
  },
  {
    icon: Users,
    title: "A Community, Not Just Land",
    description: "Join a curated community of like-minded families. Shared amenities, social gatherings, and neighbourhood bonds.",
  },
  {
    icon: Clock,
    title: "Hassle-Free Ownership",
    description: "We handle everything — fencing, bore-well, electricity, landscaping. You just own it and enjoy it.",
  },
  {
    icon: Heart,
    title: "Lifestyle Design Support",
    description: "Want to build a farmhouse? We connect you with architects, contractors, and interior designers at preferred rates.",
  },
];

const KoraPromise = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            The Kora promise
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            What you <span className="italic text-forest">actually get</span>
          </h2>
          <p className="text-subtitle mt-4 max-w-2xl mx-auto">
            We're not just selling land. We're building a movement of families choosing freedom, nature, and smarter wealth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {promises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="glass-card group hover:shadow-lg hover:border-forest/20 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center mb-5 group-hover:bg-forest/20 transition-colors duration-500">
                <item.icon className="w-5 h-5 text-forest" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KoraPromise;

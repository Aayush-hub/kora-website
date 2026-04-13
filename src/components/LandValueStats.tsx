import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Building2, Leaf, BarChart3, Shield, IndianRupee } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: 15, suffix: "%", label: "Avg. Annual Land Appreciation near Delhi NCR", prefix: "" },
  { icon: Building2, value: 3, suffix: "x", label: "Land value increase in 5 years (Sohna belt)", prefix: "" },
  { icon: IndianRupee, value: 45, suffix: "L+", label: "Starting investment for 1-acre farmland", prefix: "₹" },
  { icon: Shield, value: 100, suffix: "%", label: "Registry & legal title clear plots", prefix: "" },
];

const facts = [
  {
    icon: BarChart3,
    title: "Land Outperforms Gold & FDs",
    description: "Over the last decade, farmland near Delhi has delivered 12-18% annual returns — outperforming gold (8%), FDs (6%), and even many mutual funds.",
  },
  {
    icon: Leaf,
    title: "Limited Supply, Infinite Demand",
    description: "India's urban sprawl means farmland near metros is shrinking every year. What's available today won't be available tomorrow — at any price.",
  },
  {
    icon: Shield,
    title: "Tangible, Inflation-Proof Asset",
    description: "Unlike stocks or crypto, land can't crash to zero. It's a physical asset that appreciates with inflation and development around it.",
  },
];

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-forest">
      {prefix}{count}{suffix}
    </span>
  );
}

const LandValueStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-earth-warm" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            The numbers speak
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Why <span className="italic text-forest">land</span> is the smartest investment today
          </h2>
        </motion.div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="glass-card text-center p-6 md:p-8"
            >
              <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-5 h-5 text-forest" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="text-xs md:text-sm text-muted-foreground font-body mt-3 leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Facts Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="relative border-l-2 border-forest/30 pl-6"
            >
              <fact.icon className="w-6 h-6 text-gold mb-4" />
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{fact.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandValueStats;

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import farmhouseVideo from "@/assets/farmhouse-lifestyle-video.mp4";

const EmotionalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section id="about" className="relative overflow-hidden" ref={containerRef}>
      <div className="section-padding max-w-6xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body">
              A moment of honesty
            </p>
            <h2 className="text-editorial text-foreground mb-8">
              Let me ask you something…
            </h2>
            <p className="text-subtitle mb-6">
              When was the last time you woke up without noise, without stress, without urgency?
            </p>
            <p className="text-subtitle mb-8">
              When did you last stand barefoot on real earth, watching the sun rise over fields that belonged to <em>you</em>?
            </p>
            <div className="h-px w-24 bg-gold mb-8" />
            <p className="font-display text-2xl md:text-3xl font-medium leading-snug text-foreground">
              This isn't just investment.
              <br />
              <span className="italic text-forest">This is your escape.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
              <video
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline=""
                className="w-full h-full object-cover"
                preload="auto"
              >
                <source src={farmhouseVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-earth-deep/30 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 glass-card max-w-xs"
            >
              <p className="font-display text-lg italic text-foreground">
                "The best time to plant a tree was 20 years ago. The second best time is now."
              </p>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mt-3 font-body">
                — Ancient proverb
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalSection;

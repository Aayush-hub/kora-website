import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import farmMorningVideo from "@/assets/farm-morning-video.mp4.asset.json";

import cityLifeVideo from "@/assets/city-life-video.mp4.asset.json";

const StorytellingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallax1 = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <section id="experience" className="relative overflow-hidden bg-earth-warm" ref={containerRef}>
      <div className="section-padding max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body">
            Imagine this
          </p>
          <h2 className="text-editorial text-foreground mb-8">
            It's a Saturday morning. There's no alarm.
          </h2>
          <p className="text-subtitle">
            You step out onto your veranda. The air is clean — not filtered, not conditioned — <em>clean</em>.
            Your children run barefoot on grass that's yours. Your coffee tastes different here.
            Everything does.
          </p>
        </motion.div>

        {/* Two videos on top: city life (left) + farm life (right) */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <motion.div style={{ y: parallax1 }} className="w-full h-full scale-105">
              <video
                autoPlay muted loop playsInline webkit-playsinline=""
                className="w-full h-full object-cover"
                preload="metadata"
              >
                <source src={cityLifeVideo.url} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <motion.div style={{ y: parallax2 }} className="w-full h-full scale-105">
              <video
                autoPlay muted loop playsInline webkit-playsinline=""
                className="w-full h-full object-cover"
                preload="metadata"
              >
                <source src={farmMorningVideo.url} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        </div>

        {/* Contrast text below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-4">
              <h3 className="font-display text-2xl md:text-3xl text-foreground">Your weekday</h3>
              <div className="space-y-3 text-muted-foreground font-body">
                {[
                  "2 hours in traffic",
                  "Air quality: severe",
                  "Apartment walls closing in",
                  "Screen time: 14 hours",
                  "Nature: a potted plant",
                ].map((item, i) => (
                  <motion.p
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  >
                    → {item}
                  </motion.p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl md:text-3xl text-forest italic">Your weekend at Kora</h3>
              <div className="space-y-3 text-foreground font-body">
                {[
                  "Morning walk through your fields",
                  "Air so clean you'll forget it can be different",
                  "Open skies, endless green",
                  "Family time, real time",
                  "Nature: everywhere",
                ].map((item, i) => (
                  <motion.p
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  >
                    → {item}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorytellingSection;

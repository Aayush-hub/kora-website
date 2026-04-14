import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import farmMorningVideo from "@/assets/farm-morning-video.mp4";

const freedomPoints = [
  { weekday: "Alarm at 6 AM, rush hour by 7", weekend: "Wake to birdsong, coffee on the veranda" },
  { weekday: "AQI 300+ — masks and air purifiers", weekend: "AQI 30 — clean air you can taste" },
  { weekday: "Kids on screens, 14 hours a day", weekend: "Kids in the garden, discovering nature" },
  { weekday: "EMI on a depreciating flat", weekend: "Investment in appreciating land" },
  { weekday: "Weekends spent in malls", weekend: "Weekends spent under open skies" },
];

const FreedomSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden" ref={ref}>
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay muted loop playsInline webkit-playsinline=""
          className="w-full h-full object-cover"
          preload="metadata"
        >
          <source src={farmMorningVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "hsl(var(--earth-deep) / 0.88)" }} />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase font-body mb-4 text-gold">
              Reclaim your life
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-cream">
              The freedom <span className="italic text-gold">you deserve</span>
            </h2>
            <p className="text-base md:text-lg font-body font-light max-w-2xl mx-auto mt-4 leading-relaxed text-sand">
              Kora Living isn't just an investment. It's a conscious choice to live differently.
            </p>
          </motion.div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6">
              <p className="text-xs tracking-[0.2em] uppercase font-body text-center text-sand/60">Your city life</p>
              <p className="text-xs tracking-[0.2em] uppercase font-body text-center text-gold">Your Kora life</p>
            </div>
            {freedomPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="grid grid-cols-2 gap-4 md:gap-8"
              >
                <div className="rounded-xl p-4 md:p-5 text-center border border-white/5" style={{ background: "hsl(var(--earth-deep) / 0.6)" }}>
                  <p className="text-sm font-body text-sand/60 line-through decoration-sand/30">{point.weekday}</p>
                </div>
                <div className="rounded-xl p-4 md:p-5 text-center border border-forest/20" style={{ background: "hsl(var(--forest) / 0.15)" }}>
                  <p className="text-sm font-body text-cream">{point.weekend}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mt-14"
          >
            <button
              className="btn-primary"
              style={{ background: "hsl(var(--gold))", color: "hsl(var(--earth-deep))" }}
              onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Your Freedom Journey
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreedomSection;

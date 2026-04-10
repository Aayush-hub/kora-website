import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import farmMorningVideo from "@/assets/farm-morning-video.mp4.asset.json";

const VideoBreakSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <video
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline=""
          className="w-full h-full object-cover"
          preload="metadata"
        >
          <source src={farmMorningVideo.url} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-earth-deep/40 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6 max-w-3xl"
        >
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl italic font-medium leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            style={{ color: "hsl(var(--cream))" }}
          >
            Some things in life can't be bought.
            <br />
            But the land for them can.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoBreakSection;

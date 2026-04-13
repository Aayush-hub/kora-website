import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroImage from "@/assets/hero-farmhouse.jpg";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";

const HeroSection = () => {
  const [audioOn, setAudioOn] = useState(false);
  const { start, stop } = useAmbientAudio();
  const startedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const tryPlayHeroVideo = async () => {
      const video = videoRef.current;
      if (!video) return;

      video.defaultMuted = false;
      video.muted = false;
      video.volume = 1;

      try {
        await video.play();
      } catch {
        // Mobile/desktop browsers may block unmuted autoplay.
        // Fallback to muted autoplay so motion still starts immediately.
        video.muted = true;
        await video.play().catch(() => undefined);
      }
    };

    void tryPlayHeroVideo();
  }, []);

  // Best effort: start ambience on load, then guarantee on first interaction.
  useEffect(() => {
    start();
    setAudioOn(true);

    const autoStart = () => {
      if (!startedRef.current) {
        start();
        startedRef.current = true;
        setAudioOn(true);
      }
      document.removeEventListener("click", autoStart);
      document.removeEventListener("touchstart", autoStart);
      document.removeEventListener("scroll", autoStart);
    };
    document.addEventListener("click", autoStart, { once: true });
    document.addEventListener("touchstart", autoStart, { once: true });
    document.addEventListener("scroll", autoStart, { once: true });
    return () => {
      document.removeEventListener("click", autoStart);
      document.removeEventListener("touchstart", autoStart);
      document.removeEventListener("scroll", autoStart);
    };
  }, [start]);

  const toggleAudio = useCallback(() => {
    if (audioOn) {
      stop();
      setAudioOn(false);
    } else {
      start();
      startedRef.current = true;
      setAudioOn(true);
    }
  }, [audioOn, start, stop]);

  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted={false}
          loop
          playsInline
          webkit-playsinline=""
          poster={heroImage}
          className="w-full h-full object-cover"
          preload="auto"
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Audio toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={toggleAudio}
        className="absolute top-24 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all duration-300"
        aria-label={audioOn ? "Mute nature sounds" : "Play nature sounds"}
      >
        {audioOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.button>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-8 font-body font-light text-gold-light"
        >
          Premium Farmland &amp; Farmhouse Investments Near Delhi
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.15] tracking-tight mb-8 text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          You're Not Buying Land.
          <br />
          <span className="italic text-gold">
            You're Buying a Life.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base md:text-lg lg:text-xl font-body font-light max-w-2xl mx-auto mb-12 leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
        >
          Escape the noise. Invest in land that grows your peace — and your wealth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={scrollToQuiz} className="btn-primary text-sm md:text-base">
            Find Your Perfect Land
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline border-white/40 text-white/90 hover:bg-white/10 hover:border-white/60"
          >
            Explore More
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

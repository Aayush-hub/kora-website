import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, Play, X } from "lucide-react";
import testimonialVideo1 from "@/assets/testimonial-1.mp4.asset.json";
import testimonialVideo2 from "@/assets/testimonial-2.mp4.asset.json";
import testimonialVideo3 from "@/assets/testimonial-3.mp4.asset.json";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Business Owner, Gurugram",
    text: "We bought 1 acre near Sohna last year. The value has already gone up 22%. But honestly, the weekends we spend there with family — that's the real return.",
    rating: 5,
    video: testimonialVideo1.url,
  },
  {
    name: "Priya & Ankit Mehta",
    role: "IT Professionals, Noida",
    text: "We were tired of our apartment walls. Kora Living showed us a life we didn't know we were missing. Our kids now know what real grass feels like.",
    rating: 5,
    video: testimonialVideo2.url,
  },
  {
    name: "Dr. Suresh Kapoor",
    role: "Surgeon, Delhi",
    text: "As a doctor, I deal with stress every day. My farmhouse at Kora is my therapy. It's the best investment I've ever made — for my wealth and my wellbeing.",
    rating: 5,
    video: testimonialVideo3.url,
  },
];

const stats = [
  { value: "100+", label: "Happy Investors" },
  { value: "15%", label: "Avg. Annual Appreciation" },
  { value: "200+", label: "Acres Developed" },
  { value: "4.9★", label: "Investor Rating" },
];

const SocialProof = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
            Trusted by 100+ investors
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Stories from <span className="italic text-forest">Kora families</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6">
              <p className="font-display text-3xl md:text-4xl text-forest mb-1">{stat.value}</p>
              <p className="text-xs tracking-widest uppercase text-muted-foreground font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Video Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              className="glass-card relative group"
            >
              {/* Video Thumbnail */}
              <div
                className="relative rounded-xl overflow-hidden aspect-video mb-6 cursor-pointer"
                onClick={() => setActiveVideo(t.video)}
              >
                <video
                  src={t.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  playsInline
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-earth-deep/40 flex items-center justify-center group-hover:bg-earth-deep/30 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play size={20} className="text-forest ml-0.5" />
                  </div>
                </div>
              </div>

              <Quote className="w-8 h-8 text-gold/30 absolute top-8 right-8" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground font-body leading-relaxed mb-6 text-sm">{t.text}</p>
              <div>
                <p className="font-display text-lg text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground font-body">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-earth-deep/80 backdrop-blur-sm p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-cream/20 flex items-center justify-center hover:bg-cream/30 transition-colors"
            >
              <X size={20} style={{ color: "hsl(var(--cream))" }} />
            </button>
            <video
              src={activeVideo}
              className="w-full rounded-2xl shadow-2xl"
              controls
              autoPlay
              loop
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SocialProof;

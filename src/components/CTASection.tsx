import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-earth-deep" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-sm tracking-[0.3em] uppercase mb-6 font-body"
            style={{ color: "hsl(var(--gold))" }}
          >
            Limited plots available
          </p>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6"
            style={{ color: "hsl(var(--cream))" }}
          >
            Your land is waiting.
            <br />
            <span className="italic" style={{ color: "hsl(var(--gold))" }}>
              Don't let someone else find it first.
            </span>
          </h2>
          <p
            className="text-lg font-body font-light max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: "hsl(var(--sand))" }}
          >
            Speak with a Kora Living land advisor today. No pressure, no sales pitch — just an honest conversation about your future.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              className="btn-primary"
              style={{ background: "hsl(var(--gold))", color: "hsl(var(--earth-deep))" }}
              onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}
            >
              Check Availability
            </button>
            <a
              href="tel:+919876543210"
              className="btn-outline"
              style={{ borderColor: "hsl(var(--cream) / 0.3)", color: "hsl(var(--cream) / 0.8)" }}
            >
              Call Us Now
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-body" style={{ color: "hsl(var(--sage))" }}>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>NCR Region, Near Delhi</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>hello@koraliving.in</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

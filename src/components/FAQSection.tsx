import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is the land legally clear and verified?",
    a: "Absolutely. Every Kora Living plot comes with verified title deeds, mutation records, encumbrance certificates, and complete legal clearance. We work with top property lawyers to ensure zero grey areas.",
  },
  {
    q: "Where exactly are the plots located?",
    a: "Our farmland projects are located in premium corridors near Delhi NCR — including Sohna, Manesar, and Sonipat. All locations are within 1.5–2 hours drive from Delhi, with excellent road connectivity and upcoming expressway access.",
  },
  {
    q: "What kind of returns can I expect?",
    a: "Land near Delhi NCR has historically appreciated 12–18% annually. Our plots are in high-growth corridors with upcoming infrastructure projects, which further boosts appreciation potential. However, past performance is not a guarantee of future returns.",
  },
  {
    q: "Can I build a farmhouse on my plot?",
    a: "Yes! We offer lifestyle design support — connecting you with trusted architects, contractors, and interior designers at preferred rates. You can build your dream farmhouse at your own pace.",
  },
  {
    q: "What if I don't want to manage the farm myself?",
    a: "We offer managed farmland options. Our team handles everything from plantation to harvest — you enjoy the returns and the experience without the hassle.",
  },
  {
    q: "How does the site visit work?",
    a: "We provide complimentary pickup from Delhi/Gurgaon in an AC sedan. You'll walk the actual plots, meet our team, review all legal documents, and make a decision at your own pace. No pressure, no hard sells.",
  },
  {
    q: "What are the payment terms?",
    a: "We offer a straightforward payment structure with clear milestones. Our team will walk you through all costs upfront — there are no hidden charges. Specific terms vary by project and plot size.",
  },
  {
    q: "Is this suitable as a long-term investment?",
    a: "Land is one of the most stable long-term assets. Unlike stocks or crypto, it doesn't vanish overnight. With Delhi NCR's expansion, farmland in our corridors is a tangible asset that appreciates while giving you a lifestyle upgrade.",
  },
];

const FAQItem = ({ faq, index, inView }: { faq: typeof faqs[0]; index: number; inView: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 * index }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4 group"
      >
        <span className="font-display text-lg md:text-xl text-foreground group-hover:text-forest transition-colors duration-300">
          {faq.q}
        </span>
        <ChevronDown
          size={20}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-sm md:text-base font-body text-muted-foreground leading-relaxed pb-6 pr-8">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Common questions
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Everything you <span className="italic text-forest">need to know</span>
          </h2>
        </motion.div>

        <div className="glass-card !p-6 md:!p-10">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10"
        >
          <p className="text-sm font-body text-muted-foreground mb-4">Still have questions?</p>
          <button
            className="btn-primary"
            onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}
          >
            Talk to a Land Advisor
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

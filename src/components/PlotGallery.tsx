import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Maximize, Trees, ArrowRight } from "lucide-react";
import plotAerial from "@/assets/plot-aerial-1.jpg";
import plotFarmhouse from "@/assets/plot-farmhouse-2.jpg";
import plotGarden from "@/assets/plot-garden-3.jpg";
import plotLuxury from "@/assets/plot-luxury-4.jpg";

const plots = [
  {
    image: plotAerial,
    title: "Green Meadow Estate",
    location: "Sohna, Gurugram",
    size: "1 Acre",
    price: "₹55 Lakh onwards",
    tag: "Best Seller",
  },
  {
    image: plotFarmhouse,
    title: "Orchard View Farm",
    location: "Manesar, Haryana",
    size: "2 Acres",
    price: "₹1.2 Crore onwards",
    tag: "Premium",
  },
  {
    image: plotGarden,
    title: "Sunrise Garden Plots",
    location: "Sonipat, NCR",
    size: "0.5 Acre",
    price: "₹28 Lakh onwards",
    tag: "New Launch",
  },
  {
    image: plotLuxury,
    title: "Palm Retreat Estate",
    location: "Sohna Hills, Gurugram",
    size: "3 Acres",
    price: "₹3.5 Crore onwards",
    tag: "Ultra Luxury",
  },
];

const PlotGallery = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Available Properties
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Explore our <span className="italic text-forest">curated plots</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {plots.map((plot, i) => (
            <motion.div
              key={plot.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={plot.image}
                  alt={plot.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-wider uppercase"
                  style={{
                    background: "hsl(var(--gold))",
                    color: "hsl(var(--earth-deep))",
                  }}
                >
                  {plot.tag}
                </span>
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500"
                style={{
                  background: hoveredIndex === i
                    ? "linear-gradient(to top, hsl(var(--earth-deep) / 0.9), hsl(var(--earth-deep) / 0.3), transparent)"
                    : "linear-gradient(to top, hsl(var(--earth-deep) / 0.7), transparent)",
                }}
              >
                <h3
                  className="font-display text-2xl md:text-3xl font-medium mb-2"
                  style={{ color: "hsl(var(--cream))" }}
                >
                  {plot.title}
                </h3>
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--sand))" }}>
                    <MapPin size={14} /> {plot.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--sand))" }}>
                    <Maximize size={14} /> {plot.size}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="font-display text-xl font-medium"
                    style={{ color: "hsl(var(--gold))" }}
                  >
                    {plot.price}
                  </span>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={hoveredIndex === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    className="flex items-center gap-2 text-sm font-body font-medium"
                    style={{ color: "hsl(var(--cream))" }}
                    onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Enquire <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlotGallery;

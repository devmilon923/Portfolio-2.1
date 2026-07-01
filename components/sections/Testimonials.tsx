"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-cream text-cream" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-void relative overflow-hidden"
      ref={ref}
    >
      {/* Background glow */}
      <div className="mist-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p className="section-label mb-3">Testimonials</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
              What clients <span className="gradient-text">say</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <motion.button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-clay bg-charcoal border border-white/[0.08] flex items-center justify-center text-ash hover:text-white hover:border-cream/20 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={scrollNext}
              className="w-10 h-10 rounded-clay bg-charcoal border border-white/[0.08] flex items-center justify-center text-ash hover:text-white hover:border-cream/20 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex justify-center gap-3 items-center py-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
              >
                <motion.div
                  className="clay-card p-6 h-full flex flex-col"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Quote icon */}
                  <div className="w-8 h-8 rounded-lg bg-cream/10 flex items-center justify-center mb-4">
                    <Quote className="w-4 h-4 text-cream" />
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <StarRating count={t.rating} />
                  </div>

                  {/* Review */}
                  <p className="text-white/80 text-sm font-light leading-relaxed flex-1 mb-6 italic">
                    "{t.text}"
                  </p>

                  {/* Client */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-9 h-9 rounded-full bg-cream/10 border border-cream/15 flex items-center justify-center">
                      <span className="text-cream text-xs font-medium">
                        {t.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium leading-tight">
                        {t.name}
                      </p>
                      <p className="text-ash text-xs font-light">
                        {t.position}, {t.company}
                      </p>
                    </div>
                    <span className="ml-auto text-ash/40 text-xs font-light">
                      {t.country}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-6 bg-cream" : "w-1.5 bg-white/20"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, Quote, Construction } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

// Flip to true once the backend integration for testimonials is live.
const IS_LIVE = false;

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!IS_LIVE || !emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!IS_LIVE || !emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-void relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="mist-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">Testimonials</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
              What clients <span className="gradient-text">say</span>
            </h2>
          </div>

          {/* Navigation */}
          {IS_LIVE && (
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-clay bg-charcoal border border-white/[0.08] flex items-center justify-center text-ash hover:text-white hover:border-cream/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-clay bg-charcoal border border-white/[0.08] flex items-center justify-center text-ash hover:text-white hover:border-cream/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {IS_LIVE ? (
          <>
            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex py-3 -ml-3">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-3"
                  >
                    <div className="clay-card p-6 h-full flex flex-col hover:-translate-y-1 transition-transform duration-200">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
          </>
        ) : (
          /* Maintenance state */
          <div className="clay-card flex flex-col items-center justify-center text-center py-16 px-6">
            <div className="w-12 h-12 rounded-full bg-cream/10 border border-cream/15 flex items-center justify-center mb-5">
              <Construction className="w-5 h-5 text-cream" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">
              Testimonials are getting an upgrade
            </h3>
            <p className="text-ash text-sm font-light leading-relaxed max-w-md">
              We&apos;re currently connecting this section to our backend to
              keep client reviews fresh and up to date. Please check back
              shortly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
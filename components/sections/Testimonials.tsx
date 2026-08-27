"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Construction,
} from "lucide-react";
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
      className="py-20 lg:py-28 bg-bone relative overflow-hidden border-t border-iron"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">Testimonials</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian tracking-[-0.045em] text-balance">
              What clients <span className=" font-normal">say</span>
            </h2>
          </div>

          {/* Navigation */}
          {IS_LIVE && (
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full bg-paper-white border border-iron flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-paper-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full bg-paper-white border border-iron flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-paper-white transition-colors"
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
              <div className="flex py-3 -ml-4">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                  >
                    <div className="bg-paper-white border border-iron rounded-2xl p-6 h-full flex flex-col hover:border-obsidian transition-all shadow-sm">
                      {/* Quote icon */}
                      <div className="w-8 h-8 rounded-full bg-sandstone flex items-center justify-center mb-4 border border-iron">
                        <Quote className="w-4 h-4 text-obsidian" />
                      </div>

                      {/* Rating */}
                      <div className="mb-3">
                        <StarRating count={t.rating} />
                      </div>

                      {/* Review */}
                      <p className="text-obsidian/80 text-sm font-normal leading-relaxed flex-1 mb-6 ">
                        "{t.text}"
                      </p>

                      {/* Client */}
                      <div className="flex items-center gap-3 pt-4 border-t border-iron">
                        <div className="w-9 h-9 rounded-full bg-sandstone border border-iron flex items-center justify-center">
                          <span className="text-obsidian text-xs font-bold">
                            {t.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-obsidian text-sm font-bold leading-tight">
                            {t.name}
                          </p>
                          <p className="text-obsidian/70 text-xs font-normal">
                            {t.position}, {t.company}
                          </p>
                        </div>
                        <span className="ml-auto text-slate-teal text-xs font-medium">
                          {t.country}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedIndex ? "w-8 bg-obsidian" : "w-2 bg-iron"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          /* Maintenance state */
          <div className="bg-paper-white border border-iron rounded-[32px] flex flex-col items-center justify-center text-center py-16 px-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-sandstone border border-iron flex items-center justify-center mb-5">
              <Construction className="w-5 h-5 text-obsidian" />
            </div>
            <h3 className="text-obsidian font-serif text-2xl font-bold mb-2">
              Testimonials are getting an upgrade
            </h3>
            <p className="text-obsidian/70 text-base font-normal leading-relaxed max-w-md">
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

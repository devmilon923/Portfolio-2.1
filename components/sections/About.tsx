"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, GitBranch, Globe } from "lucide-react";
import { PERSONAL, STRENGTHS } from "@/lib/constants";

const icons = [Code2, Cpu, GitBranch, Globe];
import meImage from "./../../assets/me.jpeg";
import Image from "next/image";
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-charcoal relative overflow-hidden"
      ref={ref}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,237,210,0.8) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">About</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            The developer <span className="gradient-text">behind the code</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Clay frame */}
              <motion.div
                whileHover={{ rotateY: 6, rotateX: -4, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                className="relative w-72 h-80 sm:w-80 sm:h-96"
              >
                {/* Shadow layer */}
                <div className="absolute inset-0 rounded-clay-lg bg-cream/10 blur-xl scale-95 translate-y-4 -z-10" />

                {/* Outer frame */}
                <div className="w-full h-full rounded-clay-lg bg-charcoal-light border border-cream/10 shadow-clay-lg p-4 flex flex-col items-center justify-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-36 h-36 rounded-clay bg-void border border-cream/10 shadow-clay-md flex items-center justify-center relative overflow-hidden">
                    {/* Monogram */}
                    <Image
                      src={meImage}
                      alt="My Profile Picture"
                      // Optional: specify layout sizes if needed
                    />
                    {/* <span className="font-display text-5xl font-black text-cream opacity-80">
                      M
                    </span> */}
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-clay border-2 border-cream/5" />
                  </div>

                  <div className="text-center">
                    <p className="font-display text-2xl font-black text-white tracking-tight">
                      {PERSONAL.name}
                    </p>
                    <p className="text-cream text-sm font-light mt-1">
                      {PERSONAL.title}
                    </p>
                    <p className="text-ash text-xs font-light mt-1">
                      {PERSONAL.location}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-void border border-cream/10">
                    <span className="glow-dot w-1.5 h-1.5" />
                    <span className="text-cream text-xs font-light">
                      Open to Opportunities
                    </span>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-3 -right-3 bg-charcoal border border-cream/15 rounded-xl px-3 py-2 shadow-clay-sm"
                >
                  <p className="text-cream text-xs font-medium">1+ Year</p>
                  <p className="text-ash text-[10px] font-light">
                    Professional Exp.
                  </p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-3 -left-3 bg-charcoal border border-cream/15 rounded-xl px-3 py-2 shadow-clay-sm"
                >
                  <p className="text-cream text-xs font-medium">
                    AI + Full-Stack
                  </p>
                  <p className="text-ash text-[10px] font-light">
                    Core Specialty
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.3,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-white/90 text-base font-light leading-relaxed mb-4">
                {PERSONAL.summary}
              </p>
              <p className="text-ash text-sm font-light leading-relaxed">
                My background in Electrical Engineering gave me a
                systems-thinking mindset that shapes how I approach software —
                every component serves a purpose, every optimization has a
                reason. I don't just write code; I engineer solutions.
              </p>
            </motion.div>

            {/* Core strengths */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <p className="text-ash/60 text-xs font-light uppercase tracking-widest mb-4">
                Core Strengths
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STRENGTHS.map((strength, i) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <motion.div
                      key={strength.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                      className="p-4 rounded-clay bg-void border border-white/[0.06] hover:border-cream/15 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-cream/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-cream" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium leading-tight mb-1">
                            {strength.title}
                          </p>
                          <p className="text-ash text-xs font-light leading-relaxed">
                            {strength.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Philosophy */}
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="border-l-2 border-cream/30 pl-4 py-2"
            >
              <p className="text-ash text-sm font-light italic leading-relaxed">
                "Good software isn't about lines of code — it's about solving
                the right problem in the simplest way that lasts."
              </p>
              <p className="text-cream/60 text-xs font-light mt-2">
                — Development philosophy
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

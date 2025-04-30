// src/components/ParallaxHero.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="relative overflow-hidden min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      {/* Parallax Background */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 bg-gradient-to-br from-[#DDB892]/30 to-[#6B6B6B]/10 blur-2xl"
      ></motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-[#DDB892] to-[#6B6B6B] bg-clip-text text-transparent leading-tight">
          Elevate Your Event Game
        </h1>
        <p className="text-[#6B6B6B] mt-6 text-2xl max-w-3xl mx-auto">
          Create, promote, and manage events with ease on Goks Tickets—your ultimate event management platform.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          {/* Get Started Button */}
          <a
            href="/auth/signup"
            className="bg-[#DDB892] text-[#1E1E1E] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform hover:bg-[#caa374]"
          >
            Get Started
          </a>

          {/* Explore Events Button */}
          <a
            href="/events"
            className="border-2 border-[#DDB892] text-[#DDB892] hover:bg-[#DDB892] hover:text-[#1E1E1E] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform"
          >
            Explore Events
          </a>
        </div>
      </motion.div>
    </div>
  );
}

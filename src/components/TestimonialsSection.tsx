// src/components/TestimonialsSection.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    quote:
      "Goks Tickets made selling tickets a breeze! Our event sold out in record time.",
    author: "Sarah M., Event Organizer",
  },
  {
    quote:
      "We increased our event attendance by 3x using Goks Tickets’ promotion tools!",
    author: "James O., Festival Manager",
  },
  {
    quote:
      "The live analytics helped us track our audience and maximize engagement.",
    author: "Linda C., Conference Planner",
  },
  {
    quote:
      "Managing multiple events is easier than ever. Goks Tickets delivers top-notch tools!",
    author: "Daniel W., Event Coordinator",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [index]);

  const nextTestimonial = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Entrance Animation Logic
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Section Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className="py-24 px-6 bg-[#FAF9F6] text-center"
    >
      <h2 className="text-5xl font-extrabold text-[#DDB892] mb-12">
        What Organizers Say
      </h2>

      {/* Carousel */}
      <div className="max-w-4xl mx-auto relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="p-8 border border-[#DDB892] rounded-lg shadow-lg"
          >
            <p className="text-lg italic text-[#6B6B6B] mb-6">
              "{testimonials[index].quote}"
            </p>
            <footer className="text-[#DDB892] font-bold">
              {testimonials[index].author}
            </footer>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 text-[#DDB892] hover:scale-110 transition"
        >
          ❮
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 text-[#DDB892] hover:scale-110 transition"
        >
          ❯
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-[#DDB892]" : "bg-[#6B6B6B]"
            }`}
          ></div>
        ))}
      </div>
    </motion.section>
  );
}

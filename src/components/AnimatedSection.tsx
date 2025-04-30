// src/components/AnimatedSection.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number; // Delay for staggered animations
  speed?: number; // Control speed for each section
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 }, // Subtle slide up
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedSection({
  children,
  delay = 0,
  speed = 1.2, // Default speed
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger at 30% visibility
      variants={sectionVariants}
      transition={{
        duration: speed, // Control the speed of the slide
        delay,
        ease: [0.33, 1, 0.68, 1], // Smoother, more natural easing
      }}
    >
      {children}
    </motion.div>
  );
}

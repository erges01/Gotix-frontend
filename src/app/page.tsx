// src/app/page.tsx
import Navbar from "../components/Navbar";
import ParallaxHero from "../components/ParallaxHero";
import FeatureSection from "../components/FeatureSection";
import HowItWorksSection from "../components/HowItWorksSection";
import OrganizerSection from "../components/OrganizerSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <ParallaxHero />

      <AnimatedSection speed={1.5}>
        <FeatureSection />
      </AnimatedSection>

      <AnimatedSection delay={0.2} speed={1.3}>
        <HowItWorksSection />
      </AnimatedSection>

      <AnimatedSection delay={0.4} speed={1.1}>
        <OrganizerSection />
      </AnimatedSection>

      <AnimatedSection delay={0.6} speed={1.4}>
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.8} speed={1.6}>
        <PricingSection />
      </AnimatedSection>

      <Footer />
    </div>
  );
}

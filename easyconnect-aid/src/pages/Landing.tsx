import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DifferentiatorSection from "@/components/landing/DifferentiatorSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    // Changed to bg-orange-50 (Soft Peach) for a warm, unified base
    // Updated text to stone-900 for readability against the light background
    <div className="min-h-screen bg-orange-50 text-stone-900 selection:bg-peach selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <DifferentiatorSection />
        <HowItWorksSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
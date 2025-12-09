import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <section className="relative pt-40 pb-10 md:pt-48 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Minimalist Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-200 bg-white mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500">
              EST. 2025
            </span>
          </div>

          {/* Premium Typography Headline */}
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-8">
            Curated companionship for the <i className="font-serif italic text-stone-500">ageless mind.</i>
          </h1>

          {/* Clean Subheadline */}
          <p className="text-lg md:text-xl text-stone-600 max-w-xl mx-auto mb-12 font-light leading-relaxed">
            An intelligent bridge to new friendships. We listen, learn, and connect you with peers who share your story.
          </p>

          {/* High Contrast Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={handleClick}
              className="rounded-full px-10 h-14 text-base bg-stone-900 hover:bg-stone-800 text-white shadow-none transition-all duration-300 w-full sm:w-auto"
            >
              Start Membership
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full px-10 h-14 text-base border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900 w-full sm:w-auto"
            >
              View Sample Call
            </Button>
          </div>

          {/* Minimal Social Proof */}
          <div className="mt-20 pt-10 border-t border-stone-200/60">
            <p className="text-sm text-stone-400 font-medium tracking-wide uppercase">
              Trusted by 5,000+ Families
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
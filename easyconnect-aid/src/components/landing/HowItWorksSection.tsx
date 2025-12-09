import { Phone, Ear, FileText, Users } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Initiate",
    description: "Scheduled check-ins on your terms.",
  },
  {
    icon: Ear,
    title: "Analyze",
    description: "We learn the details that make you unique.",
  },
  {
    icon: FileText,
    title: "Curate",
    description: "Bespoke newsletters delivered weekly.",
  },
  {
    icon: Users,
    title: "Connect",
    description: "Introductions to compatible peers.",
  },
];

const HowItWorksSection = () => {
  return (
    // Switched bg to orange-50 (Peach base) and borders to orange-200
    <section className="py-32 bg-orange-50 border-y border-orange-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="font-serif text-4xl text-stone-900 max-w-xs">
            The Journey to Connection
          </h2>
          <p className="text-stone-600 font-light mb-2">
            Four steps to a fuller social life.
          </p>
        </div>

        {/* Updated grid borders to orange-200 to match the peach theme */}
        <div className="grid md:grid-cols-4 gap-0 border-t border-l border-orange-200">
          {steps.map((step, index) => (
            <div
              key={step.title}
              // Base bg blends with section (orange-50), becomes white on hover for contrast
              className="group p-10 border-r border-b border-orange-200 bg-orange-50 hover:bg-white transition-colors duration-500"
            >
              <div className="mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                {/* Icon: Golden by default, turns Peach on hover */}
                <step.icon 
                  className="w-6 h-6 text-golden group-hover:text-peach transition-colors duration-300" 
                  strokeWidth={1.5} 
                />
              </div>
              {/* Step Counter: Now Peach instead of gray */}
              <span className="block text-xs font-bold tracking-widest text-peach mb-2">
                0{index + 1}
              </span>
              <h3 className="font-serif text-xl text-stone-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
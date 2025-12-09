import React from 'react';
import { Sparkles, Heart, Users } from "lucide-react";

const DifferentiatorSection = () => {
  return (
    // Changed bg-stone-50 to bg-orange-50 for a soft "Peach-ish" tint
    <section className="pt-12 pb-32 bg-orange-50 text-stone-900">
      <div className="container mx-auto px-6">
        
        {/* === NEW SECTION START: Image Only in Box === */}
        {/* Added specific height (h-[400px] md:h-[500px]) so the image has space to show since there is no text to prop it open */}
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden mb-24 h-[400px] md:h-[500px] relative">
          <img 
            src="/grandmapa_landscape.png"
            alt="A friendly conversation" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* === NEW SECTION END === */}


        {/* === ORIGINAL TEXT SECTION === */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">
            Beyond the chat.
          </h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            Most AI stops at conversation. We treat it as the beginning of a connection.
            By understanding your history, we help build your future social circle.
          </p>
        </div>

        {/* Updated border color to match the peach theme (orange-200) */}
        <div className="grid md:grid-cols-3 gap-12 border-t border-orange-200 pt-16">
          {/* Feature 1 */}
          <div className="group">
            <div className="w-14 h-14 rounded-full bg-white border border-orange-100 shadow-sm flex items-center justify-center mb-6 group-hover:bg-peach group-hover:border-peach transition-all duration-500">
              <Sparkles 
                className="w-6 h-6 text-golden group-hover:text-white transition-colors duration-500" 
                strokeWidth={1.5} 
              />
            </div>
            <h3 className="font-serif text-2xl mb-3 text-stone-900 group-hover:text-peach-dark transition-colors duration-300">
              Intelligent Listening
            </h3>
            <p className="text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
              Our system recalls the nuances of your life—your favorite authors, your childhood home, and your daily triumphs.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group">
            <div className="w-14 h-14 rounded-full bg-white border border-orange-100 shadow-sm flex items-center justify-center mb-6 group-hover:bg-peach group-hover:border-peach transition-all duration-500">
              <Heart 
                className="w-6 h-6 text-golden group-hover:text-white transition-colors duration-500" 
                strokeWidth={1.5} 
              />
            </div>
            <h3 className="font-serif text-2xl mb-3 text-stone-900 group-hover:text-peach-dark transition-colors duration-300">
              Curated Content
            </h3>
            <p className="text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
              Receive a weekly digest crafted specifically for you, connecting your past interests with new discoveries.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group">
            <div className="w-14 h-14 rounded-full bg-white border border-orange-100 shadow-sm flex items-center justify-center mb-6 group-hover:bg-peach group-hover:border-peach transition-all duration-500">
              <Users 
                className="w-6 h-6 text-golden group-hover:text-white transition-colors duration-500" 
                strokeWidth={1.5} 
              />
            </div>
            <h3 className="font-serif text-2xl mb-3 text-stone-900 group-hover:text-peach-dark transition-colors duration-300">
              Human Connection
            </h3>
            <p className="text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
              The ultimate goal is offline joy. We seamlessly introduce you to peers who resonate with your personality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection; 
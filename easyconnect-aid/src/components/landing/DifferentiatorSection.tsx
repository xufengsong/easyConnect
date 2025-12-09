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
            alt="다정한 대화를 나누는 모습" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* === NEW SECTION END === */}


        {/* === ORIGINAL TEXT SECTION === */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900 word-keep-all">
            대화, 그 이상의 감동을 전합니다.
          </h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed word-keep-all">
            대부분의 AI는 대화에서 멈추지만, 저희는 이를 소중한 인연의 시작으로 여깁니다. 
            어르신의 지나온 삶과 이야기를 깊이 이해하고, 앞으로의 따뜻한 교류를 이어드립니다.
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
              세심한 기억과 공감
            </h3>
            <p className="text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors word-keep-all">
              좋아하는 작가, 그리운 고향, 소소한 일상의 기쁨까지. 어르신의 소중한 추억과 삶의 이야기들을 하나하나 세심하게 기억합니다.
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
              나만을 위한 맞춤 이야기
            </h3>
            <p className="text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors word-keep-all">
              어르신의 관심사와 취향을 바탕으로 엄선된 이야기들을 매주 전해드립니다. 익숙한 즐거움 속에서 새로운 발견을 선물해 드립니다.
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
              새로운 인연과의 만남
            </h3>
            <p className="text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors word-keep-all">
              기술의 최종 목표는 사람의 온기입니다. 어르신과 마음이 잘 맞는 소중한 벗을 찾아, 온라인을 넘어선 따뜻한 만남으로 이어드립니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
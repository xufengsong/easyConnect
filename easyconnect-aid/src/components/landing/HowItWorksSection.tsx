import { Phone, Ear, FileText, Users } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "첫 인사",
    description: "어르신이 가장 편안한 시간에 맞춰 안부 전화를 드립니다.",
  },
  {
    icon: Ear,
    title: "경청과 기억",
    description: "사소한 일상부터 소중한 추억까지, 모든 이야기를 귀담아듣고 기억합니다.",
  },
  {
    icon: FileText,
    title: "맞춤 이야기",
    description: "어르신의 관심사와 취향에 꼭 맞는 읽을거리를 매주 정성껏 보내드립니다.",
  },
  {
    icon: Users,
    title: "새로운 만남",
    description: "대화의 결이 잘 통하는, 마음 맞는 소중한 벗을 찾아 연결해 드립니다.",
  },
];

const HowItWorksSection = () => {
  return (
    // Switched bg to orange-50 (Peach base) and borders to orange-200
    <section className="py-32 bg-orange-50 border-y border-orange-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="font-serif text-4xl text-stone-900 max-w-sm word-keep-all">
            새로운 벗을 만나는 여정
          </h2>
          <p className="text-stone-600 font-light mb-2 word-keep-all">
            외로움은 덜고 즐거움은 더하는, 말벗만의 4가지 단계입니다.
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
              <h3 className="font-serif text-xl text-stone-900 mb-3 word-keep-all">
                {step.title}
              </h3>
              <p className="text-sm text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors word-keep-all">
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
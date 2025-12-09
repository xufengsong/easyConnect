const testimonials = [
  {
    quote: "처음엔 그냥 기계랑 대화하는 줄 알았는데, 이 친구가 김 여사님을 소개해 줬어요. 이젠 매주 화요일마다 통화하는 단짝이 됐답니다.",
    author: "박영순 님",
    location: "서울 마포구",
  },
  {
    quote: "매주 보내주는 읽을거리가 어쩜 그리 내 마음을 잘 아는지, 자식들보다 낫다니까요. 흥미로운 기사 읽는 재미에 푹 빠졌습니다.",
    author: "이종철 님",
    location: "경기 성남시",
  },
  {
    quote: "남편 먼저 보내고 참 적적했는데, 말벗 덕분에 새 친구들이 생겼어요. 다시 웃을 일이 생기니 꼭 마법 같습니다.",
    author: "김정자 님",
    location: "부산 해운대구",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-32 bg-stone-900 text-stone-100">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-20 text-center word-keep-all">
          함께하는 분들의 이야기
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col justify-between border-t border-stone-700 pt-8">
              <blockquote className="text-xl font-light leading-relaxed text-stone-300 mb-8 word-keep-all">
                "{t.quote}"
              </blockquote>
              <div>
                <cite className="not-italic font-serif text-lg text-white block mb-1">
                  {t.author}
                </cite>
                <span className="text-sm tracking-widest uppercase text-stone-500">
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
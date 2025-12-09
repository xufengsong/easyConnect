const testimonials = [
  {
    quote: "I thought I was just talking to an AI, but then it introduced me to Sarah. Now we talk every Tuesday.",
    author: "Margaret H.",
    location: "Portland, OR",
  },
  {
    quote: "The weekly newsletter knows me better than my own family. It finds the most interesting articles.",
    author: "Robert B.",
    location: "Austin, TX",
  },
  {
    quote: "I was lonely after my husband passed. Now I have a new circle of friends. It feels like magic.",
    author: "Dorothy K.",
    location: "Miami, FL",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-32 bg-stone-900 text-stone-100">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-20 text-center">
          Member Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col justify-between border-t border-stone-700 pt-8">
              <blockquote className="text-xl font-light leading-relaxed text-stone-300 mb-8">
                "{t.quote}"
              </blockquote>
              <div>
                <cite className="not-italic font-serif text-lg text-white block mb-1">
                  {t.author}
                </cite>
                <span className="text-xs tracking-widest uppercase text-stone-500">
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
"use client";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah",
      role: "Marketing Graduate",
      initial: "S",
      color: "from-pink-400 to-fuchsia-500",
      quote:
        "“I felt invisible sending applications. With AspiraFlows I finally got real replies. The messages sound friendly and real — that’s why they work.”",
    },
    {
      name: "James",
      role: "Junior Software Developer",
      initial: "J",
      color: "from-blue-400 to-indigo-500",
      quote:
        "“I stopped dropping my CV into portals and actually reached managers directly. Two interviews in a week from messages I’d never have thought to send.”",
    },
    {
      name: "Aisha",
      role: "Data Analyst",
      initial: "A",
      color: "from-violet-400 to-purple-500",
      quote:
        "“I didn’t expect much, but my first reply came from a Head of Data. The intro message was short, kind, and actually sounded like me. This feels way better than mass applying.”",
    },
  ];

  return (
    <section className="relative py-24">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.18),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold mb-12 text-white text-center">
          What people say about AspiraFlows
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((t, index) => {
            const isMiddle = index === 1;

            return (
              <div
                key={t.name}
                className={`
                  relative rounded-3xl p-6 backdrop-blur-xl border 
                  transition-all duration-300
                  
                  ${
                    isMiddle
                      ? "scale-105 border-white/10 bg-slate-900/60 shadow-[0_0_40px_rgba(99,102,241,0.25)]"
                      : "bg-slate-900/50 border-slate-700/50 shadow-[0_0_20px_rgba(15,23,42,0.4)]"
                  }

                  hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)]
                `}
              >
                {/* Avatar Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`
                      h-11 w-11 rounded-full flex items-center justify-center text-white font-semibold
                      bg-gradient-to-br ${t.color} shadow-md
                    `}
                  >
                    {t.initial}
                  </div>

                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-300 leading-relaxed">{t.quote}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

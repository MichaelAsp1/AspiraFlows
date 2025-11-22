export const metadata = {
  title: "Contact | AspiraFlows",
  description: "Get in touch with the AspiraFlows team.",
};

export default function ContactPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const sent = searchParams?.sent === "1";

  return (
    // Full-page wrapper so we can override any layout grid + keep stars
    <div className="relative min-h-[calc(100vh-56px-56px)]">
      {/* Solid dark base */}
      <div className="absolute inset-0 -z-20 bg-[#020617]" />

      {/* Stars layer if you’re using .starfield elsewhere */}
      <div className="absolute inset-0 -z-10 starfield" />

      {/* Soft cyan glow behind header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-5 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_65%)]" />

      <main className="relative mx-auto max-w-3xl px-4 py-20 text-gray-100">
        {/* HEADER */}
        <section className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-2">
            Get in touch
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-white">
            Contact Us
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Have a question about plans, want to collaborate, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </section>

        {/* SUCCESS BANNER */}
        {sent && (
          <div className="mb-8 rounded-2xl border border-emerald-400/60 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 text-center font-medium shadow-[0_0_32px_rgba(16,185,129,0.45)]">
            Thanks! Your message is in. I&apos;ll get back to you shortly.
          </div>
        )}

        {/* CONTACT INFO CARD */}
        <div className="mb-8 rounded-3xl border border-slate-700/70 bg-slate-950/80 px-6 py-6 sm:px-8 sm:py-7 text-center text-gray-100 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
          <p className="mb-3 text-sm">
            <span className="font-semibold text-gray-200">Email:</span>{" "}
            <a
              href="mailto:michael.aspegren@aspiraflows.com"
              className="font-medium text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
            >
              michael.aspegren@aspiraflows.com
            </a>
          </p>

          <p className="mb-3 text-sm">
            <span className="font-semibold text-gray-200">LinkedIn:</span>{" "}
            <a
              href="https://www.linkedin.com/in/michael-aspegren"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
            >
              linkedin.com/in/michael-aspegren
            </a>
          </p>

          <p className="text-sm text-gray-300">
            <span className="font-semibold text-gray-200">Location:</span>{" "}
            Cannes, France (remote worldwide)
          </p>
        </div>

        {/* FORM */}
        <form
          action="/api/contact"
          method="POST"
          className="mt-4 space-y-4 rounded-3xl border border-slate-700/70 bg-slate-950/80 px-6 py-7 sm:px-8 sm:py-8 text-gray-100 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.9)]"
        >
          <div>
            <label className="block text-left mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-left mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-left mb-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder="Tell us a bit about what you’re looking for..."
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(8,47,73,0.9)] transition-all hover:from-cyan-400 hover:to-purple-400 hover:shadow-[0_20px_55px_rgba(8,47,73,1)]"
          >
            Send Message
          </button>
        </form>

        {/* BACK */}
        <div className="text-center mt-10">
          <a
            href="/"
            className="text-sm font-medium text-gray-300 hover:text-cyan-300 underline underline-offset-4"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}

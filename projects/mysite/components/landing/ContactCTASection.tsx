"use client";

export default function ContactCTASection() {
  return (
    <section className="px-4 py-10 sm:py-16 text-center">
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
        Ready to reach decision-makers faster?
      </h2>
      <a
        href="/contact"
        className="inline-flex w-full sm:w-auto justify-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-cyan-400 hover:to-purple-400 transition"
      >
        Contact Us
      </a>
    </section>
  );
}

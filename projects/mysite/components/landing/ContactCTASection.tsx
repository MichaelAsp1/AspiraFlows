"use client";

export default function ContactCTASection() {
  return (
    <section className="text-center py-16">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Ready to reach decision-makers faster?
      </h2>
      <a
        href="/contact"
        className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition"
      >
        Contact Us
      </a>
    </section>
  );
}

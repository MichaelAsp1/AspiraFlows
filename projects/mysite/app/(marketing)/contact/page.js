export const metadata = {
  title: "Contact | AspiraFlows",
  description: "Get in touch with the AspiraFlows team.",
};

export default function ContactPage({ searchParams }) {
  const sent = searchParams?.sent === "1";

  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-gray-900">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Contact Us
      </h1>

      <p className="text-center text-lg text-gray-800 mb-10 max-w-xl mx-auto">
        Have a question about our plans, want to collaborate, or just want to say hello?{" "}
        We’d love to hear from you.
      </p>

      {/* SUCCESS BANNER */}
      {sent && (
        <div className="mb-8 rounded-lg border border-green-300 bg-green-50 p-4 text-green-800 text-center font-medium">
          Thanks! Your message is in. I’ll get back to you shortly.
        </div>
      )}

      {/* CONTACT INFO CARD */}
      <div className="bg-white p-8 rounded-xl shadow-md space-y-4 text-center text-gray-900">
        <p>
          <strong className="font-semibold">Email:</strong>{" "}
          <a
            href="mailto:michael.aspegren@aspiraflows.com"
            className="underline text-indigo-600 font-medium"
          >
            michael.aspegren@aspiraflows.com
          </a>
        </p>

        <p>
          <strong className="font-semibold">LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/michael-aspegren"
            target="_blank"
            rel="noreferrer"
            className="underline text-indigo-600 font-medium"
          >
            linkedin.com/in/michael-aspegren
          </a>
        </p>

        <p>
          <strong className="font-semibold">Location:</strong>{" "}
          Cannes, France (remote worldwide)
        </p>
      </div>

      {/* FORM */}
      <form
        action="/api/contact"
        method="POST"
        className="mt-10 space-y-4 bg-white p-8 rounded-xl shadow-md text-gray-900"
      >
        <div>
          <label className="block text-left mb-1 font-semibold text-gray-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-left mb-1 font-semibold text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-left mb-1 font-semibold text-gray-900">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition w-full font-semibold"
        >
          Send Message
        </button>
      </form>

      {/* BACK */}
      <div className="text-center mt-10">
        <a href="/" className="underline text-gray-900 font-medium hover:text-indigo-600">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}

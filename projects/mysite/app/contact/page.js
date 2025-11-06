export const metadata = {
  title: "Contact | AspiraFlows",
  description: "Get in touch with the AspiraFlows team.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        Have a question about our plans, want to collaborate, or just want to say hello?  
        We’d love to hear from you.
      </p>

      {/* CONTACT INFO */}
      <div className="bg-white p-8 rounded-xl shadow-md space-y-4 text-center">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:michael.aspegren@aspiraflows.com"
            className="underline"
          >
            michael.aspegren@aspiraflows.com
          </a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="www.linkedin.com/in/michael-aspegren"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            linkedin.com/in/michaelaspegren
          </a>
        </p>
        <p>
          <strong>Location:</strong> Cannes, France (remote worldwide)
        </p>
      </div>

      {/* OPTIONAL FORM */}
      <form
        action="https://formspree.io/f/yourformid"
        method="POST"
        className="mt-10 space-y-4 bg-white p-8 rounded-xl shadow-md"
      >
        <div>
          <label className="block text-left mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-left mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-left mb-1 font-medium">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            className="w-full border rounded-lg p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition w-full"
        >
          Send Message
        </button>
      </form>

      <div className="text-center mt-10">
        <a href="/" className="underline text-gray-700">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}

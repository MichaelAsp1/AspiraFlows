import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.TO_EMAIL,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    });

    return Response.redirect("/contact?sent=1", 303);
  } catch (err) {
    console.error("Email error:", err);
    return new Response("Email send failed", { status: 500 });
  }
}

// app/api/contact/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const data = await req.formData();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,          // true only if you use port 465
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `AspiraFlows <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    });

    // ✅ absolute redirect fixes the “Email send failed” after-send error
    return NextResponse.redirect(new URL("/contact?sent=1", req.url), 303);
  } catch (err) {
    console.error("Email error:", err);
    return new Response("Email send failed", { status: 500 });
  }
}

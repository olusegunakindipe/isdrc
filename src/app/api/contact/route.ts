import { NextResponse } from "next/server";

import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";

const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "info@isdrcnigeria.org";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { message: "Email service is not configured" },
      { status: 500 }
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid submission" },
      { status: 400 }
    );
  }

  const { name, surname, email, phone, message } = parsed.data;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `ISDRC Website <${CONTACT_FROM_EMAIL}>`,
    to: toEmail,
    replyTo: email,
    subject: `New contact form submission from ${name} ${surname}`,
    text: [
      `Name: ${name} ${surname}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; 

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, phone } = await req.json();

    // nodemailer config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: subject,
        html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
      <h2 style="color:#000;" align="center">New Message from Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <hr style="border:0; border-top:1px solid #ddd; margin:20px 0;">
      <p style="white-space:pre-line; border:1px solid #ddd;padding:10px;border-radius:7px">${message}</p>
    </div>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(" Error sending email:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

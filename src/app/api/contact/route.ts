// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";


export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Transporter (This connects to your email provider)
    // For Gmail, use an "App Password" (not your login password)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'outlook', 'yahoo', or use host/port for custom SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send Email
    // 3. Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `✨ Portfolio: New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; color: #1f2937;">
          
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                
                <div style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                  
                  <div style="background-color: #0f172a; padding: 30px; text-align: center;">
                    <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Inquiry</h2>
                    <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px;">Someone contacted you via your portfolio</p>
                  </div>

                  <div style="padding: 32px;">
                    
                    <table style="width: 100%; margin-bottom: 24px;">
                      <tr>
                        <td style="padding-bottom: 16px; width: 50%; vertical-align: top;">
                          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">From</p>
                          <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 500; color: #0f172a;">${name}</p>
                        </td>
                        <td style="padding-bottom: 16px; width: 50%; vertical-align: top;">
                          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">Reply To</p>
                          <a href="mailto:${email}" style="margin: 4px 0 0 0; font-size: 16px; font-weight: 500; color: #3b82f6; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                    </table>

                    <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px; padding: 24px;">
                      <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600; margin-bottom: 8px;">Message</p>
                      <p style="margin: 0; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
                    </div>

                    <div style="margin-top: 32px; text-align: center;">
                      <a href="mailto:${email}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Reply Directly</a>
                    </div>

                  </div>

                </div>

                <div style="margin-top: 24px; text-align: center;">
                  <p style="margin: 0; color: #94a3b8; font-size: 12px;">Sent automatically from your Portfolio Website</p>
                </div>

              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

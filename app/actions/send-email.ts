"use server";

import nodemailer from "nodemailer";

type EmailData = {
  email: string;
  message: string;
};

export async function sendEmail(data: EmailData) {
  try {
    // Create a transporter with Gmail configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Set up email data
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL, // Send to yourself
      replyTo: data.email,
      subject: `New contact form submission from ${data.email}`,
      text: data.message,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully! we'll in touch soon",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}

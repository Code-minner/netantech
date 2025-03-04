// netlify/functions/form-submission-handler.js
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Decode form data
  const payload = JSON.parse(event.body).payload;
  const formData = payload.data;
  
  // Get submitter's email from form data
  const submitterEmail = formData.email;
  
  // Set up email transporter
  const transporter = nodemailer.createTransport({
    host: 'your-smtp-server.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@netantech.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  // Send confirmation email
  await transporter.sendMail({
    from: '"NetanTech Team" <info@netantech.com>',
    to: submitterEmail,
    subject: 'Thank you for contacting us',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a4a4a;">Thank You for Reaching Out!</h2>
        <p>Dear ${formData.fullName},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a summary of what you sent us:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p><strong>Subject:</strong> ${formData.subject || 'N/A'}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        </div>
        <p>Our team typically responds within 24-48 business hours.</p>
        <p>Best regards,<br>The NetanTech Team</p>
      </div>
    `
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Confirmation email sent" })
  };
};
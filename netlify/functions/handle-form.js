// netlify/functions/handle-form.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse form data
    const formData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name, email, and message are required" })
      };
    }

    // Prepare email data for Postal API
    const emailData = {
      to: [{ address: "info@netantech.com" }], // Your receiving email
      from: { address: "info@netantech.com", name: "Netan Technologies Website" },
      subject: `New Contact Form: ${formData.subject || 'Website Inquiry'}`,
      html_body: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${formData.subject || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
      text_body: `
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject || 'Not provided'}

Message:
${formData.message}
      `
    };

    // Send email using Postal API
    const response = await fetch('https://your-postal-instance.com/api/v1/send/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Server-API-Key': process.env.POSTAL_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Postal API error: ${JSON.stringify(result)}`);
    }

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully" })
    };
  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error processing form" })
    };
  }
};
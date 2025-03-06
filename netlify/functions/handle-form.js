// netlify/functions/handle-form.js
exports.handler = async function(event, context) {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  
  try {
    // Parse form data
    const formData = JSON.parse(event.body);
    
    // Get the token from environment
    const token = process.env.POSTMARK_API_TOKEN;
    
    // Log token presence (but not the actual token for security)
    console.log("Token exists:", !!token);
    console.log("Token length:", token ? token.length : 0);
    
    // Prepare email data
    const emailData = {
      From: "info@netantech.com",
      To: "info@netantech.com",
      Subject: `New Contact Form: ${formData.subject || 'Website Inquiry'}`,
      HtmlBody: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${formData.subject || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message ? formData.message.replace(/\n/g, '<br>') : ''}</p>
      `,
      TextBody: `
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject || 'Not provided'}

Message:
${formData.message || ''}
      `,
      MessageStream: "outbound"
    };
    
    // Log request details (without sensitive data)
    console.log("Making request to Postmark API");
    
    // Make the request with proper headers
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Postmark-Server-Token': token
      },
      body: JSON.stringify(emailData)
    });
    
    // Get response and log status
    console.log("Postmark API status:", response.status);
    const result = await response.json();
    console.log("Postmark API response:", JSON.stringify(result));
    
    if (response.status !== 200) {
      throw new Error(`Postmark API error: ${JSON.stringify(result)}`);
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
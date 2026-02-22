// Vercel Serverless Function for Contact Form
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Please use POST.' 
    });
  }

  try {
    // Get form data
    const { name, email, message, country } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Log the submission (in production, you'd save to a database)
    const submissionData = {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      practiceArea: country || 'Not selected',
      message: message
    };

    console.log('Form submission received:', submissionData);

    // NOTE: Email sending options for production:
    // 
    // Option 1: Use Resend (Recommended - Free tier: 3000 emails/month)
    // Install: npm install resend
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'birgen@techcrast.co.ke',
    //   subject: `New Consultation Request from ${name}`,
    //   html: emailBody
    // });
    //
    // Option 2: Use SendGrid
    // Install: npm install @sendgrid/mail
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send(emailConfig);
    //
    // Option 3: Use Nodemailer with SMTP
    // Install: npm install nodemailer
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail(emailConfig);

    // For now, return success (you'll need to implement email sending)
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. We will contact you soon.',
      data: submissionData
    });

  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
}

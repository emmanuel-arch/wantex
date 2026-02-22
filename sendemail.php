<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log form submission
$log_file = 'email_log.txt';
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Form submission received\n", FILE_APPEND);

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data and sanitize inputs
    $name = isset($_POST['name']) ? filter_var($_POST['name'], FILTER_SANITIZE_STRING) : 'Not provided';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? filter_var($_POST['message'], FILTER_SANITIZE_STRING) : 'No message';
    $practice_area = isset($_POST['country']) ? filter_var($_POST['country'], FILTER_SANITIZE_STRING) : 'Not selected';

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        file_put_contents($log_file, date('Y-m-d H:i:s') . " - Invalid email: $email\n", FILE_APPEND);
        echo "<script>alert('Please provide a valid email address.'); window.location.href='index.html#consultation-section';</script>";
        exit;
    }

    // Recipient email address
    $to = "info@kiskanlawafrica.co.ke";
    
    // Email subject
    $subject = "New Consultation Request from $name";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email body
    $email_body = "
    <html>
    <head>
        <title>New Consultation Request</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #333366; }
            .details { background: #f9f9f9; padding: 15px; border-left: 4px solid #333366; }
            .footer { margin-top: 20px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>New Consultation Request from Kiskan Law Website</h2>
            <div class='details'>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Practice Area:</strong> $practice_area</p>
                <p><strong>Message:</strong></p>
                <p>$message</p>
            </div>
            <div class='footer'>
                <p>This email was sent from the Kiskan Law website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Create backup of submission
    $submission_dir = 'public/form_submissions';
    
    // Create directory if it doesn't exist
    if (!is_dir($submission_dir)) {
        mkdir($submission_dir, 0755, true);
    }
    
    // Save submission to file
    $submission_data = "Time: " . date('Y-m-d H:i:s') . "\n";
    $submission_data .= "Name: $name\n";
    $submission_data .= "Email: $email\n";
    $submission_data .= "Practice Area: $practice_area\n";
    $submission_data .= "Message: $message\n\n";
    $submission_data .= "----------------\n\n";
    
    $submission_file = $submission_dir . '/submissions.txt';
    file_put_contents($submission_file, $submission_data, FILE_APPEND);
    
    // Attempt to send email
    $mail_sent = mail($to, $subject, $email_body, $headers);
    
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Mail send attempt result: " . ($mail_sent ? "success" : "failed") . "\n", FILE_APPEND);
    
    // Handle result
    if ($mail_sent) {
        // Success message
        echo "<script>alert('Thank you! Your message has been sent successfully.'); window.location.href='index.html';</script>";
    } else {
        // Error with PHP mail function, but we've saved the submission
        echo "<script>alert('Your message has been received, but there was an issue with our email system. We will contact you soon.'); window.location.href='index.html';</script>";
    }
} else {
    // Not a POST request
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Invalid request method: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);
    echo "<script>alert('Invalid request method. Please submit the form.'); window.location.href='index.html#consultation-section';</script>";
}
?>
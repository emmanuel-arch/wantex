<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in response

// Debug - log access to this file
file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - Form handler accessed - Method: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);

// Set CORS headers for cross-domain requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// If it's a preflight OPTIONS request, just return with OK status
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'CORS preflight OK']);
    exit();
}

// Add a direct GET response for debugging
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Form handler is working!']);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Only POST method is allowed']);
    exit();
}

// For easy testing - change this to false to attempt actual email sending
$simulateSuccess = true;

try {
    // Log the raw POST data
    $rawPost = file_get_contents('php://input');
    file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - Raw POST data: " . $rawPost . "\n", FILE_APPEND);
    
    // Get the posted data
    $postData = json_decode($rawPost, true);
    
    // Check if JSON was valid
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON: " . json_last_error_msg());
    }
    
    // Validate required fields
    $requiredFields = ['names', 'email', 'phone', 'subject', 'natureOfMatter'];
    $missingFields = [];
    
    foreach ($requiredFields as $field) {
        if (empty($postData[$field])) {
            $missingFields[] = $field;
        }
    }
    
    if (!empty($missingFields)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Missing required fields', 'fields' => $missingFields]);
        exit();
    }
    
    // Sanitize input
    $name = filter_var($postData['names'], FILTER_SANITIZE_STRING);
    $email = filter_var($postData['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($postData['phone'], FILTER_SANITIZE_STRING);
    $subject = filter_var($postData['subject'], FILTER_SANITIZE_STRING);
    $natureOfMatter = filter_var($postData['natureOfMatter'], FILTER_SANITIZE_STRING);
    $otherNatureDetails = isset($postData['otherNatureDetails']) ? filter_var($postData['otherNatureDetails'], FILTER_SANITIZE_STRING) : '';
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit();
    }
    
    // Build email body
    $emailSubject = "New Appointment Request: {$subject}";
    $emailBody = "Dear Kiskan Law Team,\n\n";
    $emailBody .= "You have received a new appointment request with the following details:\n\n";
    $emailBody .= "Name: {$name}\n";
    $emailBody .= "Email: {$email}\n";
    $emailBody .= "Phone: {$phone}\n";
    $emailBody .= "Subject: {$subject}\n";
    $emailBody .= "Nature of Matter: {$natureOfMatter}\n";

    if ($natureOfMatter === 'Other' && !empty($otherNatureDetails)) {
        $emailBody .= "Additional Details: {$otherNatureDetails}\n";
    }

    $emailBody .= "\nThis is an automated email sent through the Kiskan Law website contact form.";
    
    // If simulating success, return a success response without actually sending
    if ($simulateSuccess) {
        file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - Simulating success (no email sent)\n", FILE_APPEND);
        http_response_code(200);
        echo json_encode([
            'success' => true, 
            'message' => 'Your message has been sent successfully', 
            'note' => 'This is a simulation - no actual email was sent'
        ]);
        exit();
    }
    
    // Set up recipients - change this to the actual recipient for production
    $to = 'hawkinsalvin277@gmail.com';
    
    // Set email headers
    $headers = "From: {$email}\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Store the form data in a text file as a backup
    $formData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'natureOfMatter' => $natureOfMatter,
        'otherNatureDetails' => $otherNatureDetails
    ];
    
    $formDataStr = json_encode($formData, JSON_PRETTY_PRINT);
    $formFilename = 'form_submissions/submission_' . date('Y-m-d_H-i-s') . '_' . substr(md5(rand()), 0, 6) . '.txt';
    
    // Create directory if it doesn't exist
    if (!is_dir('form_submissions')) {
        mkdir('form_submissions', 0755, true);
    }
    
    file_put_contents($formFilename, $formDataStr);
    file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - Form data saved to file: {$formFilename}\n", FILE_APPEND);
    
    // Try to send the email using PHP's mail function
    $mailSent = mail($to, $emailSubject, $emailBody, $headers);
    
    if ($mailSent) {
        file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - Email sent successfully\n", FILE_APPEND);
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully']);
    } else {
        file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - Failed to send email but data saved to file\n", FILE_APPEND);
        // Return success anyway since we saved the form data
        http_response_code(200);
        echo json_encode([
            'success' => true, 
            'message' => 'Your request has been received. Our team will contact you shortly.',
            'note' => 'Email delivery failed but your submission was saved'
        ]);
    }
    
} catch (Exception $e) {
    // Log the error
    file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - ERROR: " . $e->getMessage() . "\n", FILE_APPEND);
    
    // Return a proper JSON error response
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error processing form: ' . $e->getMessage()]);
}
?> 
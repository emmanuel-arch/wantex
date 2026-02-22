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

// For testing: set to true to just simulate success without sending email
// For production: set to false to actually send emails
$testMode = false;

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
    $emailBody = "Dear Kiskan Law Team,\n\n";
    $emailBody .= "You have received a new appointment request with the following details:\n\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n";
    $emailBody .= "Subject: $subject\n";
    $emailBody .= "Nature of Matter: $natureOfMatter\n";

    if ($natureOfMatter === 'Other' && !empty($otherNatureDetails)) {
        $emailBody .= "Additional Details: $otherNatureDetails\n";
    }

    $emailBody .= "\nThis is an automated email sent through the Kiskan Law website contact form.";
    
    // Convert plain text email to HTML
    $emailBodyHtml = nl2br(htmlspecialchars($emailBody));
    
    // If in test mode, just return success without trying to send an email
    if ($testMode) {
        http_response_code(200);
        echo json_encode([
            'success' => true, 
            'message' => 'Your message has been sent successfully',
            'note' => 'This is running in test mode - no actual email was sent'
        ]);
        exit();
    }
    
    // REAL EMAIL SENDING - Sendinblue/Brevo API
    // Get a free API key at https://app.brevo.com
    $url = 'https://api.sendinblue.com/v3/smtp/email';
    $apiKey = 'xkeysib-YOUR-API-KEY-HERE'; // 👈 Replace this with your actual API key from Brevo/Sendinblue
    
    // Email recipients
    $recipients = [
        'hawkinsalvin277@gmail.com', // Your testing email
        // 'info@kiskanKiskanfrica.com' // Uncomment this for production
    ];
    
    // Prepare recipient array for API
    $toArray = [];
    foreach ($recipients as $recipient) {
        $toArray[] = [
            'email' => $recipient,
            'name' => 'Kiskan Law Team'
        ];
    }
    
    $data = [
        'sender' => [
            'name' => 'Kiskan Law Website',
            'email' => 'no-reply@kiskanKiskanfrica.com' // This doesn't need to be a real email with Sendinblue
        ],
        'to' => $toArray,
        'replyTo' => [
            'email' => $email,
            'name' => $name
        ],
        'subject' => "New Appointment Request: $subject",
        'htmlContent' => $emailBodyHtml,
        'textContent' => $emailBody
    ];
    
    // Send the email using Sendinblue/Brevo API
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Content-Type: application/json',
        'api-key: ' . $apiKey
    ]);
    
    file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - Sending email via API\n", FILE_APPEND);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    // Log the API response
    file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - API response code: $httpCode, Response: $response\n", FILE_APPEND);
    
    if ($httpCode >= 200 && $httpCode < 300) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully']);
    } else {
        $responseData = json_decode($response, true);
        $errorMessage = isset($responseData['message']) ? $responseData['message'] : 'Unknown error';
        throw new Exception("API Error: $errorMessage");
    }
    curl_close($ch);
    
} catch (Exception $e) {
    // Log the error
    file_put_contents('form-debug.log', date('Y-m-d H:i:s') . " - ERROR: " . $e->getMessage() . "\n", FILE_APPEND);
    
    // Return a proper JSON error response
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error processing form: ' . $e->getMessage()]);
}
?> 
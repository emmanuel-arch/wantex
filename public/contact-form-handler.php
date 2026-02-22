<?php
// Set CORS headers for cross-domain requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// If it's a preflight OPTIONS request, just return with OK status
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Only POST method is allowed']);
    exit();
}

// Get the posted data
$postData = json_decode(file_get_contents('php://input'), true);

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

// Set up email details
$to = 'hawkinsalvin277@gmail.com';
$emailSubject = "New Appointment Request: $subject";

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

// Set headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Try to send the email
try {
    if (mail($to, $emailSubject, $emailBody, $headers)) {
        http_response_code(200); // OK
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully']);
    } else {
        throw new Exception("Failed to send email");
    }
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Failed to send email: ' . $e->getMessage()]);
}
?> 
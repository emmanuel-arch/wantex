<?php
// Debug information
echo "<h2>PHP Mail Test</h2>";
echo "<p>Testing mail functionality...</p>";

// Mail configuration info
echo "<h3>Mail Configuration:</h3>";
echo "<pre>";
echo "SMTP: " . ini_get('SMTP') . "\n";
echo "smtp_port: " . ini_get('smtp_port') . "\n";
echo "sendmail_from: " . ini_get('sendmail_from') . "\n";
echo "sendmail_path: " . ini_get('sendmail_path') . "\n";
echo "</pre>";

// Test sending mail
$to = "hawkinsalvin277@gmail.com";
$subject = "PHP Mail Test";
$message = "This is a test email sent from PHP on " . date('Y-m-d H:i:s');
$headers = "From: test@example.com\r\n";
$headers .= "Reply-To: test@example.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

echo "<h3>Attempting to send mail:</h3>";
$result = mail($to, $subject, $message, $headers);

// Display result
if ($result) {
    echo "<p style='color:green;'>Mail sent successfully! Check your inbox.</p>";
} else {
    echo "<p style='color:red;'>Failed to send mail. Check server configuration.</p>";
    
    // Show more error info if available
    if (error_get_last()) {
        echo "<pre style='color:red;'>";
        print_r(error_get_last());
        echo "</pre>";
    }
}
?> 
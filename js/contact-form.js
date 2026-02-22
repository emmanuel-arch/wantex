// Contact Form Handler - Uses PHP Backend (sendemail.php)
document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('#contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="txt">Sending...</span>';
            submitBtn.disabled = true;
            
            // Let the form submit normally to sendemail.php
            // The PHP script will handle the email and redirect
            return true;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.header-action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Handle Book Appointment button click
    const bookAppointmentBtn = document.querySelector('.header-action-btn.primary');
    if (bookAppointmentBtn) {
        bookAppointmentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const consulationSection = document.querySelector('.consulation-section');
            if (consulationSection) {
                consulationSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = 'contact.html#consulation';
            }
        });
    }
});
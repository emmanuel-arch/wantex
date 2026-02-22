// Logo animation effects
document.addEventListener('DOMContentLoaded', function() {
    const logoBox = document.querySelector('.logo-box');
    const logo = logoBox.querySelector('img');
    
    // Add hover effect with smooth transition
    logoBox.addEventListener('mouseenter', function() {
        logo.style.transform = 'scale(1.15)';
        logo.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))';
    });
    
    logoBox.addEventListener('mouseleave', function() {
        logo.style.transform = 'scale(1)';
        logo.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
    });
    
    // Add scroll effect
    let lastScrollPosition = window.scrollY;
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (!logoBox.matches(':hover')) { // Only apply scroll effect if not being hovered
            if (scrollPosition > 100) {
                logo.style.transform = 'scale(0.95)';
            } else {
                logo.style.transform = 'scale(1)';
            }
        }
        lastScrollPosition = scrollPosition;
    });
});
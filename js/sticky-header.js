document.addEventListener('DOMContentLoaded', function() {
    const headerUpper = document.querySelector('.header-upper');
    const mainHeader = document.querySelector('.main-header');
    let lastScrollTop = 0;
    let headerOffset = 50; // Trigger sticky after scrolling 50px

    if (!headerUpper) return; // Exit if no header found

    // Create a placeholder to prevent content jump when header becomes fixed
    const placeholder = document.createElement('div');
    placeholder.className = 'header-placeholder';
    placeholder.style.display = 'none';
    placeholder.style.height = headerUpper.offsetHeight + 'px';
    headerUpper.parentNode.insertBefore(placeholder, headerUpper.nextSibling);

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove sticky class based on scroll position
        if (scrollTop > headerOffset) {
            if (!headerUpper.classList.contains('sticky-upper-header')) {
                headerUpper.classList.add('sticky-upper-header');
                if (mainHeader) mainHeader.classList.add('fixed-header');
                placeholder.style.display = 'block';
            }
        } else {
            if (headerUpper.classList.contains('sticky-upper-header')) {
                headerUpper.classList.remove('sticky-upper-header');
                if (mainHeader) mainHeader.classList.remove('fixed-header');
                placeholder.style.display = 'none';
            }
        }

        lastScrollTop = scrollTop;
    }

    // Initial check in case page loads scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
});
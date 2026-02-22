/**
 * Modern Hero Section - Smooth Scroll Functionality
 */

(function($) {
    'use strict';

    // Smooth scroll for all anchor links with class 'smooth-scroll' or links to #about-section
    function initSmoothScroll() {
        // Smooth scroll for scroll indicator
        $('.scroll-indicator a, a.smooth-scroll, a[href="#about-section"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            
            if(target.length) {
                event.preventDefault();
                
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 100
                }, 1000, 'easeInOutExpo');
            }
        });
        
        // Add easing function if not already present
        if (!$.easing.easeInOutExpo) {
            $.easing.easeInOutExpo = function (x, t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            };
        }
    }

    // Parallax effect for hero background
    function initParallaxEffect() {
        if ($(window).width() > 991) {
            $(window).on('scroll', function() {
                var scrolled = $(window).scrollTop();
                $('.modern-hero').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
            });
        }
    }

    // Animate elements on scroll
    function initScrollAnimations() {
        $(window).on('scroll', function() {
            var scrolled = $(window).scrollTop();
            var heroHeight = $('.modern-hero').outerHeight();
            
            // Fade out scroll indicator as user scrolls
            if (scrolled > 100) {
                $('.scroll-indicator').css('opacity', 1 - (scrolled / 300));
            } else {
                $('.scroll-indicator').css('opacity', 1);
            }
            
            // Add slight fade effect to hero content
            if (scrolled > 50) {
                $('.hero-content').css('opacity', 1 - (scrolled / heroHeight));
            } else {
                $('.hero-content').css('opacity', 1);
            }
        });
    }

    // Add hover effect to hero buttons
    function initButtonEffects() {
        $('.hero-buttons .theme-btn').hover(
            function() {
                $(this).addClass('hovered');
            },
            function() {
                $(this).removeClass('hovered');
            }
        );
    }

    // Initialize text typing effect for hero title (optional enhancement)
    function initTypingEffect() {
        // This is optional - uncomment if you want a typing effect
        /*
        var heroTitle = $('.hero-content h1');
        var originalText = heroTitle.html();
        heroTitle.html('');
        
        var i = 0;
        var typingSpeed = 50;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.html(originalText.substring(0, i+1));
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        setTimeout(typeWriter, 500);
        */
    }

    // Add active state to navigation when on hero section
    function updateNavOnScroll() {
        $(window).on('scroll', function() {
            var scrollPos = $(window).scrollTop();
            var heroBottom = $('.modern-hero').offset().top + $('.modern-hero').outerHeight();
            
            if (scrollPos < heroBottom - 100) {
                $('.navigation li').removeClass('current');
                $('.navigation li:first-child').addClass('current');
            }
        });
    }

    // Initialize all functions when document is ready
    $(document).ready(function() {
        initSmoothScroll();
        initParallaxEffect();
        initScrollAnimations();
        initButtonEffects();
        updateNavOnScroll();
        
        // Add loaded class to trigger animations
        setTimeout(function() {
            $('.modern-hero').addClass('loaded');
        }, 100);
    });

    // Re-initialize on window resize
    $(window).on('resize', function() {
        initParallaxEffect();
    });

})(jQuery);

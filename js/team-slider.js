// Team Section Slider
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.team-carousel')) {
        var teamSwiper = new Swiper('.team-carousel', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 20000,
                disableOnInteraction: false
            },
            speed: 5000,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },
            navigation: {
                nextEl: '.team-carousel .swiper-button-next',
                prevEl: '.team-carousel .swiper-button-prev'
            },
            on: {
                init: function() {
                    console.log('Team Swiper initialized');
                    setTimeout(function() {
                        document.querySelector('.team-carousel').style.opacity = '1';
                    }, 100);
                }
            }
        });
        
        // Debug: Check if navigation buttons exist
        console.log('Next button:', document.querySelector('.team-carousel .swiper-button-next'));
        console.log('Prev button:', document.querySelector('.team-carousel .swiper-button-prev'));
    }
});
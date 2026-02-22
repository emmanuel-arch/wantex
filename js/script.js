(function(e) {
    "use strict";

    function s() {
        if (e(".main-header").length) {
            var s = e(window).scrollTop(),
                t = e(".main-header"),
                n = e(".scroll-to-top");
            s >= 1 ? (t.addClass("fixed-header"), n.fadeIn(300)) : (t.removeClass("fixed-header"), n.fadeOut(300))
        }
    }
    s();

    function s() {
        if (e(".main-header").length) {
            var o = e(window).scrollTop(),
                t = e(".main-header"),
                n = e(".scroll-to-top"),
                s = e(".main-header .sticky-header");
            o > 100 ? (t.addClass("fixed-header"), s.addClass("animated slideInDown"), n.fadeIn(300)) : (t.removeClass("fixed-header"), s.removeClass("animated slideInDown"), n.fadeOut(300))
        }
    }
    if (s(), e(".main-header li.dropdown ul").length && (e(".main-header li.dropdown").append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'), e(".main-header li.dropdown .dropdown-btn").on("click", function() {
            e(this).prev("ul").slideToggle(500)
        }), e(".main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a").on("click", function(e) {
            e.preventDefault()
        })), e(".main-slider-carousel").length) var t, n, i, a, o = new Swiper(".main-slider-carousel", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: !0,
        lazyLoading: !0,
        TouchSpin: !0,
        breakpoints: {
            600: {
                slidesPerView: 1
            },
            800: {
                slidesPerView: 1
            },
            1000: {
                slidesPerView: 1
            },
            1100: {
                slidesPerView: 1
            },
            700: {
                slidesPerView: 1
            }
        },
        pagination: ".swiper-pagination",
        paginationClickable: !0,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
    });
    e(".testimonial-carousel").length && (o = new Swiper(".testimonial-carousel", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: !0,
        lazyLoading: !0,
        TouchSpin: !0,
        breakpoints: {
            600: {
                slidesPerView: 1
            },
            800: {
                slidesPerView: 1
            },
            1000: {
                slidesPerView: 2
            },
            1100: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 1
            }
        },
        pagination: ".swiper-pagination",
        paginationClickable: !0,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
    })), e(".mobile-menu").length && (e(".mobile-menu .menu-box").mCustomScrollbar(), i = e(".main-header .nav-outer .main-menu").html(), e(".mobile-menu .menu-box .menu-outer").append(i), e(".sticky-header .main-menu").append(i), e(".mobile-menu li.dropdown .dropdown-btn").on("click", function() {
        e(this).toggleClass("open"), e(this).prev("ul").slideToggle(500)
    }), e(".mobile-menu li.dropdown .dropdown-btn").on("click", function() {
        e(this).toggleClass("open"), e(this).prev(".mega-menu").slideToggle(500)
    }), e(".mobile-nav-toggler").on("click", function() {
        e("body").addClass("mobile-menu-visible")
    }), e(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on("click", function() {
        e("body").removeClass("mobile-menu-visible")
    })), e(".parallax-scene-1").length && (t = e(".parallax-scene-1").get(0), n = new Parallax(t)), e(".parallax-scene-2").length && (t = e(".parallax-scene-2").get(0), n = new Parallax(t)), e(".parallax-scene-3").length && (t = e(".parallax-scene-3").get(0), n = new Parallax(t)), e(".parallax-scene-4").length && (t = e(".parallax-scene-4").get(0), n = new Parallax(t)), e(".parallax-scene-5").length && (t = e(".parallax-scene-5").get(0), n = new Parallax(t)), e(".parallax-scene-6").length && (t = e(".parallax-scene-6").get(0), n = new Parallax(t)), e(".paroller").length && e(".paroller").paroller({
        factor: .2,
        factorLg: .4,
        type: "foreground",
        direction: "horizontal"
    }), e(".sponsors-carousel").length && (o = new Swiper(".sponsors-carousel", {
        slidesPerView: 5,
        spaceBetween: 40,
        loop: !0,
        lazyLoading: !0,
        TouchSpin: !0,
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            600: {
                slidesPerView: 3
            },
            800: {
                slidesPerView: 3
            },
            700: {
                slidesPerView: 5
            }
        },
        pagination: ".swiper-pagination",
        paginationClickable: !0,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
    })), e(".team-carousel").length && (o = new Swiper(".team-carousel", {
        slidesPerView: 3,
        spaceBetween: 60,
        loop: !0,
        lazyLoading: !0,
        TouchSpin: !0,
        breakpoints: {
            500: {
                slidesPerView: 1
            },
            600: {
                slidesPerView: 2
            },
            800: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            }
        },
        pagination: ".swiper-pagination",
        paginationClickable: !0,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
    })), e(".custom-select-box").length && e(".custom-select-box").selectmenu().selectmenu("menuWidget").addClass("overflow"), e(".datepicker").length && e(".datepicker").datepicker(), e(".accordion-box").length && e(".accordion-box").on("click", ".acc-btn", function() {
        var t = e(this).parents(".accordion-box"),
            n = e(this).parents(".accordion");
        if (e(this).hasClass("active") !== !0 && e(t).find(".accordion .acc-btn").removeClass("active"), e(this).next(".acc-content").is(":visible")) return !1;
        e(this).addClass("active"), e(t).children(".accordion").removeClass("active-block"), e(t).find(".accordion").children(".acc-content").slideUp(300), n.addClass("active-block"), e(this).next(".acc-content").slideDown(300)
    }), e(".tabs-box").length && e(".tabs-box .tab-buttons .tab-btn").on("click", function(t) {
        t.preventDefault();
        var n = e(e(this).attr("data-tab"));
        if (e(n).is(":visible")) return !1;
        n.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn"), e(this).addClass("active-btn"), n.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0), n.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab"), e(n).fadeIn(300), e(n).addClass("active-tab")
    }), e(".filter-list").length && e(".filter-list").mixItUp({}), e(".lightbox-image").length && e(".lightbox-image").fancybox({
        openEffect: "fade",
        closeEffect: "fade",
        helpers: {
            media: {}
        }
    }), e("#contact-form").length && e("#contact-form").validate({
        rules: {
            phone: {
                required: !0
            },
            email: {
                required: !0,
                email: !0
            },
            message: {
                required: !0
            }
        }
    }), e(".scroll-to-target").length && e(".scroll-to-target").on("click", function() {
        var t = e(this).attr("data-target");
        e("html, body").animate({
            scrollTop: e(t).offset().top
        }, 1500)
    }), e(".wow").length && (a = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !0,
        live: !0
    }), a.init()), e(window).on("scroll", function() {
        s()
    }), e(window).on("load", function() {})
})(window.jQuery)
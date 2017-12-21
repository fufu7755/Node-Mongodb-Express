(function($) {

    "use strict";
    $(".carousel-inner .item:first-child").addClass("active");
    /* Mobile menu click then remove
    ==========================*/
    $(".mainmenu-area #mainmenu li a").on("click", function() {
        $(".navbar-collapse").removeClass("in");
    });

    /* Scroll to top
    ===================*/
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    /* testimonials Slider Active
    =============================*/
    $('.testimonials').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1000,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right" ></i>'],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.header-area').parallax("50%", -0.3);

    /*--------------------
     MAGNIFIC POPUP JS
     ----------------------*/
    $('.work-popup').magnificPopup({
        type: 'iframe',
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function() {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '<div class="mfp-title">Some caption</div>' +
                '</div>'
        },
        gallery: {
            enabled: true
        },
        closeOnContentClick: true,
        midClick: true
    });

    /* Preloader Js
    ===================*/
    $(window).on("load", function() {
        $('.preloader').fadeOut(500);

        /*WoW js Active
         =================*/
        //new WOW().init({
        //    mobile: false,
        //});
    });

    var w_width = $(window).width();
    $('.menu-bar-hide').hide();
    if (w_width <= 768) {
        $('.mainmenu').hide();
        $('.menu-bar-hide').show();
        $('.mainmenu li a').on('click', function() {
            $('.mainmenu').slideUp();
            return false;
        });
        $('.menu-bar').on('click', function() {
            $('.mainmenu').slideToggle();
            return false;
        });
    }
    // jQuery Ripples
    if (typeof $.fn.ripples == 'function') {
        try {
            $('.ripple').ripples({
                resolution: 500,
                perturbance: 0.04
            });
        } catch (e) {
            $('.error').show().text(e);
        }
    }



})(jQuery);

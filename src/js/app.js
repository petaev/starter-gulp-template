// Set Screen Width
let screen_width = $(window).width();

// Create Custom vh variable (for iOS fix)
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');

// Global Resize Event
$(window).on('resize', function() {

    // Set Custom vh variable
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');

    // Set Screen Width
    screen_width = $(window).width();
});

// Detect Client
const 
    userAgent = window.navigator.userAgent.toLowerCase(),
    isIos = /iPhone|iPad|iPod/i.test(window.navigator.platform),
    isMac = /Mac/.test(window.navigator.platform);

// MacOS
if (isMac) {
    $('body').addClass('is-mac');
}

// iOS
if (isIos) {
    $('body').addClass('is-ios');
}

// Custom
$(document).ready(function () {

    /**
     * Scroll To Slug 
     * [data-scroll="#id"]
     */
    (function() {
        $(document).on('click', '[data-scroll]', function(e) {
            scrollToSlug($(this).data('scroll') || $(this).attr('href'));
        });
    })();
  
});


// Global Functions

/**
 * Scroll To Slug
 * @param {'block ID'} id 
 */
const scrollToSlug = (id) => {
    if ($(id).length && id.charAt(0) == '#') {
        var headerOffset = $('.header').outerHeight() + 20;

        $('html,body').animate({
            scrollTop: $(id).offset().top - headerOffset
        }, {
            duration: 200
        });  
    }
}
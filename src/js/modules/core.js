import { isIos, isMac } from "../utils";

// Global variables
window.screenWidth = 0

/**
 * Set vh as custom CSS property (fix for iOS)
 */
const setVhCustomProperty = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
}

/**
 * Set screen width to global
 */
const setGlobalScreenWidth = () => {
    window.screenWidth = $(window).width()
}

/**
 * Set client platform classes to <html/>
 */
const setClientPlatformClasses = () => {
    // MacOS
    if (isMac()) {
        $('body').addClass('is-mac');
    }

    // iOS
    if (isIos()) {
        $('body').addClass('is-ios');
    }
}

(function() {

    // Custom vh property
    setVhCustomProperty()
    $(window).on('resize', setVhCustomProperty)

    // Screen width
    setGlobalScreenWidth()
    $(window).on('resize', setGlobalScreenWidth)

    // Detect Client
    setClientPlatformClasses()
})();
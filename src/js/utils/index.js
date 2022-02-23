/**
 * Scroll To Slug
 * @param {'block ID'} id 
 */
export const scrollToSlug = (id) => {
    if ($(id).length) {
        let headerOffset = $('.header').outerHeight() + 20;

        $('html,body').animate({
            scrollTop: $(id).offset().top - headerOffset
        }, {
            duration: 200
        });  
    }
}

/**
 * Check if is iOS platform
 */
export const isIos = () => {
    return /iPhone|iPad|iPod/i.test(window.navigator.platform)
}

/**
 * Check if is Mac platform
 */
export const isMac = () => {
    return /Mac/.test(window.navigator.platform)
}
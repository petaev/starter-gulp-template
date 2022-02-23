import { scrollToSlug } from './utils'

// Core
import './modules/core'

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
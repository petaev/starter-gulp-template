const { series, watch } = require('gulp'),
      browserSync = require('browser-sync'),
      styles = require('./styles'),
      pug = require('./pug'),
      { scripts, scriptsLibs } = require('./scripts');

const { BASE_DIR, FILES_PATH } = require('../config')

module.exports = function serve(cb) {

    // Create dev server
    browserSync({
        server: { 
            baseDir: BASE_DIR.dist
        }
    });

    function reload(cb) {
        browserSync.reload()
        cb()
    }

    // Watch files
    watch(FILES_PATH.styles.watch, series(styles, reload));
    watch(FILES_PATH.pug.watch, series(pug, reload));
    watch(FILES_PATH.scripts.watch, series(scripts, reload));
    watch(FILES_PATH.scriptLibs.watch, series(scriptsLibs, reload));

    cb()
};

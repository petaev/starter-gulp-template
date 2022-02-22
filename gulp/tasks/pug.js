const { src, dest } = require('gulp');

const gulpPug = require('gulp-pug'),
	  plumber = require('gulp-plumber'),
	  notify = require("gulp-notify");

const { FILES_PATH, BASE_DIR } = require('../config')

module.exports = function pug() {

    const sourcePaths = [FILES_PATH.pug.src];

    // Prod
    if (!isDev) {
        sourcePaths.push(FILES_PATH.pug.ignoreWatch)
    }

    return src(sourcePaths)
        .pipe(plumber())
        .pipe(gulpPug({
            pretty: !isDev,
            basedir: gulpDir + `/${BASE_DIR.src}/pug`
        }).on("error", notify.onError()))
        .pipe(plumber.stop())
        .pipe(dest(FILES_PATH.pug.dist))
}
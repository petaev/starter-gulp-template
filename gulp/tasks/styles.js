const { src, dest } = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      rename = require('gulp-rename'),
	  cleancss = require('gulp-clean-css'),
      notify = require("gulp-notify"),
      gulpIf = require('gulp-if');

const { FILES_PATH } = require('../config')

module.exports = function styles() {

    return src(FILES_PATH.styles.src)
        .pipe(gulpIf(isDev, sourcemaps.init())) // Only dev
        .pipe(sass().on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(gulpIf(isDev, sourcemaps.write())) // Only dev
        .pipe(gulpIf(!isDev, autoprefixer())) // Only prod
        .pipe(gulpIf(!isDev, cleancss({ // Only prod
            level: { 
                1: { specialComments: 1 } 
            } 
        })))
        .pipe(dest(FILES_PATH.styles.dist))
}
const { src, dest } = require('gulp');
const babel = require('gulp-babel'),
      webpack = require('webpack'),
	  webpackStream = require('webpack-stream');

const { FILES_PATH } = require('../config')

const webpackConfig = require('./../../webpack.config.js');

/**
 * User scripts
 */
function scripts() {
    return src(FILES_PATH.scripts.src)
        .pipe(babel())
        .pipe(dest(FILES_PATH.scripts.dist))
}

/**
 * Libs with webpack
 */
function scriptsLibs() {
    return src(FILES_PATH.scriptLibs.src)
        .pipe(webpackStream(webpackConfig), webpack)
		.pipe(dest(FILES_PATH.scriptLibs.dist));
}

module.exports = {
    scripts,
    scriptsLibs
}
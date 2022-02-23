global.gulpDir = __dirname

const { task, series, parallel } = require('gulp');

const 
	serve = require('./gulp/tasks/serve'),
	styles = require('./gulp/tasks/styles'),
	pug = require('./gulp/tasks/pug'),
	{ scripts, scriptsLibs } = require('./gulp/tasks/scripts'),
	clean = require('./gulp/tasks/clean'),
	htmlFormat = require('./gulp/tasks/html-format');

// Production mode by default
global.isDev = false

/**
 * Set development mode
 * @param {*} cb 
 */
function setDevMode(cb) {
	global.isDev = true
	cb()
}

task(setDevMode);

// Dev mode
const dev = series(
	setDevMode, 
	parallel(styles, pug, scripts, scriptsLibs),
	serve
);

// Build
const build = series(
	clean,
	parallel(styles, pug, scripts, scriptsLibs),
	htmlFormat
);


module.exports = {
	dev,
	build
}

module.exports.default = dev
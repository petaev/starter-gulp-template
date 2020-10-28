

const 
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
	beauty = require('gulp-html-beautify'),
	plumber = require('gulp-plumber'),
	notify = require("gulp-notify"),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	cleancss = require('gulp-clean-css'),
	babel = require('gulp-babel'),
	del = require('del'),
	webpack = require('webpack'),
	webpackStream = require('webpack-stream');


/* Config */
const coreDir = {
	src: 'src',
	dist: 'public'
}

const config = {
	styles: {
		src: `${coreDir.src}/scss/*.scss`,
		dist: `${coreDir.dist}/css`,
		watch: `${coreDir.src}/scss/**/*.scss`
	},
	scripts: {
		src: [`${coreDir.src}/js/*.js`, `!${coreDir.src}/js/vendor.js`],
		dist: `${coreDir.dist}/js`,
		watch: [`${coreDir.src}/js/**/*.js`, `!${coreDir.src}/js/vendor.js`]
	},
	scriptLibs: {
		src: `${coreDir.src}/js/vendor.js`,
		dist: `${coreDir.dist}/js`,
		watch: `${coreDir.src}/js/vendor.js`
	},
	pug: {
		src: `${coreDir.src}/pug/*.pug`,
		dist: `${coreDir.dist}/`,
		watch: `${coreDir.src}/pug/**/*.pug`
	},
	html: {
		src: `${coreDir.dist}/*.html`,
		dist: `${coreDir.dist}/`,
		watch: `${coreDir.dist}/*.html`
	}
}

/* Styles */
gulp.task('styles:dev', () => {
	return setTimeout(() => {
		gulp.src(config.styles.src)
			.pipe(sourcemaps.init())
			.pipe(sass().on("error", notify.onError()))
			.pipe(rename({ suffix: '.min', prefix : '' }))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.styles.dist))
			.pipe(browserSync.reload( { stream: true }))
	}, 150);
})

gulp.task('styles:build', () => {
	return gulp.src(config.styles.src)
			.pipe(sass().on("error", notify.onError()))
			.pipe(rename({ suffix: '.min', prefix : '' }))
			.pipe(autoprefixer())
			.pipe(cleancss( {level: { 1: { specialComments: 1 } } }))
			.pipe(gulp.dest(config.styles.dist))
})


/* Scripts */
const webpackConfig = require('./webpack.config.js');

gulp.task('scripts:dev', () => {
	return gulp.src(config.scripts.src)
			.pipe(babel())
			.pipe(gulp.dest(config.scripts.dist))
			.pipe(browserSync.reload( { stream: true }))
});

gulp.task('scripts:build', () => {
	return gulp.src(config.scripts.src)
			.pipe(babel())
			.pipe(gulp.dest(config.scripts.dist))
});

gulp.task('script-libs', () => {
	return gulp.src(config.scriptLibs.src)
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(gulp.dest(config.scriptLibs.dist));
});



/* PUG */
gulp.task('pug:dev', function() {
	return gulp.src(config.pug.src)
		.pipe(plumber())
		.pipe(pug().on("error", notify.onError()))
		.pipe(plumber.stop())
		.pipe(gulp.dest(config.pug.dist))
		.pipe(browserSync.reload( { stream: true }))
});

// Remove html before build
gulp.task('pug:build', ['html-del'], function() {
	return gulp.src(config.pug.src)
		.pipe(plumber())
		.pipe(pug({pretty: true}).on("error", notify.onError()))
		.pipe(plumber.stop())
		.pipe(gulp.dest(config.pug.dist))
});

gulp.task('html-del', () => {
	return del([config.html.src])
});


/* HTML */
const beautyOpts = {
	indent_size: 2,
	indent_with_tabs: true,
	end_with_newline: true,
	keep_array_indentation: true,
	unformatted: [
		'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
		'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
		'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
		'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
		'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
	]
}

gulp.task('html-beauty', function() {
	return gulp.src(config.html.src)
		.pipe(beauty(beautyOpts))
		.pipe(gulp.dest(config.html.dist))
});

/* Browser Sync */
gulp.task('browser-sync', () => {
	browserSync({
		server: { 
			baseDir: coreDir.dist
		}
	});
});


/* Dev */
gulp.task('watch', ['browser-sync', 'styles:dev', 'pug:dev', 'scripts:dev', 'script-libs'], function() {
	gulp.watch(config.styles.watch, ['styles:dev']);
	gulp.watch(config.pug.watch, ['pug:dev']);
	gulp.watch(config.scripts.watch, ['scripts:dev']);
	gulp.watch(config.scriptLibs.watch, ['script-libs']);
	gulp.watch(config.html.src, browserSync.reload);
});

/* Build */
gulp.task('build', ['styles:build', 'pug:build', 'scripts:build', 'script-libs'], () => {
	gulp.start('html-beauty')
});

/* Default Watch */
gulp.task('default', ['watch']);


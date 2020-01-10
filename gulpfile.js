var syntax = 'scss';
var baseDirectory = 'src';
var distDirectory = 'public';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
	beauty = require('gulp-html-beautify'),
	plumber = require('gulp-plumber'),
	notify = require("gulp-notify"),
	browserSync = require('browser-sync'),
	// gutil = require('gulp-util'),
	del = require('del'),
	rename = require('gulp-rename'),
	cleancss = require('gulp-clean-css'),
	// ftp = require('vinyl-ftp'),
	// babel = require('gulp-babel'),
	// concat = require('gulp-concat'),
	webpack = require('webpack'),
	webpackStream = require('webpack-stream');

	/* Styles */
	gulp.task('sass', function() {
		return setTimeout(function() {
			gulp.src(baseDirectory + '/'+ syntax +'/**/*.' + syntax)
			.pipe(sass().on("error", notify.onError()))
			.pipe(rename({ suffix: '.min', prefix : '' }))
			.pipe(autoprefixer({ browsers: ['> 1%', 'last 15 versions', 'firefox >= 19', 'iOS >= 8', 'IE >=9'] }))
			.pipe(cleancss( {level: { 1: { specialComments: 1 } } }))
			.pipe(gulp.dest(distDirectory + '/css'))
			.pipe(browserSync.reload( { stream: true }))
		}, 300);
	});

	/* JS scripts */
	const webpackConfig = require('./webpack.config.js');

	gulp.task('js-libs', function() {
		return gulp.src(baseDirectory + '/js/vendor.js')
			.pipe(webpackStream(webpackConfig), webpack)
			.pipe(gulp.dest(distDirectory + '/js'));
	});

	gulp.task('js', function() {
		return gulp.src(baseDirectory + '/js/common.js')
			// .pipe(babel())
			.pipe(gulp.dest(distDirectory + '/js'))
			.pipe(browserSync.reload( { stream: true }))
	});

	/* PUG */
	gulp.task('pug', function() {
		return gulp.src(baseDirectory + '/pug/*.pug')
			.pipe(plumber())
			.pipe(pug({pretty: true}).on("error", notify.onError()))
			// .pipe(pugInheritance({basedir: './src/pug/', skip: 'node_modules'}))
			.pipe(plumber.stop())
			.pipe(gulp.dest(distDirectory + '/'))
			.pipe(browserSync.reload( { stream: true }))
	});

	/* Images */
	gulp.task('images', function() {
		return gulp.src(baseDirectory + '/img/**/*.*')
			.pipe(gulp.dest(distDirectory + '/img'))
	});

	/* Fonts */
	gulp.task('fonts', function() {
		return gulp.src(baseDirectory + '/fonts/**/*.*')
			.pipe(gulp.dest(distDirectory + '/fonts'));
	});

	/* Html */
	var beautyOpts = {
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

	gulp.task('beauty', function() {
		return gulp.src(distDirectory + '/*.html')
			.pipe(beauty(beautyOpts))
			.pipe(gulp.dest(distDirectory + '/'))
	});

	/* Browser Sync */
	gulp.task('browser-sync', function() {
		browserSync({
			server: { 
				baseDir: distDirectory
			}
		});
	});

	/* Remove Public directory */
	gulp.task('clean', function() {
		return del([distDirectory]);
	});

	
	gulp.task('watch', ['browser-sync', 'sass', 'pug', 'js', 'js-libs', 'images', 'fonts'], function() {
		gulp.watch(baseDirectory + '/' + syntax + '/**/*.' + syntax, ['sass']);
		gulp.watch(baseDirectory + '/pug/**/*.pug', ['pug']);
		gulp.watch(distDirectory + '/*.html', browserSync.reload);
		gulp.watch(baseDirectory + '/js/common.js', ['js']);
		gulp.watch(baseDirectory + '/js/vendor.js', ['js-libs']);
		gulp.watch(baseDirectory + '/img/**/*.*', ['images']);
		gulp.watch(baseDirectory + '/fonts/**/*.*', ['fonts']);
	});

	gulp.task('default', ['watch']);


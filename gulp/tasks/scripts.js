const { src, dest } = require('gulp');
const webpack = require('webpack-stream'),
	  named = require('vinyl-named');

const { FILES_PATH } = require('../config');

/**
 * User scripts
 */
module.exports = function scripts() {
	return src(FILES_PATH.scripts.src)
		.pipe(named())
		.pipe(
			webpack({
				mode: isDev ? 'development' : 'production',
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /(node_modules|bower_components)/,
							use: {
								loader: 'babel-loader',
							},
						},
					],
				},
			})
		)
		.pipe(dest(FILES_PATH.scripts.dist));
}

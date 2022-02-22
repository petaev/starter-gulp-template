const { src, dest } = require('gulp');
const beauty = require('gulp-html-beautify');

const { FILES_PATH } = require('../config')

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

module.exports = function htmlFormat() {
    return src(FILES_PATH.html.src)
        .pipe(beauty(beautyOpts))
        .pipe(dest(FILES_PATH.html.dist))
}
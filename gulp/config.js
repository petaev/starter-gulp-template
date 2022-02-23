const BASE_DIR = {
	src: 'src',
	dist: 'public'
}

// Files
const FILES_PATH = {
	styles: {
		src: `${BASE_DIR.src}/scss/*.{scss,sass}`,
		dist: `${BASE_DIR.dist}/css`,
		watch: `${BASE_DIR.src}/scss/**/*.{scss,sass}`
	},

	scripts: {
		src: `${BASE_DIR.src}/js/*.js`,
		dist: `${BASE_DIR.dist}/js`,
		watch: `${BASE_DIR.src}/js/**/*.js`
	},

	pug: {
		src: `${BASE_DIR.src}/pug/*.pug`,
		dist: `${BASE_DIR.dist}/`,
		watch: `${BASE_DIR.src}/pug/**/*.pug`,
		ignoreWatch: `${BASE_DIR.src}/pug/ignore/*.pug`
	},

	html: {
		src: `${BASE_DIR.dist}/*.html`,
		dist: `${BASE_DIR.dist}/`,
		watch: `${BASE_DIR.dist}/*.html`
	}
}

module.exports = {
    BASE_DIR,
    FILES_PATH,
}
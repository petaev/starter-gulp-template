const del = require('del');

const { FILES_PATH } = require('../config');

module.exports = function clean(cb) {
    del([FILES_PATH.html.src]);
    cb()
}
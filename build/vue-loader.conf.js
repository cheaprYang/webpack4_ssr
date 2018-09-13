'use strict'
const utils = require('./utils')
const config = require('../webpack.config')
const sourceMapEnabled = config.isProd
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap;
// module types
module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: config.isProd
    }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}

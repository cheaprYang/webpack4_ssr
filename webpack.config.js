'use strict'
const path = require('path');
module.exports={
    isProd:process.env.NODE_ENV === 'production',
    dev:{
        //静态文件
        assetsSubDirectory: 'static',
        //跟路径
        assetsPublicPath: '/',
        host: process.env.HOST||'localhost', // can be overwritten by process.env.HOST
        port: process.env.PORT||3000,
        devtool: 'cheap-module-source-map',
        cssSourceMap: true,
        cacheBusting: true,
    },
    build:{
        index: path.resolve(__dirname, './dist/index.html'),
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: '#source-map',
        productionGzip: false,
        productionSourceMap:false,
        productionGzipExtensions: ['js', 'css'],
    }
}

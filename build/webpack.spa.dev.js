'use strict'
const merge = require('webpack-merge');
const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseConfig=require('./webpack.base')
const utils=require('./utils')
const config=require('../webpack.config')
module.exports=merge(baseConfig,{
    mode:'development',
    devtool: config.dev.devtool,
    output: {
        path: path.resolve(__dirname, 'dist'),
         publicPath:'/',
        filename: '[name].js'
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000  //每秒询问的文件变更的次数
    },
    devServer:{
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, '../public/index.html') },
        //     ],
        // },
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback:true,
        //publicPath: config.dev.assetsPublicPath,
        host:config.dev.host,
        port:config.dev.port,
        open:false
    },
    module:{
       rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true,
            hash: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]

})

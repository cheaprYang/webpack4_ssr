'use strict'
const webpack=require('webpack')
const merge = require('webpack-merge');
const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig=require('./webpack.base')
module.exports=merge(baseConfig,{
    mode:'development',
    devtool: "cheap-module-eval-source-map",
    output: {
        publicPath: "/"
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000  //每秒询问的文件变更的次数
    },
    devServer:{
        host:'localhost',
        port:'3000',
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true,
            hash: true
        }),
    ]

})

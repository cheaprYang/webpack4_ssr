//'use strict'
const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils=require('./utils')
const config=require('../webpack.config')
const vueLoaderConfig = require('./vue-loader.conf')
console.log(config.build)
module.exports={
    target: "web",
    context: path.resolve(__dirname, '../'),
    devtool: "#source-map",
    mode: 'development',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'static',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js','.vue','.less','.css'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:vueLoaderConfig
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name:utils.assetsPath('img/[name].[hash:7].[ext]'),
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader:'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
     plugins: [
         new VueLoaderPlugin(),
     ]
}

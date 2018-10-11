'use strict'
const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils=require('./utils')

module.exports={
    target: "web",
    devtool: "#source-map",
    mode: 'development',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
                include: path.resolve(__dirname, 'src')
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js')
                            },
                           // sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // "style-loader",
                    {loader: 'css-loader',options: {importLoaders: 2}},  //2代表css-loader后还需要几个loader
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js')
                            },
                            // sourceMap: true
                        },
                    },
                    'sass-loader'
                ]
            },
            // {// loader less and css
            //     test: /\.(scss|css)$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 importLoaders: 1,
            //                 minimize: true,
            //                 // sourceMap: true,
            //                 modules:false
            //             }
            //         },
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 config: {
            //                     path: path.resolve(__dirname, './postcss.config.js')
            //                 },
            //                 // sourceMap: true
            //             },
            //         },
            //         "sass-loader"
            //     ]
            // },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                            // publicPath:'dist'
                        }
                    },
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: utils.assetsPath("fonts/[name].[ext]"),
                        }
                    },
                ]
            }
        ]
    },
     plugins: [
         new VueLoaderPlugin(),
         new FriendlyErrorsPlugin(),
         new MiniCssExtractPlugin({
             filename: utils.assetsPath("css/app.[name].css"),
             chunkFilename: utils.assetsPath("css/app.[id].css"),
             sourceMap: false
         }),
     ],
    resolve: {
        extensions: ['.js','.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    }
}

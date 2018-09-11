const webpack=require('webpack')
const merge = require('webpack-merge');
const path=require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const baseConfig=require('./webpack.base')
module.exports=merge(baseConfig,{
    mode:'production',
    output:{
        filename:'js/[name].[contenthash].js',
        path:path.resolve(__dirname,'../dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: "imgs/[hash].[ext]",
                        }
                    },
                    // 图片压缩
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            //   bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        },
                    },
                ]
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: 'css/[id].[hash].css'
        }),
    ],
    optimization: {
        // 分离chunks
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
            }
        },
        minimizer: [
            // 压缩JS
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false, // 去除警告
                        drop_debugger: true, // 去除debugger
                        drop_console: true // 去除console.log
                    },
                },
                cache: true, // 开启缓存
                parallel: true, // 平行压缩
                sourceMap: false // set to true if you want JS source maps
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({})
        ]
    },
})

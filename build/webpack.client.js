const webpack = require('webpack')
const merge = require('webpack-merge')
const path=require('path')
const base = require('./webpack.base')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safeParser = require('postcss-safe-parser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const  isProd=process.env.NODE_ENV === 'production'
const utils=require('./utils')
module.exports=merge(base,{
    mode:isProd?'production':'development',
    devtool:isProd?'cheap-module-source-map':'#source-map',
    entry: {
        app: './src/entry-client.js'
    },
    output:{
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    plugins:isProd?
        [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.VUE_ENV': '"client"'
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template:path.resolve(__dirname, '../public/index.html'),
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },

                chunksSortMode: 'dependency'
            }),
            new VueSSRClientPlugin(),
            new SWPrecachePlugin({
                cacheId: 'vue-hn',
                filename: 'static/js/service-worker.js',
                minify: true,
                dontCacheBustUrlsMatching: /./,
                staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
                runtimeCaching: [
                    {
                        urlPattern: '/',
                        handler: 'networkFirst'
                    },
                    {
                        urlPattern: /\/(top|new|show|ask|jobs)/,
                        handler: 'networkFirst'
                    },
                    {
                        urlPattern: '/item/:id',
                        handler: 'networkFirst'
                    },
                    {
                        urlPattern: '/user/:id',
                        handler: 'networkFirst'
                    }
                ]
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.ProgressPlugin(true)
        ]:
        [
            // new MiniCssExtractPlugin({
            //     filename: 'static/css/app.[name].css',
            //     chunkFilename: 'static/css/app.[contenthash:12].css'
            // }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.VUE_ENV': '"client"'
            }),
            new VueSSRClientPlugin(),

        ]
    ,
    optimization: {
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
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safeParser,
                    discardComments: {
                        removeAll: true
                    },
                    safe: true,
                    map: false
                }
            })

        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: { // key 为entry中定义的 入口名称
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    chunks: 'all', //all-异步加载快，但初始下载量较大，文件共用性好； initial-初始下载量较小，但异步加载量较大，文件间有重复内容
                    priority: -10,
                    reuseExistingChunk: false, // 选项用于配置在模块完全匹配时重用已有的块，而不是创建新块
                    test: /node_modules[\\/]/
                },
            }
        }
    }
})

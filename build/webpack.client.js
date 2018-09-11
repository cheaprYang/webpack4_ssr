const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const  isProd=process.env.NODE_ENV === 'production'

module.exports=merge(base,{
    mode:isProd?'production':'development',
    entry: {
        app: './src/entry-client.js'
    },
    plugins:isProd?
        [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.VUE_ENV': '"client"'
            }),
            new VueSSRClientPlugin(),
            new SWPrecachePlugin({
                cacheId: 'vue-hn',
                filename: 'service-worker.js',
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
            })
        ]:
        [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.VUE_ENV': '"client"'
            }),
            new VueSSRClientPlugin(),
        ]
    ,
    optimization: {
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

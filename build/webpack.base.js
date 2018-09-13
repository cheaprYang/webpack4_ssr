'use strict'
const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    target: "web",
    devtool: "#source-map",
    mode: 'development',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {// loader less and css
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: true,
                           // sourceMap: true,
                            modules:false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js')
                            },
                           // sourceMap: true
                        },
                    },
                    "less-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: "imgs/[name].[ext]",
                        }
                    },
                ]
            },
        ]
    },
     plugins: [
         new VueLoaderPlugin(),
         new FriendlyErrorsPlugin(),
         new MiniCssExtractPlugin({
             filename: "static/css/app.[name].css",
             chunkFilename: "static/css/app.[id].css",
             sourceMap: false
         }),
     ],
    resolve: {
        extensions: ['.js','.vue','.less','.css'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    }
}

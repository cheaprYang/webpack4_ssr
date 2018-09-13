const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const  isProd=process.env.NODE_ENV === 'production'
module.exports = merge(base, {
    mode:isProd?'production':'development',
    target: 'node',
    devtool:isProd?'#cheap-module-source-map':'#source-map',
    entry: './src/entry-server.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRServerPlugin(),
        new webpack.ProgressPlugin(true)
    ]
})

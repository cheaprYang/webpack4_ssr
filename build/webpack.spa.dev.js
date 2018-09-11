const webpack=require('webpack')
const merge = require('webpack-merge');
const path=require('path')
const baseConfig=require('./webpack.base')
module.exports=merge(baseConfig,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
     contentBase:'../dist'
    },
    output:{
        filename:'js/[name].[hash:8].js',
        path:path.resolve(__dirname,'../dist')
    },
    module: {

    }
})

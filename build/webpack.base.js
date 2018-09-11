const webpack=require('webpack')
const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports={
    mode: 'development',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happypack/loader?id=happyBabel',
                //排除node_modules 目录下的文件
                exclude: /node_modules/
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
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
        new webpack.HashedModuleIdsPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new HappyPack({
            //用id来标识 happypack处理类文件
            id: 'happyBabel',
            //如何处理 用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        new FriendlyErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js','.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    }
}

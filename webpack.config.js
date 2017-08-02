/**
 * Created by gemery on 2017/7/30.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var  HtmlWebpackPlugin  = require('html-webpack-plugin');

var Webpack_env = process.env.WEBPACK_ENV || 'dev';
console.log(Webpack_env);

var getHtmlConfig = function(name){
    return {
        template : './src/view/'+name+'.html',
        filename :'view/'+name+'.html',
        inject   : true,
        hash     : true,
        chunks    :['common',name]
    }
}
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/login.js']
    },
    output: {
        path: './dist/',
        publicPath :'/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jquery'
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里

        new ExtractTextPlugin("css/[name].css"),

        //html 模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))

    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")

        },
            {
                test: /.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            }]
    },


};

 if('dev' == Webpack_env){
     config.entry.common.push(
         'webpack-dev-server/client?http://localhost:8088/')
 }
module.exports = config;
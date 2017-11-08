/**
 * Created by gemery on 2017/7/30.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var  HtmlWebpackPlugin  = require('html-webpack-plugin');

var Webpack_env = process.env.WEBPACK_ENV || 'dev';
console.log(Webpack_env);

var getHtmlConfig = function(name,title){
    return {
        template : './src/view/'+name+'.html',
        filename :'view/'+name+'.html',
        title    : title,
        inject   : true,
        hash     : true,
        chunks    :['common',name]
    }
}
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'result': ['./src/page/result/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'user-center': ['./src/page/user-center/index.js']
    },
    output: {
        path: './dist/',
        publicPath :'/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jquery'
    },
    resolve:{
        alias:{
            node_modules : __dirname + '/node_modules',
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image',
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车页面'))

    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")

        },

            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader' },

        ]
    },


};

 if('dev' == Webpack_env){
     config.entry.common.push(
         'webpack-dev-server/client?http://localhost:8088/')
 }
module.exports = config;
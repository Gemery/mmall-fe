'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
    init : function(){
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this;
    },
    bindEvent :function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './register.html';
        });
        //退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        })
    },
    loadUserInfo :function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().
            siblings('.user.login').show()
                .find('.username').text(res.username);
        },function(errMsg){
            //do nothing
        })
    },
    loadCartCount : function(){
        _cart.getCartCount(function(res){

        },function(errMsg){

        });
    },
};
module.exports = nav.init();
/**
 *
 * Created by gemery on 2017/9/10.
 */
'use strict';

require('./index.css');
require('./index.string');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var template = require('./index.string');
var _cart = require('service/cart-service.js');



var page = {
    data:{

    },
    init:function(){
        this.onLoad();
        this.loadCart();
    },
    bindEvent:function(){

    },
    onLoad:function(){

    },
    //加载购物车信息
    loadCart:function(){
        var _this = this;
        //获取购物车列表
        _cart.getCartList(function(res){
            _this.renderCart(res);
        },function(errMsg){
            $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试巴</p>')
        })
    },

    //渲染购物车
    renderCart:function(data){
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        //生成HTML
        var cartHtml = _mm.renderHtml(template, data);

        $('.page-wrap').html(cartHtml);
    },
    deleteCartProduct:function(productId,abax){

    },
    //数据配陪
    filter:function(data){
       data.noEmpty = !!data.cartProductVoList.length;
    },
    showCartError:function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
    }



};
$(function () {
    page.init();
});















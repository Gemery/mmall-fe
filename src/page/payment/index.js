/**
 * Created by gemery on 2017/11/6.
 */


'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _payment = require('service/payment-service.js');
var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber') || 1509979422689
    },
    init : function(){
        this.onLoad();
    },
    onLoad :function(){
        this.loadPaymentInfo();
    },
    loadPaymentInfo : function () {
        var _this = this;
        var paymentHtml = '',
            $content = $('.page-wrap');
        $content.html('<div class="loading"></div>');
        _payment.getPaymentInfo(_this.data.orderNumber,function (res) {
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $content.html(paymentHtml);

            _this.listenOrderStatus();
        },function (errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        })
    },
    //监听订单状态
    listenOrderStatus : function () {
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            console.log('AAAAA');

            _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                if(res == true){
                    window.location.href
                        = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            },function (errMsg) {
                // do nothing
            });
        }, 5e3);
    }
};
$(function () {
    page.init();
})

/**
 * Created by gemery on 2017/11/6.
 */
'use strict';
var _mm = require('util/mm.js');
var _payment = {
    //获取支付信息
    getPaymentInfo : function (orderNumber,resolve,reject) {
        _mm.request({
            url : '/order/pay.do',
            data :{
                orderNo:orderNumber
            },
            success : resolve,
            error    : reject
        })
    },
    //获取支付信息
    getPaymentStatus : function (orderNumber,resolve,reject) {
        _mm.request({
            url : '/order/query_order_pay_status.do',
            data :{
                orderNo:orderNumber
            },
            success : resolve,
            error    : reject
        })
    }
};


module.exports = _payment;
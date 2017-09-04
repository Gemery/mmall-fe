/**
 * Created by gemery on 2017/8/20.
 */
'use strict';
require('./index.css');
//登录页面头部
var _mm = require('util/mm.js');
var _header = {
    init : function(){

        this.bindEvent();

    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    }
    ,
    bindEvent : function(){
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
            });
        //输入回车，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode ===13){
                _this.searchSubmit();
            }
        });
    },
    //搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //如果keyword有值，搜索提交
        if(keyword){
            window.location.href = './list.html?keywork='+keyword;
        }else{
            _mm.goHome();
        }
    }
};
_header.init();
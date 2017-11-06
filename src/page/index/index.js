/**
 *
 * Created by gemery on 2017/7/30.
 */
'use strict';
var _mm = require('util/mm.js');

require('page/common/header/index.js');
require('./index.css');
require('../common/nav/index.js');

require('util/slider/index.js');

var navSide = require('page/common/nav-side/index.js');
navSide.init({name : 'pass-update'});

var templateBanner = require('./index.string');


$(function () {
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    console.log($('.banner'));
   var $slider=$('.banner').unslider({
       dots:true
   });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
})
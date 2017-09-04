/**
 * Created by gemery on 2017/9/4.
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') ||'default';
    console.log(type);
    $('.' + type + '-success').show();
});
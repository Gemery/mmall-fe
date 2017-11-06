'use strict';

require('./index.css');

var templatePagination = require('./index.string');

var _mm = require('util/mm.js');

var Pagination = function (){
    var _this = this;
    this.defaultOption = {
         container: null,
         pageNum : 1,
         pageRange:3,
         onSelectPage  :null

    }
//    事件的处理
    $(document).on('click', '.pg-item', function (e) {
        var $this = $(this);
        if($this.hasClass('.active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' ?
        _this.option.onSelectPage($this.attr('data-value')) :null;
        console.log('Aaaaa',$this,$this.attr('data-value'));
    });
};

Pagination.prototype.render = function(userOption){
    this.option = $.extend({}, this.defaultOption, userOption);
  // 判断容器是否为合法的jQuery对象
    console.log(this.option);
    if(!(this.option.container instanceof jQuery)){
        return;
    }
//    判断是否只有一页
    if(this.option.pages<=1){
            return;
    }
    //渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
//获取分页的html  ，|上一页|2 3 4 =5= 6 7 8 |下一页| 5／9
Pagination.prototype.getPaginationHtml = function () {
    var html = '';
    var pageArray = [] ,
        option = this.option;
    var  start  = option.pageNum - option.pageRange >0 ?  option.pageNum-option.pageRange : 1,
        end    = option.pageRange + option.pageNum     < option.pages   ? option.pageRange + option.pageNum : option.pages;
    pageArray.push({
        name : '上一页',
        value : option.prePage,
        disabled : !option.hasPreviousPage
    });
    for(var i = start;i<=end;i++){
        pageArray.push({
            name : i,
            value: i,
            active:(i === option.pageNum)
        })
    }
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disabled: !option.hasNextPage
    })
    html = _mm.renderHtml(templatePagination,{
        pageArray: pageArray,
        pageNum  : option.pageNum,
        pages    : option.pages
    });

    return html;
};
module.exports = Pagination;
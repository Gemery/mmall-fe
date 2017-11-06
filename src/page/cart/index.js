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
var nav = require('page/common/nav/index.js');
var template = require('./index.string');
var _cart = require('service/cart-service.js');



var page = {
    data:{

    },
    init:function(){
        this.onLoad();
        this.loadCart();
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
    //    商品的选中
        $(document).on('click','.cart-select',function(){
            var $this = $(this);
            var productId = $this.parents('.cart-table').data('product-id');
            console.log('Aaaaaaaaa')

            if($this.is(':checked')){
                console.log('Aaaaaaaaa')
                _cart.selectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                })
            //    取消选中
            }else{
                _cart.unSelectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                })
            }
        });
        //商品的全选中 和 取消全选
        $(document).on('click','.cart-select-all',function(){
            var $this = $(this);
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                })
            //    取消选中
            }else{
                _cart.unSelectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                })
            }
        });
    //    删除单个商品
        $(document).on('click', '.cart-delete', function () {
            if(window.confirm('确定要删除该商品？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                });
            }
        });
    //    删除选中商品
        $(document).on('click', '.delete-selected', function () {
            if(window.confirm('确定要删除选中的商品 ？')){
                var arrProductIds = [];
                var $selectedItem = $('.cart-select:checked');
                console.log($selectedItem);
                for(var i=0,iLength = $selectedItem.length;i<iLength;i++){
                    arrProductIds.push(
                        $($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    console.log(arrProductIds.join(','));
                    _this.deleteCartProduct(arrProductIds.join(','),function(res){
                        _this.renderCart(res);
                    },function(err){
                        _this.showCartError();
                    })
                }
                else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }
            }
        });

        // 商品数量的变化
        $(document).on('click', '.count-btn', function(){
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showCartError();
            });
        });

        //购物车结算
        $(document).on('click', '.btn-submit', function () {
            console.log('aaaaa1111')
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice >0){
                window.location.href = 'order-confirm.html';
            }else{
                _mm.errorTips('您还没有选中要删除的商品');
            }
        });
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

    //    通知导航的购物车跟新数量
        nav.loadCartCount();
    },
    deleteCartProduct:function(productIds){
        var _this = this;
        _cart.deleteCartProduct(productIds,function(res){
            _this.renderCart(res)
        })
        ,function(errMsg){
            _this.showCartError();
        }
    },
    //数据配陪
    filter:function(data){
        data.notEmpty = !!data.cartProductVoList.length;

    },
    showCartError:function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
    }



};
$(function () {
    page.init();
});















<template>
  <div id="app">
    <navigation>
    　　　<router-view class="Router"></router-view>
    </navigation>
  <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import './assets/iconfont/iconfont.css';
// import './assets/app.less';
export default {
  name: "app",
  data() {
    return {
      // transitionName: 'slide-right'  // 默认动态路由变化为slide-right
    }
  },
   /*watch: {
　　'$route' : function(to, from) {
　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
　　　if(isBack) {
　　　　　　this.transitionName = 'slide-right'
　　　　} else {
　　　　　　this.transitionName = 'slide-left'
　　　　}
　　    this.$router.isBack = false
　　  }
　  }*/
   mounted() {
     //刷新的时候，如果用户登录了，就要请求购物车数量
     if(this.getCookie('godId')) this.$store.dispatch('setShoppingCount',true);
   }
};
</script>

<style lang="less">
//公用列表

html,body,#app {
  height: 100%;
}
#app {
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  ::-webkit-search-cancel-button{
    display: none;
  }
}
/* ::-webkit-scrollbar{width:0.01rem;} */
/*  scrollbar[orient="vertical"] {   
  min-width: 15px !important;   
 }  */ 
/* ::-webkit-scrollbar-track{background-color:#bee1eb;}
::-webkit-scrollbar-thumb{background-color:#00aff0;} */
//公共列表头部
.order-nav-all{
  position: fixed !important;
  top: 0.88rem !important;
  left: 0 !important;
  height: .88rem;
  line-height: .88rem;
  width: 100%;
 background-color: #fff !important;
  border-bottom: .01rem solid #EEEFF3;
  font-size: .3rem;
  color: #333;
  overflow-x:scroll;
  z-index: 99;
  white-space: nowrap;
   .order-nav-ul{
    width: 100%;
    height: .88rem;
    margin-left: .14rem;
    background-color: #fff !important;
    /* line-height: .88rem; */
    .order-nav-list{
      width: auto;
      padding: .2rem .3rem;
      display: inline;
    }
    .discount-nav-list{
      width: auto;
      padding: .2rem 0;
      margin:0 .7rem;
      display: inline;
    }
    .active{
      border-bottom: .06rem solid #ff1051;
      color:#ff1051 ;
    }
  } 
}
.order-nav-all::-webkit-scrollbar{ 
  width: 0; 
  height: 0;   
  background-color: #fff;  
}
//公共搜索框
.search-box{
  position: fixed;
  left: 0;
  top: 0;
  height: .88rem;
  line-height: .88rem;
  width: 100%;
  z-index: 999999;
  .search-box-content{
    position: relative;
    width: 100%;
    .search-box-cover{ 
       width:100%; 
       height:100%; 
       background:#fff; 
       opacity:.1; 
       position:absolute; 
       top:0; 
       left:0; 
       z-index:-1; 
    } 
    #search-input{
      background-color: #f8f8f8;
      height: .48rem;
      width: 6.06rem;
      margin-left:.72rem;
      -webkit-border-radius: .24rem;
      border-radius: .24rem;
      text-indent: .64rem;
      opacity: 0.6;
      .search-class{
        background-color: #f1f1f1;
      }
    }
    img{
      width: .25rem;
      height: .25rem;
      position: absolute;
      left: .96rem;
      top: .32rem;
    }
  }
}
.search-box-class{
  border-bottom: .01rem solid #f5f5f5;
  background-color: #fff;
}
/*   .Router {
   position: absolute;
   width: 100%;
   transition: all .2s ease;
}

.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%,0);
} */
.text-ess(@linenum) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @linenum;
  overflow: hidden;
}
.list {
  width: 100%;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #f5f5f5;
  margin-right: -0.08rem;
  /* margin-bottom: 1.0rem; */
  .list-ul {
    width: 100%;
    margin: 0 auto .08rem;
    .list-item {
      width: 3.71rem;
      height: 5.1rem;
      background-color: white;
      margin: 0 0.08rem 0.08rem 0;
      .cover {
        height: 3.4rem;
        width: 100%;
        margin: .16rem auto;
        /* img{
          width: 100%;
          height: 100%;
        } */
      }
      .noCoverImg{
        height: 3.4rem;
        line-height: 3.4rem;
        width: 100%;
        margin: .16rem auto;
        img{
          width: .92rem;
          height: .86rem;
          margin-left:1.4rem;
        }
      }
      .list-item-title {
        width: 90%;
        margin: 0 auto;
        text-align: left;
        .text-ess(2);
        height: 0.7rem;
        font-size: 0.24rem;
        color: #333;
      }
      .price {
         width: 90%;
        margin: .2rem auto;
        display: block;
        text-align: left;
        color: #ff1051;
        font-size: 0.24rem;
        span{
          color: #ff1051;
          font-size: 0.30rem;
        }
      }
    }
    .list-item:nth-child(2n) {
      margin-right: 0;
    }
    .isPutDown{
      color: white !important;
      opacity: 0.6;
    }
  }
}
// 公用头部
.detail-head {
  box-sizing: border-box;
  height: 0.88rem;
  line-height: 0.88rem;
  width: 100%;
  padding: 0 0.24rem;
  text-align: center;
 position: fixed !important;
 top: 0 !important;
 left: 0 !important;
 z-index: 999;
 background-color: #fff !important;
 border-bottom: .01rem solid #EEEFF3;
  .head-all {
    height: .88rem;
    .head-left {
      display: inline-block;
      width: 0.44rem;
      line-height: 0.88rem;
      img {
        transform: rotate(180deg) translateX(0.06rem);
        vertical-align: middle;
      }
    }
    .head-title {
      display: inline-block;
      line-height: 0.88rem;
      text-align: center;
      font-size: .36rem;
      width: 5.9rem;
      overflow:hidden; 
      white-space: nowrap;
      text-overflow:ellipsis;
      word-break:break-all;
      color: #222;
      p {
        text-align: center;
      }
    }
    .head-client {
      width: 0.44rem;
      line-height: 0.88rem;
      img {
        vertical-align: middle;
      }
    }
    .head-manager {
      height: 0.42rem;
      width: 0.66rem;
      font-size: .3rem;
      span{
      	line-height:0.42rem;
      }
    }
  }
}

// 公用商品详情
.shop-list-all {
  width: 100%;
  height: auto;
  .shop-list-item {
    position: relative;
    box-sizing: border-box;
    min-height: 2.62rem;
    padding: 0.24rem 0.24rem 0.38rem 2.4rem;
    border-bottom: .01rem solid #f1f1f1;
    .cover-all {
      position: absolute;
      left: 0.24rem;
      top:0.24rem;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      /*  background-color: #f9f9f9; */ 
      .cover-image {
        width: 80%;
        height: auto;
        vertical-align: middle;
      }
    }
    .item-instro {
      padding-top: 0.04rem;
      .instro-head {
        height: 0.68rem;
        font-size: 0.26rem;
        color: #333;
        .text-ess(2);
        margin-bottom: 0.16rem;
        /* .instro-head-title {          
          line-height: 0.37rem;
          font-size: 0.26rem;
          color: #333;
        }
        .head-img {
          height: 0.36rem;
          width: 0.36rem;
        } */
      }
      .insro-decri-all{
        height: 0.37rem;
        line-height: 0.37rem;
        .insro-decri-btn {
          /* width: 1rem; */
          height: 0.34rem;
          /* box-shadow: 0 0 0 .01rem #ff1051; */
          border: .01rem solid #333;
          border-radius: 0.17rem;
          font-size: 0.22rem;
          line-height: 0.3rem;
          color: #333;
        }
      }
      .insro-decri {
        height: 0.37rem;
        line-height: 0.37rem;
        color: #666;
        font-size: 0.26rem;
        margin-bottom: 0.27rem;
        width: 3.66rem;
        .text-ess(1);
        word-break: break-all;
      }
      .insro-decri-orderIndex{
        height: 0.37rem;
        line-height: 0.37rem;
        color: #666;
        font-size: 0.26rem;
        margin-bottom: 0.27rem;
        .text-ess(1);
        word-break: break-all;
      }
      .insro-decri-order{
        height: 0.64rem;
        line-height: 0.37rem;
        color: #666;
        font-size: 0.26rem;
        margin-bottom: 0.27rem;
        .text-ess(2);
        word-break: break-all;
        .insro-decri-btn {
          /* width: 1rem; */
          height: 0.3rem;
          box-shadow: 0 0 0 .01rem #333;
          border-radius: 0.1rem;
          font-size: 0.22rem;
          line-height: 0.3rem;
          color: #333;
        }
      }
      .instro-price-all{
        .instro-price {
          line-height: 0.42rem;
          font-size: 0.32rem;
          color: #151515;
          .price-icon{
            font-size: .24rem;
          }
          > span {
            color: #151515;
          }
        }
        .fillOrder{
          color: #ff1051 !important;
          > span {
            color: #ff1051 !important;
          }
        }
        .instro-count {
          line-height: 0.42rem;
          font-size: 0.30rem;
          color:#333;
        }
      }
    }
  }
}
// 公用地址
.address {
  height: 1.74rem;
  width: 100%;
  border-top: 0.01rem solid #ddd;
  padding-top: .88rem;
  .address-all {
    width: 7.08rem;
    margin: 0 auto;
    height: 0.86rem;
    padding: 0.30rem 0;
    .address-left {
      width: 6.86rem;
      .address-title {
        .name {
          font-size: 0.36rem;
          color: #333;
        }
        .phone {
          margin: 0 0.24rem;
        }
      }
      .btn {
        width: 0.8rem;
        height: 0.34rem;
        line-height: 0.34rem;
        font-size: 0.18rem;
        border-radius: 0.08rem;
        border: 0.01rem solid #ff1051;
        color: #ff1051;
      }
      .address-detail {
        margin-top: 0.24rem;
        font-size: 0.26rem;
        color: #666;
        img {
          width: 0.3rem;
          height: 0.3rem;
          float: left;
          margin-right: 0.16rem;
        }
      }
    }
    .address-right {
      width: 0.18rem;
      height: 0.3rem;
    }

    .no-address{
      line-height: 1.0rem;
      .position-img{
         width: 0.2rem;
        height: 0.3rem;
        float: left;
        margin-right: 0.16rem;
        margin-top: .36rem;
      }
      .no-address-text{
        width: 3.6rem;
        color: #666;
        font-size: .26rem;
      }
    }
    .add-address-btn{
      height: .56rem;
      line-height: .56rem;
      width: 2.06rem;
      background-color: #fff;
      color: #ff1051;
      margin-top: .26rem;
      border-radius: .28rem;
      box-shadow: 0 0 0 .02rem #ff1051;
    }
  }
  .fengexian {
    width: 100%;
  }
}
// 公用底部大按钮
.confirm {
  background-color: #fff !important;
  height: 1.28rem;
  width: 100%;
  padding-left:.35rem;
  position: fixed;
  left: 0;
  bottom:0;
  font-size: .32rem;
  z-index: 99;
  .btn {
    height: .88rem;
    line-height: .88rem;
    width: 6.8rem;
    background-color: #ff0f4f;
    color: white;
    border-radius: .44rem;
  }
 button[disabled="disabled"] {
   background: #ffdddb;
 }
}

//公用弹出框
.select-shop-model {
  width: 7.5rem;
  padding-bottom:1.52rem;
  max-height: 5.36rem;
  font-size: 0.26rem;
  .shop-model-detail{
      width: 100%;
      height: auto;
    .shop-list-all {
        width: 7.02rem;
        margin: 0 auto;
        height: auto;
        .shop-list-item {
          position: relative;
          box-sizing: border-box;
          min-height: 1.24rem;
          padding: 0.24rem 0 0.24rem 2.2rem;
          border-bottom: .01rem solid #f1f1f1;
          .cover-all-img {
            position: absolute;
            left: 0;
            top:-.42rem;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            background-color: #fafafa;
            border-radius: .1rem .1rem 0 0;
            .cover-image {
              width: 2.0rem;
              height: 2.0rem;
              vertical-align: middle;
              border-radius: .1rem .1rem 0 0;
            }
          }
          .item-instro {
            width: 4.86rem;
            min-height: 1.24rem;
            .insro-decri-all{
              height: 0.37rem;
              line-height: .37rem;
              margin-top: .24rem;
              .insro-decri {
                color: #333;
                font-size: 0.26rem;
                text-align: left;
                width: 4.10rem;
                height: .72rem;
                .text-ess(2);
              }
              .instro-count {
                font-size: 0.26rem;
                color:#333;
              }
            }
            
            .instro-price-all{
              width: 4.86rem;
              height: .42rem;
              position: relative;
              .instro-price {
                line-height: 0.42rem;
                font-size: 0.32rem;
                color: #AEAEAD;
                .price-icon{
                  font-size: .24rem;
                }
                > span {
                  color: #ff1051;
                }
              }
              .close {
                position: absolute;
                right:0;
                top:0;
                width: 0.4rem;
                height: 0.4rem;
                text-align: center;
                img{
                  width:0.36rem;
                  height:auto;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
      .shop-list-ul{
        width: 7.02rem;
        margin: 0 auto;
        height: auto;
        margin-top:.24rem;
        .shop-list-ul-item{

        }
      }
  }


  .shop-model-descri {
    max-height: 3.38rem;
    overflow-x: hidden;
    padding: 0 0 0.24rem 0.24rem;
    .descri-color {
      position: relative;
      box-sizing: border-box;
      min-height: 1.04rem;
      padding: 0.16rem 0 0 0;
      line-height: 0.54rem;
      .descri-color-name{
        color:#888;
      }
      
      .btns {
        line-height: 0.64rem;
        font-size: 0;
        button {
          width: auto;
          height: auto;
          text-align: left;
          background-color: #f5f5f5;
          border-radius: 0.28rem;
          font-size: 0.3rem;
          color: #333;
          margin-right: 0.22rem;
          vertical-align: middle;
          padding: .08rem .2rem;
          /* box-shadow: 0 0 0 .01rem #aeaead; */
        }
        button[disabled="disabled"]{
          color: #333;
        }
        button.active {
          color:#fff;
          background-image: linear-gradient(90deg, #ff779c,#ff1051);
        }
        .jian-btn{
            width: 0.56rem !important;
            height: 0.56rem;
            line-height: .56rem;
            border-radius: 0.28rem 0 0 0.28rem;
            margin:0;
            padding: 0;
            text-align: center;
            background-color: #f5f5f5;
            border: none;
          }
          .jia-btn {
            width: 0.56rem !important;
            height: 0.56rem;
            margin: 0;
            padding: 0;
            border-radius:0 0.28rem 0.28rem 0;
            text-align: center;
            border: none;
            background-color: #f5f5f5;
          }
          .num-btn {
            width: 0.76rem !important;
            height: 0.56rem;
            border-left: none;
            border-right: none;
            border-radius:0;
            margin: 0;
            padding: 0;
            text-align: center;
            background-color: #fff;
          }
      }
    }
  }
  
  .shop-model-title {
    position: relative;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    background-color: #fff;
    p {
      text-align: center;
      font-size: 0.3rem;
      color: #333;
    }
    .shop-model-text{
      margin-left:.24rem;
      text-align: left;
      font-size: 0.3rem;
      color: #333;
    }
    .close {
      position: absolute;
      right:0;
      top:0;
      width: 0.8rem;
      height: 0.8rem;
      line-height: 0.7rem;
      text-align: center;
      img{
        width:0.36rem;
        height:auto;
        vertical-align: middle;
      }
    }
  }
  .pay-methods-all{
    height: auto;
    width: 100%;
    .lianlian-pay{
      height: 1.0rem;
      width: 100%;
      line-height: 1.0rem;
      .pay-img{
        width: .52rem;
        height: .3rem;
        margin: 0 .2rem 0 .23rem;
        img{
          width: .52rem;
          height: .3rem;
          vertical-align: middle;
        }
      }
      .pay-name{
        font-size: .3rem;
        color: #333;
      }
      .pay-radio{
        height: .32rem;
        width: .32rem;
        margin-right: .23rem;
      }
    }
  }
}
.sale-shop-model{
  border-radius:.1rem;
}
/*input placeholder*/
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #cccccc;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #cccccc;
}
/*switch*/
.mint-switch {
  padding-right: 0 !important;
}
.mint-switch-core {
  width: 0.88rem !important;
  height: 0.54rem !important;
}
.mint-switch-input:checked + .mint-switch-core {
  border-color: #ff1051 !important;
  background-color: #ff1051 !important;
  border-radius: 1rem;
}
.mint-switch-core::before,
.mint-switch-core::after {
  width: 0.5rem !important; 
  height: 0.5rem !important;
}
.mint-cell-title{
  flex: 0 !important;
}
.mint-cell-value{
  width: 100% !important;
}
.mint-cell-swipe-button{
  width: 1.2rem !important;
  text-align: center !important;
  padding-top: .3rem !important;
}
/* .mint-msgbox{
  width: 5.0rem;
  height: 2.8rem;
  .mint-msgbox-title{
    margin: .44rem 0 .17rem 0;
    font-size: .32rem;
    font-weight: 500;
 }
 .mint-msgbox-content{
  height: .72rem;
  .mint-msgbox-message{
    font-size: .26rem;
   }
 }
 
 .mint-msgbox-btns{
    height: .89rem;
    line-height: .89rem;
    .mint-msgbox-cancel,.mint-msgbox-confirm{
      font-size: .3rem;
      line-height: .26rem;
     }
  } 
} */

/*左滑删除*/
.item {
  position: relative;
  background: #fff;
  margin-bottom: 0.24rem;
  overflow: hidden;
  cursor: pointer;
  .container {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    transition: left cubic-bezier(0.68, 0.69, 0.11, 0.4) 0.2s;
    -webkit-transition: left cubic-bezier(0.68, 0.69, 0.11, 0.4) 0.2s;
    border-bottom: 0.01rem solid #eeeff3;
    .inner {
      cursor: pointer;
    }
    .deleteBtn {
      position: absolute;
      z-index: 1;
    }
    .wrap {
      position: relative;
      z-index: 2;
      padding: 0.3rem 0.24rem;
      background: #fff;
      h4 {
        line-height: 0.32rem;
        font-size: 0.32rem;
        color: #333;
        font-family: arial, "微软雅黑";
        span {
          padding-right: 0.32rem;
          color: #333;
        }
      }
      .inner {
        position: relative;
        padding-left: 0;
        .checkWrap {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 0.6rem;
          height: 100%;
        }
        .checkInner {
          position: relative;
          width: 100%;
          height: 100%;
          img {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 0.36rem;
          }
        }
      }
    }
    .addrText {
      padding-top: 0.2rem;
      line-height: 0.36rem;
      font-size: 0.28rem;
      color: #333;
    }
    .editBtn {
      position: absolute;
      top: 50%;
      right: 0;
      width: 1.2rem;
      transform: translateY(-50%);
      text-align: center;
      img {
        display: inline-block;
        width: 0.4rem;
      }
    }
    .deleteBtn {
      position: absolute;
      right: -1.48rem;
      top: 0;
      width: 1.48rem;
      height: 100%;
      background: #ff3b30;
      text-align: center;
    }
    .deleteInner {
      position: relative;
      width: 100%;
      height: 100%;
      a {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        font-size: 0.32rem;
        color: #fff;
      }
    }
  }
  .item.active {
    .wrap {
      .inner {
        padding-left: 0.6rem;
        .checkWrap {
          display: block;
        }
      }
    }
  }
}


.mint-swipe-indicators .is-active {
  width: 0.2rem !important;
  height: 0.07rem !important;
  border-radius: 50% !important;
  background: #ff779c !important;
  opacity: 1 !important
}

.mint-swipe-indicator {
  margin: 0 0.1rem;
  width: 0.2rem !important;
  height: 0.07rem !important;
  background: #ccc !important;
  opacity: 1 !important;
  border-radius: 50% !important;
}

.mint-swipe-indicators {
  bottom: .24rem !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-main .mint-swipe-indicator {
   background: #ccc !important;
   width: 0.2rem !important;
   height: 0.07rem !important;
   border-radius: 50% !important;
}

.detail-main .mint-swipe-indicators .is-active {
   width: 0.2rem !important;
   height: 0.07rem !important;
   background: #ff779c !important;
   border-radius: 50% !important;
}


//首页样式
@fs:0.28rem;
//预设样式
@primary:#03ace8;
@info:#00698b;


// 预设类
.pr() {
  position: relative;
  left: 0;
  top: 0;
}

.pa(@left,@top) {
  position: absolute;
  left: @left;
  top: @top;
}

.pf() {
  position: fixed;
    bottom: 0;
    left: 0;
}

.mc() {
  margin: 0 auto;
}

.flex(@arrow) {
    display: flex;
  justify-content: @arrow;
  align-items: center;
}


.flex-center() {
    display: flex;
  justify-content: center;
  align-items: center;
}

.text-ess(@linenum) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @linenum;
  overflow: hidden;
}


/*  .price-icon {
 font-size: 0.22rem
}  */

.price-icon-detail {
  font-size: 0.3rem;
}


.toast-wj {
  width: 3.8rem;
  height: 2.46rem;
  border-radius: 0.24rem;
  .mint-toast-icon {
    font-size: 0.84rem;
  }
  .mint-toast-text {
    font-size: 0.32rem 
  }
}
.toast-delete {
  width: 3.8rem;
  height: 1.2rem;
  border-radius: 0.1rem;
  .mint-toast-text {
    font-size: 0.32rem;
    line-height: 1.0rem;
  }
}

</style>

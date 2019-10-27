<template>
  <div class="index-main" @onscroll="isToTopShow">

    <!-- 搜索框 -->
    <div class="search-box">
      <div class="search-box-content" @click.stop="toPath('/searchIndex')"> 
        <div class="search-box-cover"></div>
        <input type="text" name="" placeholder="伙拼平价超市，爆款特卖热销让利..." id="search-input" readonly="readonly">
        <img src="./../assets/images/shousuo-icon@2x.png" height="25" width="25" alt="">
      </div>
    </div>
    <!-- banner图 -->
    <Slider :bannerList="bannerList" type="index"></Slider>
    <!-- 商品分类 -->
    <ClassType :categoryList="categoryList"></ClassType>
    
    <!-- 通知发布 -->
    <div class="notice-all">
      <div class="notice">
        <img src="./../assets/images/wankazixun@2x.png" height="35" width="141"  alt="" class="fl">
        <div class="notice-content fl">
          <Marquee :marqueeList="lanternList"/>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- 新宝单品 -->
    <div class="all-shop-list" v-for="(item,index) in categoryToProductList" >
      <div class="shop-header">
        <h3>
          {{item.categoryName ? item.categoryName.length > 14 ? item.categoryName.slice(0,14) + '...' : item.categoryName : ''}}
        </h3>
        <div class="shop-header-more" @click="toSingalClass(item.categoryId,item.categoryName)">
          <span>更多</span>
          <img src="./../assets/images/jiantou@2x.png">
        </div>
      </div>
      <div class="shop-list-img">
        <img :src="item.categoryImgUrl" alt="" @click="toSingalClass(item.categoryId,item.categoryName)">
        <!-- <img src="./../assets/images/huodongtu@2x.png" alt=""> -->
      </div>
      <div class="list">
        <ul class="list-ul">
          <li class="list-item fl" v-for="(citem,cindex) in item.homeCategoryProductVoList" @click="detailsPath('/detail',citem.productId)">
            <div class="cover" 
            :style="{background:'url('+citem.coverImgUrl+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
            </div>
            <!-- <div class="noCoverImg" v-else>
                <img src="./../assets/images/zhanweitu@2x.png">
            </div> -->
            <p class="list-item-title">
             {{citem.productName}}
            </p>
            <span class="price">&#165;<span>&nbsp;{{formatPrice(citem.price,2)}}</span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- 已经到底了 -->
    <div class="footer-img">
      <img src="./../assets/images/daodi@2x.png">
    </div>
    <div class="clearfix"></div>
    <!-- 底部导航 -->
    <Footer :navindex="navindex" :shoppingCarCount="shoppingCarCount"></Footer>
    <!-- 返回顶部 -->
    <a href="javascript:window.scrollTo(0,0);" id="toTop" v-show="isToTopShowState">
      <div 
      class="top-img" 
      :style="{background:'url(./static/images/fanhuidingbu@2x.png)',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
      </div>
    </a>
  </div>
</template>
<script>
import Slider from "./common/slider.vue";
import Footer from "./common/footer.vue";
import Marquee from './common/Marquee.vue';
import ClassType from './common/classType.vue';
import $ from 'jquery';
export default {
  data() {
    return {
      navindex: 0,
      bannerList: [],//bananer图数据
      lanternList: [],//走马灯数据
      categoryToProductList: [],//列表数据
      categoryList:[],//分类数据
      isToTopShowState: false,//是否显示回到顶部图标
    };
  },
  components: {
    Slider,
    Footer,
    Marquee,
    ClassType
  },
  methods: {
    //获取搜索关键字
    getSearchKey(){
      this.$http.post("home/querySearchName", {})
      .then(res => {
        if(res.data.resultdesc == '成功'){
          // console.log(res)
          var searchKey = res.data.object;
          document.getElementById('search-input').setAttribute('placeholder',searchKey);
        }
      });
    },
    /**
     * [toSingalClass 跳转到某一个分类页面]
     * @作者     王柳
     * @日期     2018-04-11
     * @param  {[type]}   id   [description]
     * @param  {[type]}   name [description]
     * @return {[type]}        [description]
     */
    toSingalClass(id,name) {
      this.$router.push({
        path:'/classList',
        query:{
          id:id,
          categoryName:name
        }
      });
    },
    /**
     * [获取首页显示数据]
     * @作者     王柳
     * @日期     2018-03-15
     * @return {[type]}   [description]
     */
    getHomeData() {
      this.loading(true);
      this.$http.post("/integral/getIntegralAllDetails", {})
      .then(res => {
        if(res.data.resultdesc == '成功'){
          this.loading(false);
          this.bannerList = res.data.object.bannerList;
          this.lanternList = res.data.object.lanternList;
          this.categoryList = res.data.object.categoryList;
          this.categoryToProductList = res.data.object.categoryToProductList;
          this.categoryToProductList.forEach((item,index) => {
            if(item){
              item.homeCategoryProductVoList.forEach((citem,cindex) => {
                if(citem.coverImgUrl == '' || citem.coverImgUrl == null){
                  citem.coverImgUrl = './static/images/zhanweitu@2x.png';
                }
              });
            }
          });
        }
      });
    },
    /**
     * [isToTopShow 决定返回顶部按钮是否显示]
     * @Author  王柳
     * @DateTime 2018-03-15
     * @return   {Boolean}  [description]
     */
    isToTopShow() {
      var scrollTop=0;
      if(document.documentElement&&document.documentElement.scrollTop){
          scrollTop=document.documentElement.scrollTop;
      }else if(document.body){
          scrollTop=document.body.scrollTop;
      }
      // console.log(scrollTop)
      //判断返回顶部按钮的显示/隐藏indexMain
      this.isToTopShowState = scrollTop > 0 ? true : false;
      this.setSearchBoxBg(scrollTop);
    },
    /**
     * [根据鼠标滚动的位置显示搜索框的背景色]
     * @作者 王柳
     * @日期 2018-04-09
     */
    setSearchBoxBg(scrollTop){
      // console.log(scrollTop)
      var searchBox = document.getElementsByClassName('search-box-cover');
      var topCount = scrollTop / 150;
      searchBox[0].style.cssText = "opacity:" + topCount;
    }
  },
  mounted() {
    this.getSearchKey();
    this.setCookie('typeIndex',5);
    this.setCookie('searchIndex',1);
    this.getHomeData();
    //鼠标滚动事件
    document.body.onscroll = this.isToTopShow;
  },
  activated() {
    setTimeout(()=>{
       window.scrollTo(0,0);
       document.querySelector('.search-box-cover').style.opacity = 0;

       document.body.onscroll = this.isToTopShow;
    }, 10)
  }
};
</script>

<style lang="less" scoped>
.index-main {
  padding-bottom: 1.0rem;
  background-color: #fff;
  .top-img{
    width: .92rem;
    height: .92rem;
    position: fixed;
    right: .2rem;
    bottom: 1.6rem;
    img{
      width: 100%;
    }
  }
  .slider {
    /* padding-top: .88rem; */
    height: 4.0rem;
  }

  .notice-all{
    width: 100%;
    border-bottom: .08rem solid #f5f5f5;
    .notice {
      width: 7.18rem;
      margin: 0 auto;
      height: 0.66rem;
      line-height: 0.66rem;
      position: relative;

      /* &:after {
        content: "";
        display: block;
        position: absolute;
        left: .5rem;
        bottom: 0.15rem;
        width: 0.02rem;
        height: 0.3rem;
        background-color: #aeafac;
      } */
      img {
        height: 0.35rem;
        width: 1.41rem;
        margin-top: 0.16rem;
      }
      .notice-content {
        font-size: 0.3rem;
        height: 0.6rem;
        position: relative;
        line-height: 0.6rem;
        width: 5.77rem;
        text-indent: .3rem;
        /* // overflow-x: hidden;
        // &:before {
        //   content: "";
        //   display: block;
        //   position: absolute;
        //   left: .2rem;
        //   bottom: 0.25rem;
        //   width: 0.1rem;
        //   height: 0.1rem;
        //   border-radius: .05rem;
        //   background-color: #aeafac;
        // } */
      }
      .notice-text {
        display: inline-block;
        font-size: 0.26rem;
        width: 100%;
       /*  // height: 0.5rem;
       // overflow: hidden;
       // text-overflow: ellipsis;
       // white-space: nowrap; */
        a {
          display: inline-block;
          min-width: 6rem;
          padding-right: 1rem;
          &:last-child {
            min-width: 0;
          }
        }
      }
    }
  }
  

  .all-shop-list{
    width: 100%;
    height: auto;
    overflow-y:scroll;
    border-top: .07rem solid #f5f5f5;
    .shop-header{
      width: 7.18rem;
      margin: 0 auto;
      height: .88rem;
      line-height: .88rem;
      font-size: .34rem;
      color: #333;
      display: flex;
      justify-content: space-between;
      .shop-header-more{
        span{
          font-size: .24rem;
          color: #888;
        }
        img{
          width: .22rem;
          height: .22rem;
        }
      }
    }
    .shop-list-img{
      width: 100%;
      height: 2.6rem;
      border-bottom: .1rem solid #f5f5f5;
    }
  }

  .footer-img{
    height: .72rem;
    background-color: #f5f5f5;
    img{
      height: .24rem;
      width: 3.82rem;
      margin: .24rem 0 0 1.84rem;
    }
  }
}
</style>


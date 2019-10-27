<template>
  <div class="detail-main">
  <!-- 头部 -->
    <div class="detail-head" v-show="deadshow">
      <div class="head-all">
        <div class="head-left fl" @click="toBackPre()">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <!-- <p>{{productList.productName}}</p> -->
          <p>{{productList.productName?productList.productName.length>14?productList.productName.slice(0,14)+"...":productList.productName:''}}</p>
        </div>
        <div class="head-client fr" @click="toServicePath()">
          <img src="./../assets/images/ic_custoservers@2x.png"  alt="">
        </div>
      </div>
    </div>
    <!-- 轮播 -->
    <div class="detail-slider">
      <img :src="productImgBannerList[0].imgUrl" alt="" v-if="productImgBannerList.length == 1">
      <mt-swipe :auto="3000" v-else>
        <mt-swipe-item :key="index" 
         v-for="(item,index) in productImgBannerList"><img :src="item.imgUrl" height="100%" width="100%"  alt="">
        </mt-swipe-item>
      </mt-swipe>
      
    </div>
    <!-- 产品描述 -->
    <div class="detail-instro">
      <div class="instro-all">
        <p class="instro-title" v-text="newProductList.productName"></p>
        <p class="instro-text" style="-webkit-box-orient: vertical;box-orient: vertical">
           {{newProductList.description}}
        </p>
        <div class="instro-price">
          <i>&nbsp;</i>
          <div class="price fl">
            <span class="price-current">
              <span class="price-icon price-icon-detail">&#165;</span>
              <em>{{formatPrice(newProductList.price,2)}}</em>
            </span>
            <span class="price-old" v-show="newProductList.cost > 0">
              <s>
                  <span class="price-icon price-icon-detail">&#165;</span>
                {{formatPrice(newProductList.cost,2)}}
              </s>
            </span>
          </div>
          <div class="count fr">
            已售：{{newProductList.buyNum}}件
          </div>
        </div>
      </div>
    </div>
    <!-- 促销活动 -->
    <!-- <div class="sale">
      <div class="sale-all" @click="saleShopModel = true">
        <div class="sale-descri fl">
          <span class="sale-descri-text">促销</span>
          <button class="sale-descri-btn">满减</button>
          满100元减5元
         <span class="shenghao">&times
            <span>{{newProductList.newShopCount}}</span>
          </span>
        </div>
        <div class="sale-img fr">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
      </div>
    </div> -->
    <!-- 选择规格 -->
    <div class="choice">
      <div class="choice-all" @click="selectShopModel = true">
        <div class="choice-descri fl">
          <span class="chioce-descri-text">已选</span>
          {{newProductList.attr ? newProductList.attr.length > 16 ? newProductList.attr.slice(0,16)+'...' : newProductList.attr : ''}}
          <span class="shenghao">&times
            <span>{{newProductList.newShopCount}}</span>
          </span>
        </div>
        <div class="chioce-img fr">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- 商品详情图 -->
    <div class="product-header-img">
      <img src="./../assets/images/xiangqing@2x.png"  alt="" >
    </div>
    <ul class="product-img">
      <li class="product-item-img" v-for="(item,index) in productImgList">
        <img :src="item.imgUrl" alt="">
      </li>
    </ul>
    <!-- <div class="product-footer-img">
      <img src="./../assets/images/footer750940.jpg"  alt="" >
    </div> -->
    <!-- 购买 -->
    <div class="buy">
      <div class="shopping-car fl" @click="toShoppingCar">
        <!-- <span class="Shopping-count">{{shoppingCarCount}}</span> -->
        <button class="Shopping-count" v-show="shoppingCarCount != 0">
          <!-- <span  >{{shoppingCarCount}}</span> -->
          {{shoppingCarCount > 99 ? 99+'+' : shoppingCarCount}}
        </button>
        <img src="./../assets/images/gouwuche-icon@2x.png"  alt="" >
        <!-- <p class="shopping-car-text">购物车</p> -->
      </div>
      <div class="shopping-btn fl">
        <button class="join-btn fl" @click="joinShoppingCar()" :disabled="noAppProduct">加入购物车</button>
        <button class="buy-btn fl" @click="immediatePurchase()" :disabled="noAppProduct">立即购买</button>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- 跳转到投资免费拿 -->
    <!-- <a class="to-touzi-all" :href="url + toTouziProductId" v-show="productList.jumpAppName == 'wjjf'">
      <div 
      class="to-touzi-img" 
      :style="{background:'url(./static/images/totouzi.png)',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
      </div>
    </a> -->
    <!-- 促销活动弹出框 -->
    <mt-popup
      v-model="saleShopModel"
      position="bottom"
      >
      <div class="select-shop-model sale-shop-model" 
      ref="control">
       <div class="shop-model-title">
         <p>促销</p>
         <div class="close" @click="saleShopModel = false">
           <img src="./../assets/images/ic-close@2x.png" alt="">
         </div>
       </div>
       <div class="shop-model-detail">
         <ul class="shop-list-ul">
            <li class="shop-list-ul-item">满100元减5元</li>
         </ul>
       </div>
        <!-- 确定按钮 -->
        <div class="confirm">
          <button class="btn" @click="saleShopModel = false">确定</button>
        </div>
      </div>
    </mt-popup>
    <!-- 选择商品弹出框 -->
    <mt-popup
      v-model="selectShopModel"
      position="bottom"
      >
      <div class="select-shop-model" 
      >
        <!-- 有匹配的SKU -->
        <div class="shop-model-detail" v-show="isHaveSku">
          <div class="shop-list-all" >
            <div class="shop-list-item">
              <div class="cover-all-img">
                 <img :src="productList.imgUrl ? productList.imgUrl : './static/images/1.png'" alt="" class="cover-image">
              </div>
              <div class="item-instro">
                <div class="instro-price-all">
                  <span class="instro-price fl">
                    <span class="price-icon">&#165;</span>
                    <span>{{productList.isHaveShop == false ? formatPrice(productList.price,2) : '0.00'}}</span>
                  </span>
                  <span class="close fr" @click="cancelClickBtn()">
                    <img src="./../assets/images/ic-close@2x.png" alt="">
                  </span>
                </div>
                <div class="clearfix"></div>
                <div class="insro-decri-all">
                  <div class="insro-decri fl">
                    {{selectSku.attr=="none"?productList.attr:selectSku.attr}}
                  </div>
                  <span class="instro-count fr">&times
                    <span>{{productList.shopCount}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>

        <div class="shop-model-descri" ref="control" 
        >
          <div class="descri-color" v-for="(item,index) in skuList">
            <div class="descri-color-name">{{item.name}}</div>
            <div class="btns">
              <button :class="sindex == skuIndex[index] ? 'active' : ''" v-for="(sitem,sindex) in item.list" @click="selectDesriCache(index,sindex)">{{sitem}}</button>
            </div>
          </div>
          <div class="descri-color">
            <div class="descri-color-name">商品数量</div>
            <div class="btns fl">
              <button class="jian-btn fl" @click="countJian(productList)" :disabled="productList.countJianDisabled">-</button>
              <button class="num-btn fl">{{productList.shopCount}}</button>
              <button class="jia-btn fl" @click="countJia(productList)" :disabled="productList.countJiaDisabled" >+</button>
              
            </div>
          </div>
        </div>
        <!-- 确定按钮 -->
        <div class="confirm">
          <button class="btn" @click="showSelectShoppingCar" v-bind:disabled="productList.isHaveShop">{{productList.confirmText}}</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import { MessageBox,Toast} from 'mint-ui';
export default {
  computed: mapGetters([
    'shoppingCarCount',
   ]),
  data() {
    return {
      deadshow:true,
      selectSku:{attr:"none"},
      skuList:[],
      skuIndex:[],
      productImgBannerList: [],
      productImgList: [],
      productList: {},//弹出框商品数据
      productListAll:[],
      newProductList: {},//初始商品数据
      noProductList:{
        noprice:0,
        noshopCount:0,
        noattr:''
      },//没有匹配的SKU
      
      // 弹出框参数
      selectShopModel: false,
      saleShopModel:false,
      productId: this.$route.query.id,//商品ID
      searchKey:this.getCookie('searchKey'),//搜索关键字
      categoryId:this.$route.query.categoryId,//分类Id
      categoryName:this.$route.query.categoryName,//分类名称
      threeCategoryName:this.$route.query.threeCategoryName,//三级分类名称
      defaultSkuid:'',
      
      shopCount:1,//选择的商品数量
      shopStock:'',//商品库存
      isHaveSku:true,
      url:"http://newtest.wanjiajinfu.com/mobile/mallDetail.html?productId=",//投资免费拿测试服地址
      // url:"https://weixin.wanjiajinfu.com/mobile/mallDetail.html?productId=",//投资免费拿正式服地址
      toTouziProductId:'',//跳转到投资免费拿产品ID
      noAppProduct:false,
    };
  },
  methods: {
    //跳转到客户服务
    toServicePath(){
      this.toPath('/customService');
      this.setCookie('typeIndexService',1);
    },
    toBackPre(){
      if(this.getCookie('typeIndex') == 1){
        this.toPath('/');
      }else if(this.getCookie('typeIndex') == 2){
        this.toPath('/shoppingCar');
      }else if(this.getCookie('typeIndex') == 6){
        this.toPath('/mine');
      }else if(this.getCookie('typeIndex') == 5) {
        this.toPath('/');
        // this.toBack();
      }else if(this.getCookie('typeIndex') == 7) {
        this.detailsPath('/searchList',this.searchKey);
      }else if(this.getCookie('typeIndex') == 8) {
        this.$router.push({
          path:'/classList',
          query:{
            id:this.categoryId,
            categoryName:this.categoryName
          }
        });
      }else if(this.getCookie('typeIndex') == 9) {
        this.$router.push({
          path:'/class',
          query:{
            id:this.categoryId,
            categoryName:this.categoryName
          }
        });
      }else if(this.getCookie('typeIndex') == 10) {
        this.$router.push({
          path:'/threeClassList',
          query:{
            id:this.categoryId,
            categoryName:this.categoryName,
            threeCategoryName:this.threeCategoryName
          }
        });
      }else{
        this.toPath('/');
      }
    },
     /**
      * [innitTypeSelect 默认渲染弹出框规格属性]
      * @作者     王柳
      * @日期     2018-04-10
      * @return {[type]}   [description]
      */
     //默认渲染弹出框规格属性
     innitTypeSelect(){
      // this.newProductList = this.productList;
       var _defaultSku = this.productList.attr.split(",");
        for(var i=0; i<_defaultSku.length; i++){
          for(var j=0; j<this.skuList.length; j++){
            if(this.skuList[j].list.indexOf(_defaultSku[i])>=0){
              this.skuIndex[j] = this.skuList[j].list.indexOf(_defaultSku[i]);
            }
          }
        };
     },
           
    //没有点击确定，直接关闭的情况
    cancelClickBtn(){
       this.selectShopModel = false;
       this.innitTypeSelect();
       this.productListAll.forEach((item,index)=>{
          item.confirmText = '确定';
          // item.shopCount = 1;
          item.isHaveShop = false;
       })
    },
    //点击显示弹出框
    showSelectShoppingCar() {
      if (this.selectShopModel) {
        this.selectShopModel = false;
        this.newProductList = this.productList;
        this.newProductList.newShopCount = this.productList.shopCount;
      } else {
        this.selectShopModel = true;
      };
    },
    //选择不同规格
    selectDesriCache(index,sindex,){
      this.skuIndex[index] = sindex;
      // console.log(this.skuIndex);
      this.$set(this.skuIndex,index,sindex);
      this.getSelectedAttribute();
    },
    //得到选中的规格参数
    getSelectedAttribute(){
      var _this = this;
      // this.productListAll.forEach((item,index)=>{
      //     item.confirmText = '确定';
      //     // item.shopCount = 1;
      //     item.isHaveShop = false;
      // })
      var _str = "";
      for(var i=0; i<this.skuList.length; i++){
        var _sindex = this.skuIndex[i];
        if(i == 0){
          _str += this.skuList[i].list[_sindex];
        }else{
          _str += ","+this.skuList[i].list[_sindex];
        }
      }
     var a_str = _str.split(",").sort().join();
      
      // console.log("select____"+a_str);
      // console.log(this.selectSku.attr);
      // console.log(this.productListAll[0].attr.split(",").sort().join()+"-----"+this.productListAll[1].attr.split(",").sort().join());
      // console.log(a_str == this.productListAll[1].attr.split(",").sort().join())
     this.selectSku.attr = a_str;
     _this.productListAll.forEach((item,index)=>{
        var _item = item.attr.split(",").sort().join();
      if(a_str == _item){
        item.isHaveShop = false;
        item.confirmText = '确定';
        this.defaultSkuid = item.skuId;
        item.shopCount = 1;
        this.productList = item;
        // this.productList.price = item.price;
      }else{
        // this.productList.attr = a_str;
        item.isHaveShop = true;
        item.confirmText = '库存不足';
        item.shopCount = 0;
        // item.price = 0;
        // this.productList.attr = a_str;
      }
     })
    },
    //选择商品数量
    countJian(item){
      if(item.shopCount > 1){
        this.productList.shopCount -= 1;
        this.shopCount = this.productList.shopCount;
        item.countJianDisabled = false;
      }else{
        item.countJianDisabled = true;
      }
    },
    countJia(item){
      if(item.shopCount < this.shopStock){
        this.productList.shopCount += 1;
        this.shopCount = this.productList.shopCount;
        item.countJiaDisabled = false;
      }else{
        item.countJiaDisabled = true;
      }
    },
    //立即购买
    immediatePurchase(){
      this.setCookie("typeIndex",1);
      if(this.volidUserId()){
        this.setCookie("detailSkuId",this.defaultSkuid);
        this.setCookie("quantity",this.newProductList.newShopCount);
        
        this.setCookie("productId",this.productId);
        this.$router.push({
          path:'/fillOrder',
          query:{
            productId:this.productId
          }
        })
      }
    },
    /**
     * [toShoppingCar 跳往购物车]
     * @Author   罗文
     * @DateTime 2018-03-27
     * @return   {[type]}   [description]
     */
    toShoppingCar() {
      this.setCookie("typeIndex",1);
      if(this.volidUserId()){
        this.$router.push({
         path:'/shoppingCar',
         query:{
           from:'detail'
         }
       })
      }
    },
    //加入购物车
    joinShoppingCar(){
      this.setCookie("typeIndex",1);
      if(this.volidUserId()){
        var params = {
          params:{
            skuId:this.defaultSkuid,
            quantity:this.shopCount,
            godId:this.getCookie('godId'),
            productId:this.productId,
          } 
        }
        this.getData('post','/shopping/insert',params,(res) => {
          // console.log(res)
          if(res.data.result == '10000'){
            this.toPath('/login');
          }else if(res.data.result == '000000'){
            this.$store.dispatch('setShoppingCount',true);
            Toast({
              message: '添加购物车成功',
              iconClass: 'icon-wj-success',
              className:'toast-wj',
              duration: 1000
            });
          }else{
            MessageBox.alert(res.data.resultdesc);
          }
        });
      }
    },
    //获取商品详情
    getDetail(id) {
      this.loading(true);
      var params = {
        params:{
          productId: id,
          // godId:this.getCookie('godId'),
        } 
      }
      this.getData('post','/product/queryProductDefaultList',params,(res) => {
        // console.log(res.data.object)
        if(res.data.result == '000000'){
          this.loading(false);
          var attributeModeValList = res.data.object.attributeModeValList;
            this.skuList = [];
            this.skuIndex = [];
            attributeModeValList.forEach((item,index) => {
              var newObj = {};
              newObj.name = item.attributeName;
              newObj.list = item.attr.split(",");
              // console.log(newObj)
              this.skuList.push(newObj);
              this.skuIndex[index] = 0;
            });
            
            this.productImgBannerList = res.data.object.productImgBannerList;
            // console.log(this.productImgBannerList.length)
            this.productImgList = res.data.object.productImgList;
            if(res.data.object.productList.length > 0){
              this.noAppProduct = false;
              var newProductListAll = [];
              newProductListAll = res.data.object.productList;//详情介绍数据
              //给this.newProductListAll的每一项添加是否有匹配选项状态
              newProductListAll.forEach((citem,cindex) => {
                citem = Object.assign({},citem,{
                  newShopCount:1,
                });
                this.$set(newProductListAll,cindex,citem);
              });
              newProductListAll.forEach((citem,cindex) => {
                if(citem.defaultSkuid != ''){
                  if(citem.skuId == citem.defaultSkuid){
                    this.newProductList = citem;
                    // this.defaultSkuid = citem.defaultSkuid;
                    // this.shopStock = citem.stock;
                  }
                }else{
                  this.newProductList = newProductListAll[0];
                  // this.defaultSkuid = this.newProductList.skuId;
                  // this.shopStock = this.newProductList.stock;
                }
              });
            }else{
              MessageBox.alert(res.data.resultdesc);
              this.newProductList = [];
              this.noAppProduct = true;
            }
            

            
            this.productListAll = res.data.object.productList;
            //给this.productListAll的每一项添加是否有匹配选项状态1
            this.productListAll.forEach((item,index) => {
              item = Object.assign({},item,{
                isHaveShop:false,
                confirmText:'确定',
                shopCount:1,
                countJianDisabled:false,
                countJiaDisabled:false
              });
              this.$set(this.productListAll,index,item);
            });
            // console.log(this.productListAll)
            
            //默认渲染，item.defaultSkuid == item.skuId
            this.productListAll.forEach((item,index) => {                                                   
              if(item.defaultSkuid != ''){
                if(item.skuId == item.defaultSkuid){
                  this.productList = item;
                  this.defaultSkuid = item.defaultSkuid;
                  this.shopStock = item.stock;
                  this.toTouziProductId = this.productList.appProductId;
                  console.log(this.productList)
                }
              }else{
                this.productList = this.productListAll[0];  
                this.defaultSkuid = this.productList.skuId;
                this.shopStock = this.productList.stock;
                this.toTouziProductId = this.productList.appProductId;
              }
            });

            //默认渲染弹出框规格属性
            this.innitTypeSelect();
        }else if(res.data.result == '000002'){
          this.loading(false);
          MessageBox.alert(res.data.resultdesc);
          this.newProductList = [];
          this.noAppProduct = true;
        }else{
          this.loading(false);
          MessageBox.alert(res.data.resultdesc);
          this.newProductList = [];
          this.noAppProduct = true;
        }

        
      });
    },
  },
  mounted() {
    this.setCookie('productId',this.productId);
   
    this.getDetail(this.productId);
    if(this.getCookie('godId') != '' || this.getCookie('godId') != undefined){
      this.$store.dispatch('setShoppingCount',true);
    }

    this.getAppType((type) => {
      if(type == 'isiOS' || type == 'isAndroid'){
        this.deadshow = false;
        document.getElementsByClassName('detail-slider')[0].style.paddingTop = 0;
      }
    });
  },
  watch:{
    //监听shopCount数量变化，+ - 号状态改变
    'productList.shopCount':function(val,oldVal){
      if(val < 1){
        this.productList.countJianDisabled = true;
        // this.confirmText = '库存不足';
      }else if(val == 0){
        this.productList.countJianDisabled = true;
      }else{
        this.productList.countJianDisabled = false;
        // this.confirmText = '确定';
      }

      if(val >= this.shopStock){
        this.productList.countJiaDisabled = true;
        // this.confirmText = '库存不足';
      }else if(val == 0){
        this.productList.countJiaDisabled = true;
      }else{
        this.productList.countJiaDisabled = false;
        // this.confirmText = '确定';
      }
    },
    //监听selectShopModel的状态，控制鼠标滚动事件
    selectShopModel:function(nv) {
        if(nv) {
          document.body.style.overflow = 'hidden';
          document.ontouchmove = function(e) {
            e.preventDefault();
          };

          this.$refs.control.ontouchmove = function (e) {
             e.stopPropagation();
             e.returnValue = true;
          }
        }else {
          document.body.style.overflow = 'visible';
          document.ontouchmove = null;
        }
    },
    saleShopModel:function(nv) {
        if(nv) {
          document.body.style.overflow = 'hidden';
          document.ontouchmove = function(e) {
            e.preventDefault();
          };

          this.$refs.control.ontouchmove = function (e) {
             e.stopPropagation();
             e.returnValue = true;
          }
        }else {
          document.body.style.overflow = 'visible';
          document.ontouchmove = null;
        }
    }
  }
};
</script>

<style lang="less" scoped>
.text-ess(@linenum) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @linenum;
  overflow: hidden;
}
.detail-main {
  .detail-slider {
    height: 5.3rem;
    width: 100%;
    margin-top: .88rem;
    border-bottom: 1px solid #EEEFF3;
    img {
      // height: 4.5rem;
      width: 100%;
    }
  }

  .detail-instro {
    height: auto;
    min-height: 2.26rem;
    width: 100%;
    .instro-all {
      padding: 0.24rem 0.24rem 0.3rem;
      .instro-title {
        line-height: 0.42rem;
        font-size: 0.34rem;
        color: #333;
        margin-bottom: 0.08rem;
        .text-ess(1);
      }
      .instro-text {
        font-size: 0.24rem;
        color: #333;
        margin-bottom: 0.4rem;
        .text-ess(2);
      }
      .price {
        line-height: 0.5rem;
        .price-current {
          font-size: 0.32rem;
          color: #ff1051;
          em {
            font-style: normal;
            color: #ff1051;
          }
        }
        .price-old {
          font-size: 0.28rem;
          color: #a3a3a3;
        }
      }
      .count {
        line-height: 0.5rem;
        font-size: 0.24rem;
        color: #333;
      }
    }
  }

  .sale {
    height: 1rem;
    width: 100%;
    border-top: .01rem solid #f5f5f5;
    font-size: 0.28rem;
    .sale-all {
      padding: 0 0.24rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.28rem;
      color: #333;
      .sale-descri {
        vertical-align: middle;
        .sale-descri-text{
          margin-right:.24rem;
        }
        .sale-descri-btn{
          height: .32rem;
          line-height:.3rem;
          border:.01rem solid #ff1051;
          color:#ff1051;
          border-radius:.16rem;
          font-size:.22rem;
        }
        .shenghao{
          margin-left: .1rem;
        }
      }
      .sale-img {
        height: 0.28rem;
        width: 0.28rem;
        vertical-align: middle;
      }
    }
  }

  .choice {
    height: 1rem;
    width: 100%;
    border-top: 0.16rem solid #f5f5f5;
    border-bottom: 0.16rem solid #f5f5f5;
    font-size: 0.28rem;
    .choice-all {
      padding: 0 0.24rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.28rem;
      color: #333;
      .choice-descri {
        vertical-align: middle;
        .chioce-descri-text{
          margin-right:.24rem;
        }
        .shenghao{
          margin-left: .1rem;
        }
      }
      .chioce-img {
        height: 0.28rem;
        width: 0.28rem;
        vertical-align: middle;
      }
    }
  }
  
  .product-header-img{
    height: 2.28rem;
    width: 100%;
  }
  .product-img{
    width: 100%;
    height: 100%;
    padding-bottom: 1.2rem;
    overflow-y: scroll;
    .product-item-img{
      height: 100%;
      width: 100%;
      img{
        height: 100%;
        width: 100%;
        vertical-align: middle;
      }
    }
  }
  .product-footer-img{
    height: 9.4rem;
    width: 100%;
    margin-bottom: 1.0rem;
  }

  .buy {
    box-sizing: border-box;
    height: 1.2rem;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    .shopping-car {
      position: relative;
      width: 1.42rem;
      text-align: center;
      border-top: 0.01rem solid #f5f5f5;
      .Shopping-count {
        display: block;
        padding: 0.01rem;
        position: absolute;
        font-size: 0.24rem;
        text-align: center;
        right: 0.2rem;
        top: 0.3rem;
        width: 0.46rem;
        height: 0.26rem;
        border-radius: 0.18rem;
        background-color: #ff1051;
        color: white;
      }
      img {
        width: 0.42rem;
        height: .42rem;
        margin-top: 0.4rem;
      }
      .shopping-car-text{
        font-size: .24rem;
        color: #666;
      }
    }
    .shopping-btn{
      box-sizing: border-box;
      width: 6.08rem;
      height: .72rem;
      line-height: .72rem;
      margin-top: .24rem;
      border-left: .01rem solid #f5f5f5;
      .join-btn {
        margin-left: .24rem;
        /* box-sizing: border-box; */
        width: 2.8rem;
        text-align: center;
        height: 0.72rem;
        border-bottom: none;
        background-color: #f5f5f5;
        font-size: 0.3rem;
        color: #666;
        border-radius: .36rem 0 0 .36rem;
      }
      button[disabled="disabled"] {
        background: #ddd;
      }
      .buy-btn {
        width: 2.8rem;
        text-align: center;
        height: .72rem;
        background-color: #ff0f4f;
        color: white;
        font-size: 0.3rem;
        border-radius: 0 .36rem .36rem 0;
      }
    }
  }

  .to-touzi-all{
    width:100%;
    height: 1.28rem;
    .to-touzi-img{
      width: 1.28rem;
      height: 1.28rem;
      position: fixed;
      right: .2rem;
      bottom: 2.0rem;
      // img{
      //   width: 100%;
      // }
    }
  }
  
}
</style>


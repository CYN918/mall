<template>
  <div class="shoppingCar-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toBackPre()" v-show="isDetail">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>购物车</p>
        </div>
        <div class="head-manager fr" @click="displayDelete" v-show="flagManager && shoppingCarListData.length > 0">
          管理
        </div>
        <div class="head-manager fr" @click="displayDelete" v-show="!flagManager && shoppingCarListData.length > 0">
          完成
        </div>
      </div>
    </div>
    <!-- 购物车列表 -->
    <div class="shopping-list">
        <ul class="list-ul" v-if="shoppingCarListData.length > 0">
          <li class="list-item" v-for="(item,index) in shoppingCarListData" @click="toDetail(item)">
            <div class="list-item-all">
                <img :src="item.isSelected == true ? item.iconRedSrc : item.iconGraySrc" alt="" class="radio fl" @click.stop="selectShop(item,index)" >
                <div class="cover-all fl">
                   <img :src="item.cover_img_url ? item.cover_img_url : './../assets/images/1.png'" alt="" class="cover-image">
                   <p class="putDown-shop" v-show="item.is_shelf == 0 || item.product_is_shelf > 0 ">该商品已下架</p>
                </div>
               
                <div :class="item.is_shelf == 2 ? 'item-instro fr' : 'item-instro no-shopStock fr'">
                  <div class="instro-head">
                    <span class="instro-head-title fl">
                      {{item.product_name}}
                    </span>
                    <img src="./../assets/images/edit@2x.png" alt="" class="head-img fr" @click.stop="showSelectShoppingCar(item.product_id,item.id,item.is_shelf,item.product_is_shelf)" v-show="item.product_is_shelf == 0">
                  </div>
                  <div class="insro-decri" style="-webkit-box-orient: vertical;box-orient: vertical">
                    {{item.attrbuteValue}}
                  </div>
                  <div class="instro-price-all">
                    <span class="instro-price fl"><span class="price-icon">&#165;</span>
                      <span>{{formatPrice(item.price,2)}}</span>&nbsp;
                    </span>
                    <span class="instro-count fr">&times;
                      <span>{{item.quantity}}</span>
                    </span>
                  </div>
                </div>
            </div>
          </li>
        </ul>
        <div class="no-shopping" v-else>
          <div class="no-shopping-img">
             <img src="./../assets/images/defaultpage_1@2x.png" alt="">
          </div>
         
          <p class="no-shopping-text">亲，您还未添加过商品</p>
          <div class="no-shopping-btn">
            <button @click="toPath('/')">先去逛逛</button>
          </div>
        </div>
    </div>
    <!-- 为你推荐 -->
    <div class="command">
      <div class="command-all">
        <div class="command-head">
          <span class="text">为你推荐</span>
          <div class="line">
            <img src="../assets/images/ic_xian@2x.png"/>
          </div>
        </div>
        <div class="list">
          <ul class="list-ul">
            <li class="list-item fl" v-for="(item,index) in shopCommandListData" @click="detailsPath('/detail',item.productId)">
              <div class="cover" :style="{background:'url('+item.coverImgUrl+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}"></div>
              <p class="list-item-title">
               {{item.productName}}
              </p>
               <span class="price">&#165;<span>&nbsp;{{formatPrice(item.price,2)}}</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 结算 -->
    <!-- <div class="purchase" :style="{bottom:$route.query.from == 'detail' ? '0' : '1rem'}" v-show="getCookie('godId') && shoppingCarListData.length > 0">
      <div class="check-all fl">
        <div @click="selectAll" class="check-img fl">
          <img :src="this.isSelected == true ? radioImg.iconRedSrc : radioImg.iconGraySrc" alt="" >全选
        </div>
        <div class="purchase-all fl" v-show="flagManager">
          <div class="purchase-count">合计
            <span>&#165;{{formatPrice(totalPrice,2)}}</span>
            <span class="price">&#165;<span>&nbsp;{{formatPrice(totalPrice,2)}}</span></span>
          </div>
          <div class="purchase-discount">
            <span>总额：&#165;10.00</span>
            <span>已减：&#165;10.00</span>
          </div>
        </div>
      </div>
      
      <div class="fr" v-show="flagManager">
        <button  class="purchase-btn" @click="toTianxieOrder">去结算
         <span v-show="isSelectShopCount">({{selectShopCount}})</span>
        </button>
      </div>
      <div class="fr" v-show="!flagManager">
        <button class="delete-btn" @click="deleteShoppingCar">删除</button>
      </div>
    </div> -->
    <!-- 结算 -->
    <div class="purchase" :style="{bottom:$route.query.from == 'detail' ? '0' : '1rem'}" v-show="getCookie('godId') && shoppingCarListData.length > 0">
      <div class="check-all fl" @click="selectAll">
        <img :src="this.isSelected == true ? radioImg.iconRedSrc : radioImg.iconGraySrc" alt="" >全选
      </div>
      <div class="purchase-all fr" v-show="flagManager">
        <span class="purchase-count fl">合计
          <!-- <span>&#165;{{formatPrice(totalPrice,2)}}</span> -->
          <span class="price">&#165;<span>&nbsp;{{formatPrice(totalPrice,2)}}</span></span>
        </span>
        <button class="purchase-btn fr" @click="toTianxieOrder">去结算
         <span v-show="isSelectShopCount">({{selectShopCount}})</span>
        </button>
      </div>
      <div class="fr" v-show="!flagManager">
        <button class="delete-btn" @click="deleteShoppingCar">删除</button>
      </div>
    </div>
    <!-- 底部 -->
    <Footer 
    :navindex="navindex" 
    :shoppingCarCount="shoppingCarCount"
    v-show="$route.query.from !== 'detail'"
    ></Footer>
    <!-- 选择商品弹出框 -->
    <mt-popup
      v-model="selectShopModel"
      position="bottom">
      <div class="select-shop-model">
        <div class="shop-model-detail">
          <div class="shop-list-all" >
            <div class="shop-list-item">
              <div class="cover-all-img">
                 <img :src="productList.imgUrl" alt="" class="cover-image">
              </div>
              <div class="item-instro">
                <div class="instro-price-all">
                  <span class="instro-price fl">
                    <span class="price-icon">&#165;</span>
                    <span>{{productList.isHaveShop == false ? formatPrice(productList.price,2) : '0.00'}}</span>
                  </span>
                  <span class="close fr" @click="selectShopModel = false">
                    <img src="./../assets/images/ic-close@2x.png" alt="">
                  </span>
                </div>
                <div class="clearfix"></div>
                <div class="insro-decri-all">
                  <div class="insro-decri fl">
                    <!-- {{selectSku.attr=="none"?productList.attr:selectSku.attr}} -->
                    {{productList.attr}}
                  </div>
                  <span class="instro-count fr">&times
                    <span>{{productList.quantity}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="shop-model-descri" ref="control">
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
              <button class="num-btn fl">{{productList.quantity}}</button>
              <button class="jia-btn fl" @click="countJia(productList)" :disabled="productList.countJiaDisabled">+</button>
            </div>
          </div>
        </div>
        <!-- 确定按钮 -->
        <div class="confirm">
          <button class="btn" @click="updateShoppingCar" v-bind:disabled="productList.isHaveShop">{{productList.confirmText}}</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import Footer from './common/footer.vue'
import { MessageBox,Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters([
    'shoppingCarCount',
   ]),
  data () {
    return {
          //列表基本数据
          selectSku:{attr:"none"},
          shoppingCarListData:[],//购物车数据1
          shopCommandListData:[],//为你推荐数据
          skuList:[],//自己循环得到的商品类型参数数据
          skuIndex:[],//自己循环得到的商品类型参数数据下标数据
          productList: {},//最终得到单个的商品数据
          productListAll:[],
          productData:{},
          newProductListAll:[],
          defaultProductAttrData:{},

          radioImg:{
            iconRedSrc:'./static/images/choose@2x.png',
            iconGraySrc:'./static/images/xuangray.png',
          },//radio入选框
          selectIds:[],//选中的商品id
          // 弹出框参数
          selectShopModel:false,
          flagManager:true,
          isSelected:false,
          //列表基本数据
          navindex:2,
          totalPrice:0,//总价
          quantity:1,//单个购物车数量
          selectShopCount:0,//选择的商品数量
          isSelectShopCount:false,//是否显示“去结算”后面的数量

          clickId:'',//商品ID
          clickProdAttr:'',//点击商品的属性
          clickProdQuantity:0,//点击商品的数量
          clickDefaultId:'',//点击初始ID
          shoppingCarId:'',//购物车ID
          shopStock:0,//商品库存
          isHaveShop:false,//是否存在可购买商品
          // clickToDetailId:localStorage.getItem('clickToDetailId') ? localStorage.getItem('clickToDetailId') : '',//点击到详情页去的ID
          countJianDisabled:false,//数量-是否禁用
          countJiaDisabled:false,//数量+是否禁用
          isDetail:false,//判断是否是从详情页面进入的购物车
    }
  },
  components:{
    Footer
  },
  methods:{
    toBackPre(){
      if(this.getCookie('typeIndex') == 5 || this.getCookie('typeIndex') == 2){
        this.toPath('/');
      }else{
        this.toBack();
      }
    },
    /**
     * [toDetail 跳转到商品详情]
     * @Author   罗文
     * @DateTime 2018-03-15
     * @return   {[type]}   [description]
     */
    toDetail(item) {
      if(item.is_shelf == 2 || item.product_is_shelf == 0){
        this.$router.push({
          path:'/detail',
          query:{
            id:item.product_id
          }
        })
      }else{
        MessageBox.alert('该商品已下架');
        return;
      }
    },
    //默认渲染弹出框规格属性
     innitTypeSelect(){
        var _defaultSku = this.productList.attr.split(",");

        for(var i=0; i<_defaultSku.length; i++){
          for(var j=0; j<this.skuList.length; j++){
            if(this.skuList[j].list.indexOf(_defaultSku[i])>=0){
              this.skuIndex[j] = this.skuList[j].list.indexOf(_defaultSku[i]);
            }
          }
        }
     },
     //点击显示弹出框
    showSelectShoppingCar(productId,id,isSelf,isProductSelf) {
      this.shoppingCarId = id;
      this.clickId = productId;
      // this.$set(this.productList,'attr','');
      // this.clickProdAttr = item.attrbuteValue;
      // this.clickProdQuantity = item.quantity;

      this.selectShopModel = !this.selectShopModel;

        // this.getShoppingCarList();
        //判断下架状态，渲染不同数据
        if(isSelf == 0 || isProductSelf > 0) {
          if(isProductSelf == 0){//部分下架
            this.clickGetShopAttribute((productList,productAttr) => {
              this.newProductListAll = productList;
              
              if(this.newProductListAll[0].stock != 0){//库存不为0的情况
                this.productList = this.newProductListAll[0];
                this.clickProdAttr = this.productList.attr;
                // console.log(this.clickProdAttr)
                this.clickProdQuantity = this.productList.quantity;
                this.defaultSkuid = this.productList.skuId;

                this.skuList = [];
                this.skuIndex = [];
                productAttr.forEach((item,index) => {
                  var newObj = {};
                  newObj.name = item.attributeName;
                  newObj.list = item.attr.split(",");
                  this.skuList.push(newObj);
                  this.innitTypeSelect();
                });
              }else{//库存为0的情况
                this.productList = this.newProductListAll[0];
                this.productList.isHaveShop = true;
                this.productList.confirmText = '库存不足';
                this.productList.quantity = 0;
                this.defaultSkuid = this.productList.skuId;

                this.skuList = [];
                this.skuIndex = [];
                productAttr.forEach((item,index) => {
                  var newObj = {};
                  newObj.name = item.attributeName;
                  newObj.list = item.attr.split(",");
                  this.skuList.push(newObj);
                  this.innitTypeSelect();
                });
              }
            });
          }else{//全部下架
            return;
          }
        } else {//全部没有下架
           this.clickGetShopAttribute((productList,productAttr) => {
              // console.log(productList,productAttr)
              this.newProductListAll = productList;
              this.newProductListAll.forEach((item,index) => {
              this.shoppingCarListData.forEach((citem,cindex) => {
                
                   var a_str = item.attr.split(",").sort().join();
                   var _item = citem.attrbuteValue.split(",").sort().join();
                  if(a_str == _item){
                    if(item.stock != 0){//库存不为0的情况
                      this.productList = item;
                      this.productData = citem;
                      this.clickProdAttr = this.productList.attr;
                      this.clickProdQuantity = citem.quantity;
                      this.quantity = citem.quantity;

                      this.productList.quantity = citem.quantity;
                      this.shopStock = this.productList.stock;
                      this.defaultSkuid = item.skuId;

                      this.skuList = [];
                      this.skuIndex = [];
                      productAttr.forEach((item,index) => {
                        var newObj = {};
                        newObj.name = item.attributeName;
                        newObj.list = item.attr.split(",");
                        this.skuList.push(newObj);
                        this.innitTypeSelect();
                      });
                      // this.defaultSkuid = item.defaultSkuid ? item.defaultSkuid : item.skuId;
                    }else{//库存为0的情况
                      this.productList = item;
                      this.productData = citem;
                      this.productList.quantity = 0;
                      this.productList.isHaveShop = true;
                      this.productList.confirmText = '库存不足';
                      this.defaultSkuid = item.skuId;

                      this.skuList = [];
                      this.skuIndex = [];
                      productAttr.forEach((item,index) => {
                        var newObj = {};
                        newObj.name = item.attributeName;
                        newObj.list = item.attr.split(",");
                        this.skuList.push(newObj);
                        this.innitTypeSelect();
                      });
                    }
                  }
              });
            });
           });
        }
    },
    //点击编辑按钮获得商品规格参数
    clickGetShopAttribute(callback){
      this.$http.post("/product/queryProductDefaultList",{
           params: { productId: this.clickId } 
          })
          .then(res => {
            //某个商品的类型数据
            this.defaultProductAttrData = res.data.object.attributeModeValList;
              

              //用点击的购物车数据匹配商品详情的数据
              var productListAll = res.data.object.productList;
              //给this.productListAll的每一项添加是否有匹配选项状态
              productListAll.forEach((item,index) => {
                item = Object.assign({},item,{
                  isHaveShop:false,
                  confirmText:'确定',
                  quantity:1,
                  countJianDisabled:false,
                  countJiaDisabled:false,
                });
                this.$set(productListAll,index,item);
              });
              // console.log(this.productListAll)
              this.newProductListAll = productListAll;
              callback(this.newProductListAll,this.defaultProductAttrData);
          });
    },
    //选择不同规格
    selectDesriCache(index,sindex){
      console.log('in')
      this.skuIndex[index] = sindex;
      // console.log(this.skuIndex);
      this.$set(this.skuIndex,index,sindex)
      this.getSelectedAttribute();
    },
    //得到选中的规格参数
    getSelectedAttribute(){
      //得到点击商品属性后的选择的商品属性
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
     var _citem = this.clickProdAttr.split(",").sort().join();//初始点击的Attr属性
     // console.log(a_str)
     this.selectSku.attr = a_str;
     //将点击得到的属性与获取的商品详情属性匹配
     this.newProductListAll.forEach((item,index)=>{
        var _item = item.attr.split(",").sort().join();
        if(item.stock != 0){//判断库存不为0的情况
            if(a_str == _item){
              item.isHaveShop = false;
              item.confirmText = '确定';
              this.defaultSkuid = item.skuId;
              item.quantity = 1;
              this.shopStock = item.stock;
              this.quantity = item.quantity;
              this.productList = item;
              if(_citem == _item){
                this.$set(this.productList,'quantity',this.clickProdQuantity);
              }
            }else{
              item.isHaveShop = true;
              item.confirmText = '库存不足';
              item.quantity = 0;
            }
        }else{//库存为0的情况
          item.isHaveShop = true;
          item.confirmText = '库存不足';
          item.quantity = 0;
        }
     });

     // this.productListAll.forEach((item,index)=>{
     //    if(item.productId == this.clickId && item.skuId == this.defaultSkuid){
     //      this.productList = item;
     //    }else{

     //    }
     // });

     
     // //每次选择会对之前点击的产品进行属性比较，如果一致则还原之前的数量
     //  let clickProdAttr = this.clickProdAttr.split(',');

     // //获取当前选中的字符串
     //  let activeProdAttr = a_str.split(',');
      
     //  //设置一个flag，循环选中项数组和当前项数组。只要有一个没匹配到，则返回true,全匹配到则返回false
     //  let flag = false;
     //  clickProdAttr.forEach((item,index)=>{
     //     let itemFlag = false;

     //     activeProdAttr.forEach((citem,cindex)=>{
     //        if(item === citem) itemFlag = true;
     //     })

     //     if(!itemFlag) {
     //        flag = true;   //当前这项没有匹配成功
     //     }
     //  })
      
     //  //当前匹配不完全一样
     //  if(flag) {
     //    return
     //     // this.$set(this.productList,'quantity',0);
     //  }else {
     //     //当前匹配完全一样，需要恢复之前选中的数量
     //     this.$set(this.productList,'quantity',this.clickProdQuantity);
     //  }
    },


    countJian(item){
      if(item.quantity > 1){
        this.productList.quantity -= 1;
        this.quantity = this.productList.quantity;
        // this.productList = item;
        item.countJianDisabled = false;
      }else{
        item.countJianDisabled = true;
      }
    },
    countJia(item){
      if(item.quantity < this.shopStock){

        this.productList.quantity += 1;
        this.quantity = this.productList.quantity;
        // this.productList = item;
        item.countJiaDisabled = false;
      }else{
        item.countJiaDisabled = true;
      }
    },
    //修改购物车
    updateShoppingCar(){
      //将匹配得到的商品详情ID与购物车ID匹配，改变购物车数据渲染页面
     this.shoppingCarListData.forEach((item,index) => {
          if(item.product_id == this.clickId){
             item.attrbuteValue = this.productList.attr;
             item.product_name = this.productList.productName;
             item.price = this.productList.price;
             item.investment = this.productList.price * this.productList.quantity;
             item.quantity = this.quantity;
             item.cover_img_url = this.productList.imgUrl;
          };
          this.$set(this.shoppingCarListData,index,item);
      });
      
      this.getDataChange();

      this.selectShopModel = false;
      this.updateShoppingCarMethods();
    },
    //修改购物车方法
    updateShoppingCarMethods(){
       var params = {
        params:{
         godId:this.getCookie('godId'),
         skuId:this.defaultSkuid,
         productId:this.clickId,
         quantity:this.quantity,
         id:this.shoppingCarId
        } 
      }
      this.getData('post','/shopping/update',params,(res) => {
        // console.log(res.data.object)
        if(res.data.resultdesc == '成功'){
          Toast({
            message: '修改成功',
            className:'toast-delete',
            duration: 1000
          });
          this.$store.dispatch('setShoppingCount',true);
          this.getShoppingCarList();
        }else{
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
    //全选
    selectAll(){
      if(this.isSelected){
        this.isSelected = false;
      }else{
        this.isSelected = true;
      }

      if(this.flagManager) {
         //如果当前是管理操作，全选操作会选中/取消 非下架的所有商品，并会操作本地记录
          let ids = [];
          this.shoppingCarListData.forEach((item,index)=>{
              if((this.isSelected && item.is_shelf == 2) || !this.isSelected) {
                 item['isSelected'] = this.isSelected;
              };
              
              if(this.isSelected && item.is_shelf == 2) {   //非下架商品才选入
                 ids.push(item.id);
              };
              this.$set(this.shoppingCarListData,index,item);
          });
          this.setCookie('shoppingCarSelectedList',ids);
          this.getDataChange();
      }else {
         //如果当前是删除操作，不区分是否上下架，都会被选中/取消，且不会操作本地记录
         this.selectIds = [];
         this.shoppingCarListData.forEach((item,index)=>{
            item.isSelected = this.isSelected;
            this.$set(this.shoppingCarListData,index,item);
            if(this.isSelected) {
              //如果是选中操作，则收集id
              this.selectIds.push(item.id);
            }
         });
      }
    },
     //选择商品购买
    selectShop(item,index){
      //每次点击时，如果这个商品没有下架，且当前是管理操作，要保存或移除这个商品的id，用来回显
      if(item.is_shelf == 2 && this.flagManager){
        if(item.isSelected){
          item.isSelected = false;
          let ids = this.getCookie('shoppingCarSelectedList').split(',');
          ids.splice(ids.indexOf(item.id + ''),1);
          this.setCookie('shoppingCarSelectedList',ids.join(','));
        }else{
          item.isSelected = true;
          if(this.getCookie('shoppingCarSelectedList')) {
            let ids = this.getCookie('shoppingCarSelectedList');
            this.setCookie('shoppingCarSelectedList',ids + ','+item.id);
          }else {
            this.setCookie('shoppingCarSelectedList',item.id);
          }
        }
        this.getDataChange();
      }else if(item.is_shelf == 2 && !this.flagManager){
        //如果此时商品没有下架，且当前是删除操作，则点击时要添加选中效果，但不记录，删除效果，也不记录
        item.isSelected = !item.isSelected;
      }else if(item.is_shelf == 0 && this.flagManager){
        MessageBox.alert('该商品已下架');
      }else if(item.is_shelf == 0 && !this.flagManager){
        //如果此时商品是已下架，且是删除操作，可以选中，但不记录
        item.isSelected = !item.isSelected;
      }
      this.$set(this.shoppingCarListData,index,item);

      
      //更新了列表的选中状态后，如果当前是在进行删除操作，就需要统计选中的id集合
      if(!this.flagManager) {
          this.selectIds = [];
          this.shoppingCarListData.forEach((citem,cindex)=>{
            if(citem.isSelected){
              this.selectIds.push(citem.id);
            }
          });
      }
    },
    /**
     * [数据更改后价格，数量等的改变计算方法]
     * @作者     王柳
     * @日期     2018-04-02
     * @return {[type]}   [description]
     */
    getDataChange(){
      var delObjectids = [];//选中的id集合
      var totalPrice = [];//选中商品的价格集合
      var selectShopCount = [];//选中商品的数集合
       this.shoppingCarListData.forEach((item,index)=>{
          if(item.isSelected){
            delObjectids.push(item.id);
            totalPrice.push(item.investment);
            selectShopCount.push(item.quantity);
          }else{
            this.totalPrice = 0;
            this.selectShopCount = 0;
          }
       });
       // var set = new Set(delObjectids);
       // this.selectIds = Array.from(set);
       this.selectIds = delObjectids;
        if(this.selectIds.length <= 0){
          this.isSelectShopCount = false;//是否显示“去结算”后面的数量
        }else{
          this.isSelectShopCount = true;
        };

       var a_totalPrice = 0;
       totalPrice.forEach((item,index) => {
          a_totalPrice += parseFloat(item);
       });
       this.totalPrice = a_totalPrice;
       // console.log(this.totalPrice)
       
       //点击得到选中的购物车数量
       var a_selectShopCount = 0;
       selectShopCount.forEach((item,index) => {
          a_selectShopCount += parseInt(item);
       });
       this.selectShopCount = a_selectShopCount;
    },
    // 点击显示删除功能
    displayDelete(){
      if(this.flagManager){
        this.flagManager = false;
      }else{
        this.flagManager = true;
      }
    },
    // 删除购物车
    deleteShoppingCar(){
      if(this.selectIds == ''){
        MessageBox.alert('请先选择删除商品！')
      }else{
        var selectIds = this.selectIds.join();
        var params = {
          params:{
            godId:this.getCookie('godId'),
            ids:selectIds
          } 
        }

        MessageBox.confirm('确认删除该商品吗?')
        .then(()=>{
            this.getData('post','/shopping/delete',params,(res) => {
              // console.log(res.data.object)
              if(res.data.resultdesc == '成功'){
                Toast({
                  message: '删除成功',
                  className:'toast-delete',
                  duration: 1000
                });

                //删除后重新保存需要回显的数据
                let shoppingCarSelectedList = this.getCookie('shoppingCarSelectedList').split(',');
                this.selectIds.forEach((item,index)=>{
                   shoppingCarSelectedList.forEach((citem,cindex)=>{
                      if(item == citem) {
                         shoppingCarSelectedList.splice(cindex,1);
                      }
                   })
                });
                this.setCookie('shoppingCarSelectedList',shoppingCarSelectedList.join(','));
                this.setCookie('selectShoppingCarIds',shoppingCarSelectedList.join(','));
                this.totalPrice = 0;
                this.selectShopCount = 0;
                this.isSelectShopCount = false;
                //删除完成后，回到操作界面，并更新数据
                this.flagManager = true;
                // this.isSelected = false;
                this.getShoppingCarList();
                // this.totalPrice = 0;
                // this.isSelectShopCount = false;
                this.$store.dispatch('setShoppingCount',true);
              }else{
                MessageBox.alert(res.data.resultdesc);
              }
            })
        });
      }
    },
    
    //获取购物车列表
    getShoppingCarList(){
      this.loading(true);
      var params = {
        params:{
          godId:this.getCookie('godId'),
        } 
      }
      this.getData('post','/shopping/list',params,(res) => {
        if(res.data.resultdesc == '成功'){
            this.loading(false);
            this.shoppingCarListData = res.data.object;

            //获取之前这个用户有没有选中购物车，如果有，则默认勾选这些
            let shoppingCarSelectedList = [];
            if(this.getCookie('shoppingCarSelectedList')) {
               shoppingCarSelectedList = this.getCookie('shoppingCarSelectedList').split(',');
            }else {
               shoppingCarSelectedList = [];
            }

            //将Cookie里获取的ID与购物车里的ID进行匹配，如果匹配到，就将checkBox选中
            this.shoppingCarListData.forEach((item,index) => {
                let isSelected = false;
                if(shoppingCarSelectedList.indexOf(item.id + '') !== -1  && item.is_shelf == 2){    
                   isSelected = true;
                }
                item = Object.assign({isSelected},item,this.radioImg);
                this.$set(this.shoppingCarListData,index,item);
            });
 
            if(shoppingCarSelectedList.length > 0) {
               this.$nextTick(function() {
                   this.getDataChange();
               });
            }

        }else{
          // MessageBox.alert(res.data.resultdesc);
        }
      });
    },
    //获取商品推荐列表
    getShopCommandList(){
      this.loading(true);
      this.$http.post("/product/queryProductTuiJianList", {
            
          })
      .then((res) => {
        // console.log(res)
        if (res.data.resultdesc == '成功') {
          this.loading(false);
          this.shopCommandListData = res.data.object.list;
          this.shopCommandListData.forEach((item,index) => {
            if(item.coverImgUrl == '' || item.coverImgUrl == null){
              item.coverImgUrl = './static/images/zhanweitu@2x.png';
            }
          });
        }
      })
    },
   
    toTianxieOrder(){
      if(this.selectIds.length <= 0 ) {
         MessageBox.alert('请先选择商品！');
         return;
      }else{
        this.setCookie("selectShoppingCarIds",this.selectIds.join());
        this.setCookie("typeIndex",2);
        this.$router.push({
          path:'/fillOrder'
        })
      }
    },
  },
  mounted(){
    this.setCookie("typeIndex",2);
    //判断是否是从详情页进入的购物车，如果是，则显示返回按钮，如果不是，则隐藏返回按钮
    if(this.$route.query.from == 'detail'){
      this.isDetail = true;
    }else{
      this.isDetail = false;
      document.getElementsByClassName('head-title')[0].style.marginLeft = .4 + 'rem';
    }

    if(this.getCookie('godId')){
      this.getShoppingCarList();
      this.$store.dispatch('setShoppingCount',true);
    }else{
      this.shoppingCarListData = [];
    };

    this.getShopCommandList();
  },

  watch:{
    //处理全选按钮
    'shoppingCarListData':{
        handler:function(newValue){

           //如果没有数据  
           if(newValue.length == 0) {
              this.isSelected = false;
              return;
           }
           
           this.isSelected = true;
           
           //既有上架的，也有下架的
           for(let i = 0 ; i < newValue.length ; i++) {
              //如果当前是管理操作，且当前商品没有被选中，且当前商品未下架，才会导致全选不勾选
              if(this.flagManager) {
                if(!newValue[i].isSelected && newValue[i].is_shelf == 2) {
                   this.isSelected = false;
                   break;
                }
              }else {
                //如果是在删除下，必须所有的商品全选或全取消才会改变全选按钮
                if(!newValue[i].isSelected) {
                   this.isSelected = false;
                   break;
                }
              }
              
           }

           //如果走到这里，还是全选中状态，需要做最后一次判断，看数据列表是否全是下架商品,如果全是下架商品，则取消全选
           if(this.isSelected) {
              let countLength = 0;
              for(let i = 0 ; i < newValue.length ; i++) { 
                 if(newValue[i].is_shelf !== 2) countLength++;
              }

              if(countLength === newValue.length) this.isSelected = false;
           }
        },
        deep:true,
    },
    //监听shopCount数量变化，+ - 号状态改变
    'productList.quantity':function(val,oldVal){
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
    

    'flagManager':function(nv) {
       //如果现在显示的是管理，需要清除已下架的资源的选择框
       if(nv) {
          //此时是从删除切换到管理操作，重新请求数据，渲染勾选状态
          this.getShoppingCarList();
       }else {
          //此时是删除，一切换过来就清除所有的选中状态
          this.shoppingCarListData.forEach((citem,cindex)=>{
              citem['isSelected'] = false;
              this.$set(this.shoppingCarListData,cindex,citem);
          });

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
    }
  }
}
</script>

<style lang="less" scoped>
.text-ess(@linenum) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @linenum;
  overflow: hidden;
}
.shoppingCar-main{
  padding-bottom: 2.0rem;
  .shopping-list{
    height: auto;
    width: 100%;
    padding-top: .88rem;
      .list-item{
        height: 2.22rem;
        /* line-height: 2.22rem; */
        padding: .22rem 0;
        border-bottom: .01rem solid #EEEFF3;
        .list-item-all{
          width: 7.08rem;
          margin: 0 auto;
        }
        .radio{
          height: .32rem;
          width: .32rem;
          margin-top: 1.11rem;
          margin-right: .14rem;
        }
      }
    .cover-all{
      height: 2.22rem;
      width: 2.22rem;
      position:relative;
      /* background-color: #f1f1f1; */
      .cover-image{
        height:2.06rem;
        width: 1.76rem;
        margin-top: .06rem;
        margin-left: .2rem;
      }
      .putDown-shop{
        position:absolute;
        left:0;
        bottom:0;
        width: 2.22rem;
        height:.4rem;
        line-height:.45rem;
        background-color:#ddd;
        font-size:.26rem;
        text-align:center;
        color:white;
      }
    }
    
    .item-instro{
      width: 4.2rem;
      padding: .12rem 0 0 0;
      .instro-head{
        height: .64rem;
        margin-bottom: .26rem;
        .instro-head-title{
          height: .64rem;
          width: 3.66rem;
          font-size: .26rem;
          .text-ess(2);
        }
        .head-img{
          height: .32rem;
          width: .28rem;
        }
      }
      .insro-decri{
          height: .64rem;
          color: #aeaead;
          font-size: .26rem;
          margin-bottom: .2rem;
          word-break: break-all;
          .text-ess(2);
        }
      .instro-price{
         color: #ff1051;
        .price-icon{
           font-size: .26rem;
          >span{
              font-size: .3rem;
          }
        }
      }
      .instro-count{
        font-size: .3rem;
      }
    }
    .no-shopStock{
      opacity: 0.6;
    }

    .no-shopping{
      height: 5.35rem;
      width: 100%;
      background-color: #fff;
      .no-shopping-img{
        width: 4.15rem;
        height: 2.46rem;
        margin: 0 0 .56rem 1.71rem;
        padding-top: .4rem;
      }
      .no-shopping-text{
        width: 2.6rem;
        margin: 0 auto;
        color: #333;
        font-size: .26rem;
      }
      .no-shopping-btn{
        width: 4.0rem;
        height: .72rem;
        margin: .48rem auto 0;
        button{
          width: 100%;
          height: 100%;
          color: white;
          background-color: #ff0f4f;
          border-radius: .36rem;
          font-size: .3rem;
        }
      }
    }
  }

  .command{
      height: auto;
      width: 100%;
      background-color: #f5f5f5;
      .command-all{
        /* width: 7.36rem; */
        width: 100%;
        margin: 0 auto;
        .command-head{
          border-top: .15rem solid #f5f5f5;
          height:0.8rem;
          line-height: 0.8rem;
          text-align: center;
          position: relative;
          background: #fff;
          border-bottom: .01rem solid #f5f5f5;
          .text{
            display: inline-block;
            padding:0 0.26rem;
            font-size: 0.26rem;
            color: #333;
            
            /* &:after {
              content: "";
              display: inline;
              position: absolute;
              left: 0;
              bottom: 0.4rem;
              width: 2.6rem;
              height: 0.04rem;
              background-color: #ddd;
            }
            &:before {
              content: "";
              display: inline;
              position: absolute;
              right: 0;
              bottom: 0.4rem;
              width: 2.6rem;
              height: 0.04rem;
              background-color: #ddd;
            } */
          }
          .line {
            position: absolute;
            z-index: 0;
            left: 0;
            top: 44%;
            transform: translateY(-50%);
            width: 100%;
            /* border: 0.01rem solid #dddddd; */
            img{
              width: 2.3rem;
              height: .07rem;
              margin: 0 auto;
            }
          }
        } 
      }
  }

  
.purchase{
    height: 1.0rem;
    line-height: 1.0rem;
    width: 100%;
    position: fixed;
    left: 0;
    // bottom: 1.0rem;
    background-color: white;
    border-top: .01rem solid #EEEFF3;
    border-bottom: .01rem solid #EEEFF3;
    .check-all{
        width: 1.1rem;
        margin-left: .2rem;
        font-size: .26rem;
        img{
          height: .32rem;
          width: .32rem;
          margin-right: .2rem;
          vertical-align: middle;
        }
    }
    .purchase-all{
      font-size: .26rem;
      color: #666;
      margin-right: .24rem;
      .purchase-count{
        .price{
          color: #ff1051;
          font-size: .24rem;
          span{
            font-size: .3rem;
         }
        } 
      }
      .purchase-btn{
          width: 2.2rem;
          height: .72rem;
          margin-top: .14rem;
          text-align: center;
          background-color: #ff1051;
          color: white;
          margin-left: .14rem;
          font-size: .3rem;
          border-radius: .36rem;
      }
    }
    .delete-btn{
      width:2.2rem;
      height:.72rem;
      background-color: #ff0f4f;
      /* box-shadow: 0 0 0 .01rem #ff1051; */
      border-radius:.36rem;
      font-size: .3rem;
      line-height:.3rem;
      color:#fff;
      margin-top:.14rem;
      margin-right:.24rem;
    }
  }

  // .purchase{
  //   height: 1.0rem;
  //   width: 100%;
  //   position: fixed;
  //   left: 0;
  //   background-color: white;
  //   border-top: .01rem solid #EEEFF3;
  //   border-bottom: .01rem solid #EEEFF3;
  //   .check-all{
  //       width: 4.78rem;
  //       margin-left: .2rem;
  //       font-size: .26rem;
  //       .check-img{
  //         width:1.1rem;
  //         height: 1.0rem;
  //         line-height:1.0rem;
  //         img{
  //            height: .32rem;
  //            width: .32rem;
  //            margin-right: .2rem;
  //            margin-bottom:.08rem;
  //            vertical-align: middle;
  //         }
  //       }
  //     .purchase-all{
  //       width: 3.48rem;
  //       font-size: .26rem;
  //       color: #666;
  //       margin-left:.2rem;
  //       margin-top:.2rem;
  //       .purchase-count{
  //         display: inline-block;
  //         .price{
  //           color: #ff1051;
  //           font-size: .24rem;
  //           span{
  //             font-size: .3rem;
  //          }
  //         } 
  //       }
  //       .purchase-discount{
  //         display: inline-block;
  //         font-size: .2rem;
  //       }
  //     }
  //   }
  //   .purchase-btn{
  //       width: 2.2rem;
  //       height: .72rem;
  //       margin-top: .14rem;
  //       text-align: center;
  //       background-color: #ff1051;
  //       color: white;
  //       font-size: .3rem;
  //       border-radius: .36rem;
  //       margin-right:.24rem;
  //   }
  //   .delete-btn{
  //     width:2.2rem;
  //     height:.72rem;
  //     background-color: #ff0f4f;
  //     /* box-shadow: 0 0 0 .01rem #ff1051; */
  //     border-radius:.36rem;
  //     font-size: .3rem;
  //     line-height:.3rem;
  //     color:#fff;
  //     margin-right:.24rem;
  //   }
  // }
}
</style>


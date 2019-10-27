<template>
  <div class="fill-order-main">
    <!-- 头部 -->
    <div class="fill-head">
      <div class="head-all">
        <div class="head-left fl" @click="toBackPre()">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>填写订单</p>
        </div>
      </div>
    </div>
		<!-- 选择地址 -->
		<div class="address">
			<div class="address-all" v-if="defalutAddress != ''" @click="toPath('/addressList')">
				<div class="address-left fl" >
					<div class="address-title">
						<p class="name fl">
							<span>{{defalutAddress.recipient?defalutAddress.recipient.length>7?defalutAddress.recipient.slice(0,7)+"...":defalutAddress.recipient:''}}</span>

							<span class="phone">{{defalutAddress.phone}}</span>
						</p>
						<button class="btn fl" v-show="defalutAddress.isDefault == 1">默认</button>
					</div>
					<div class="clearfix"></div>
					<div class="address-detail">
						<img src="./../assets/images/ic_positioning@2x.png"  alt="" >
						<p>{{addressAll ? addressAll.length > 23 ? addressAll.slice(0,23)+'...' : addressAll : ''}}</p>
					</div>
				</div>
        
				<div class="address-right fr" >
					<img src="./../assets/images/右箭头.png"  alt="" >
				</div>
			</div>
      <div class="address-all" v-else>
        <div class="fl">
          <div class="no-address" >
            <img src="./../assets/images/ic_positioning@2x.png"  alt="" class="position-img">
            <p class="no-address-text">收货地址还未设置</p>
          </div>
        </div>
        <div class="fr" @click="toAddAddress()">
          <button class="add-address-btn">添加收货地址</button>
        </div>
      </div>
			<div class="fengexian">
				<img src="./../assets/images/caitiao.png"  alt="">
			</div>
	 </div>
			<!-- 商品列表 -->
			<div class="shop-list" v-show="this.getCookie('typeIndex') == 1">
				<ul class="shop-list-ul">
					<li class="shop-list-all">
						<div class="shop-list-item">
							<div class="cover-all">
                 <img :src="orderDetailData.cover_img_url" alt="" class="cover-image">
              </div>
							<div class="item-instro">
                <div class="instro-head">
                  <span class="instro-head-title">
                  	{{orderDetailData.product_name}}
                  </span>
                </div>
                <div class="insro-decri-order" style="-webkit-box-orient: vertical;box-orient: vertical">
                  {{orderDetailData.attributeValue}}
                </div>
                <div class="clearfix">
                  
                </div>
                <div class="instro-price-all">
                  <span class="instro-price fl">
                    <span class="price-icon">&#165;</span>
                    <span>{{formatPrice(orderDetailData.price)}}</span>
                  </span>
                  <span class="instro-count fr">&times
											<span>{{orderDetailData.quantity}}</span>
                  </span>
                </div>
              </div>
						</div>
					</li>
				</ul>
			</div>
      <div class="shop-list" v-show="this.getCookie('typeIndex') == 2">
        <ul class="shop-list-ul">
          <li class="shop-list-all" v-for="(item,index) in shoppingCarData">
            <div class="shop-list-item">
              <div class="cover-all">
                 <img :src="item.cover_img_url" alt="" class="cover-image">
              </div>
              <div class="item-instro">
                <div class="instro-head">
                  <span class="instro-head-title">
                    {{item.product_name}}
                  </span>
                </div>
                <div class="insro-decri-order" style="-webkit-box-orient: vertical;box-orient: vertical">
                  {{item.attrbuteValue}}
                </div>
                <div class="clearfix">
                  
                </div>
                <div class="instro-price-all">
                  <span class="instro-price fillOrder fl">
                    <span class="price-icon">&#165;</span>
                    <span>{{formatPrice(item.price)}}</span>
                  </span>
                  <span class="instro-count fr">&times
                      <span>{{item.quantity}}</span>
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 优惠券 -->
      <!-- <div class="sale">
        <div class="sale-all" @click="saleShopModel = true">
          <div class="sale-descri fl">
            <span class="sale-descri-text">优惠券</span>
          </div>
          <div class="sale-img fr">
            <span>省10.00元</span>
            <img src="./../assets/images/右箭头.png"  alt="" >
          </div>
        </div>
      </div> -->
			<!-- 商品描述 -->
			<div class="shop-order-descri">
				<div class="order-descri-all">
					<!-- <p class="pay-methods" @click="selectShopModel = true">支付方式
            <span class="yinlian yinlian-pay fr">连连认证支付
                        {{payName}}
              <img src="./../assets/images/右箭头.png"  alt="" >
            </span>
          </p> -->
					<!-- <p class="pay-methods">发票类型
						<span class="yinlian fr">明细（纸质）-公司
							<img src="./../assets/images/右箭头.png"  alt="" >
						</span>
					</p>
					<p class="pay-methods">发票信息
						<input type="text" name="" placeholder="请输入公司名称">
					</p>
					<p class="pay-methods">
						<input type="text" name="" placeholder="请输入纳税人识别号" class="pay-methods-input">
					</p> -->
					<p class="pay-methods">商品金额
						<span class="yinlian fr">
              <span class="price-icon">&#165;</span>
							<span class="price-count">{{formatPrice(totalPrice,2)}}</span>
						</span>
					</p>
          <div class="clearfix"></div>
					<p class="pay-methods">运费
            <!-- （<span class="pay-weight">总重：0.87kg</span>） -->
						<span class="yinlian fr">
              <span class="price-icon">&#165;</span>
							<span class="price-count">0.00</span>
						</span>
					</p>
          <div class="clearfix"></div>
          <p class="pay-methods pay-methoda" v-if='state==1'>
            <span class="inte-to">使用积分<span class="pay-weight">(可用积分：{{Integral}})</span></span>
            <!-- <input v-if='Integral==0' type="number" placeholder="请输入使用的积分" readonly='readonly'> -->
            <input type="number" placeholder="请输入使用的积分" v-model="integral" @keyup="changeintegral()">
            <span class="yinlian fr">
              <span class="price-icon">&#165;</span>
							<span class="price-count" v-text="integral=='' || integral == 0 ? '0.00':'-'+formatPrice(integral*proportion,2)"></span>
            </span>
          </p>
          <!-- <p class="pay-methods">立减
            （<span class="pay-weight">总重：0.87kg</span>）
            <span class="yinlian fr">
              <span class="price-icon">&#165;</span>
              <span class="price-count">0.00</span>
            </span>
          </p>
          <div class="clearfix"></div>
          <p class="pay-methods">优惠券
            （<span class="pay-weight">总重：0.87kg</span>）
            <span class="yinlian fr">
              <span class="price-icon">&#165;</span>
              <span class="price-count">0.00</span>
            </span>
          </p>
          <div class="clearfix"></div> -->
          <div class="pay-methods-beizhu">
            <label>备注</label>
            <textarea placeholder="请输入需要备注的信息" oninput="if(value.length>50)value=value.slice(0,50);" @change="descriptionChange" v-model="description"></textarea>
          </div>
				</div>
			</div>
			<!-- 提交订单 -->
	    <div class="purchase" v-if="totalPrice <= 99999999">
	      <div class="check-all fl">
	        共<span>{{totalShopCount}}</span>件商品
	      </div>
	      <div class="purchase-all fr">
	        <span class="purchase-count fl">合计
	          <span style="font-size:0.32rem;">
              <span class="price-icon price-icon-detail">&#165;</span>
              <span>{{formatPrice(totalPrices,2)}}</span>
            </span>
	        </span>
	        <button class="purchase-btn fr" @click="toOrderPay">提交订单</button>
	      </div>
	    </div>

      <div class="purchase purchase-over-line" v-else>
        <div class="check-all fl">
          <p>共<span>{{totalShopCount}}</span>件商品，合计</p>
          <p class="purchase-over-line-price"><span style="font-size:0.3rem">&#165;</span>{{formatPrice(totalPrices,2)}}</span></p>
        </div>
        <button class="purchase-btn fr" @click="toOrderPay">提交订单</button>
      </div>
      
  </div>
</template>
<script>
import { MessageBox, Toast} from 'mint-ui';
export default {
  data () {
    return {
        selectedIds:[],//预览订单ID
        orderDetailData:{},//从详情页拿到的数据
        shoppingCarData:[],//从购物车拿到的数据
        totalShopCount:0,//总数量
        totalPrice:0,//总价
        totalPrices:0,//折后价
        defalutAddress:{},//默认地址
        integral:'', //输入积分
        Integral: 0,
        userId:this.getCookie('godId'),
        shopDetailsList:[],//商品列表,
        description:this.getCookie('description') ? this.getCookie('description') : '',//备注信息
        selectShopModel:false,

        isSelected:true,
        isIdNumber:this.getCookie("isIdNumber"),//是否实名认证
        status:this.getCookie("status"),
        companyName:'',//商家名称
        isSelectAddress:this.getCookie('addressId') ? this.getCookie('addressId') : '',//地址ID
        // defaultId:'',//默认地址Id
        addressAll:'',//拼接的地址
        addressId:'',//地址ID
        productId:this.getCookie('productId'),
        proportion: 1,
        state: 0
    }
  },
  methods:{
    //输入积分
    changeintegral(){
      this.integral = this.integral.replace(/[^\.\d]/g,'');
      this.integral = this.integral.replace('.','');
      if(this.integral>this.Integral){
        Toast('你只有'+this.Integral+'积分可以使用');
        this.integral = '';
        return;
      }
      if(this.integral*this.proportion>this.totalPrice){
        Toast('最多可以使用'+parseInt(this.totalPrice/this.proportion)+'积分');
        this.integral = '';
        return;
      }
      let price = this.totalPrice;
      this.totalPrices = price - (this.integral*this.proportion);
    },
    //获取积分
    getIntegral(){
      let godid = this.getCookie('godId');
      this.$http.get('/integral/getIntegral?godid='+godid).then(res => {
      //this.getData('get','/integral/getIntegral?godid='+godid,(res) => {
        let result = res.data.result;
        if(result == "000000") {
          this.Integral = res.data.object.integral.integralsum;
          this.proportion = res.data.object.integralSetupthes.proportion;
          this.state = res.data.object.integralSetupthes.state;
          this.setCookie('proportion',res.data.object.integralSetupthes.proportion);
        } else {
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
    //记录备注信息
    descriptionChange(){
      this.setCookie('description',this.description);
      // console.log(this.description)
    },
    toAddAddress(){
      if(this.volidRealName()){//是否实名认证
          if(this.status == 0 || this.status == undefined){//是否绑卡
            this.toPath('/bankCardBinding');
          }else {
            this.detailsPath('addAddress',this.userId);
          }
      }else{
        this.$router.push({
          path:'/realName'
        });
      }
    },
    //根据typeindex返回不同的页面
    toBackPre(){
      this.delCookie('addressId');
      this.delCookie('description');
      if(this.getCookie('typeIndex') == 1){
        this.detailsPath('/detail',this.productId);
        this.delCookie('defaultId');
      }else if(this.getCookie('typeIndex') == 2){
        this.toPath('/shoppingCar');
        this.delCookie('defaultId');
      };
    },
   
    //确定支付方式
    selectPayMethods(){
      if(this.payId == ''){
        MessageBox.alert('请选择支付方式');
      }else{
        this.selectShopModel = false;
      }
    },
    /**
     * [获取订单详情]
     * @作者     王柳
     * @日期     2018-03-15
     * @return {[type]}   [description]
     */
    getShoppingCarData(){
      this.loading(true);
       var params = {
        params:{
         ids: this.getCookie('selectShoppingCarIds').split(','),
         godId:this.getCookie('godId')
        } 
      }
      this.getData('post','/shopping/list',params,(res) => {
        this.loading(false);
        // console.log(res.data.object)
        if(res.data.resultdesc == '成功'){
          this.shoppingCarData = res.data.object;
          this.shoppingCarData.forEach((item,index) =>{
            this.totalShopCount += item.quantity;
            this.totalPrice += item.investment;
            this.totalPrices = this.totalPrice;
            // this.shoppingCarIds.push(item.id);

            var newObj = {};
            newObj.productName = item.product_name;
            newObj.skuId = item.sku_id;
            newObj.quantity = item.quantity;
            newObj.productId = item.product_id;
            newObj.imgUrl = item.cover_img_url;
            newObj.shoppingId = item.id;
            // console.log(newObj)
            this.shopDetailsList.push(newObj);
          });
        }else{
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
    getDetailData(){
      var params = {
          params:{
            skuId: this.getCookie('detailSkuId'),
            quantity:this.getCookie('quantity'),
            godId:this.getCookie('godId')
          } 
      }
      this.getData('post','/order/queryOrderPreview',params,(res) => {
          if(res.data.resultdesc == '成功'){
            this.orderDetailData = res.data.object;
            // console.log(this.orderDetailData)
            
            var newObj = {};
            newObj.productName = this.orderDetailData.product_name;
            newObj.skuId = this.orderDetailData.skuId;
            newObj.quantity = this.orderDetailData.quantity;
            newObj.productId = this.productId;
            newObj.imgUrl = this.orderDetailData.cover_img_url;
            // newObj.shoppingId = this.orderDetailData.id;
            // console.log(newObj)
            this.shopDetailsList.push(newObj);

            this.totalShopCount = this.orderDetailData.quantity;
            this.totalPrice = this.orderDetailData.price;
            this.totalPrices = this.totalPrice;
          }else{
            MessageBox.alert(res.data.resultdesc);
          }
      });
    },
    //查询默认地址
    checkDefaultAddress(){
      var params = {
        params:{
         godId: this.getCookie('godId')
        } 
      }
      this.getData('post','/userAddress/defalutAddress',params,(res) => {
        // console.log(res.data.object)
        if(res.data.resultdesc == '成功'){
          if(res.data.object == ''){
              this.defalutAddress = '';
          }else{
            this.defalutAddress = res.data.object;
            this.addressAll = this.defalutAddress.province+this.defalutAddress.city+this.defalutAddress.district+this.defalutAddress.address;
            this.addressId = res.data.object.id;
          }
        }else{
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
   //提交订单
   toOrderPay(){
      if(this.defalutAddress == ''){
        MessageBox.alert('请先添加收货地址');
      }else if(this.addressAll.length >= 200){
        MessageBox.alert('收货人地址不能超过200字');
      }else {
          if(this.shopDetailsList.length > 0){
             var params = {
                  params:{
                    description:this.description,
                    godId:this.getCookie('godId'),
                    fullname:this.defalutAddress.recipient,
                    phone:this.defalutAddress.phone,
                    addressId:this.addressId,
                    address:this.addressAll,
                    orderDetailsList:this.shopDetailsList,
                    channelcode:1,
                    integral: this.integral
                  } 
              }
            this.getData('post','/order/insert',params,(res) => {
              if(res.data.resultdesc == '成功'){
                this.orderId = res.data.object.id;
                this.setCookie('orderId',this.orderId);
                this.setCookie('companyName',res.data.object.company_name);
                this.setCookie('dealTime',res.data.object.createtime);
                this.setCookie('orderNumber',res.data.object.order_no);
                this.setCookie('addressId',res.data.object.addressId);
                this.setCookie('integral',this.integral*this.proportion);
                this.setCookie('totalPrice',res.data.object.totalamount);
                this.$router.push({
                    path:'/orderPay',
                    query:{
                      productId:this.productId
                    }
                });
                this.delCookie('description');
              }else{
                if(res.data.resultdesc == '0'){
                  MessageBox({
                      title: '实名认证提醒',
                      message: '你尚未完成实名认证，完成后才能下单哦！',
                      showCancelButton: true,
                      confirmButtonText: '去认证',
                      cancelButtonText:'取消',
                      callback:(action) => {
                        if(action == 'confirm'){
                          this.$router.push({
                            path:'/realName'
                          });
                        }else{
                          return;
                        }
                      }
                  })
                }else{
                  MessageBox.alert(res.data.resultdesc);
                }
              }
            });
          }else{
             MessageBox.alert('您未选择任何商品，不能提交');
          }
        }
    },
    //根据ID查询收货地址
    getIdAddress(){
      var params = {
        params:{
         id: this.isSelectAddress ? this.isSelectAddress : '',
         godId: this.getCookie('godId')
        } 
      }
      this.getData('post','/userAddress/queryById',params,(res) => {
        // console.log(res.data.object)
        if(res.data.resultdesc == '成功'){
          if(res.data.object == ''){
            this.defalutAddress = '';
          }else{
            this.defalutAddress = res.data.object;
            this.addressAll = this.defalutAddress.province+this.defalutAddress.city+this.defalutAddress.district+this.defalutAddress.address;
            this.addressId = res.data.object.id;
          }
        }else{
          MessageBox.alert(res.data.resultdesc);
        }
      });
    }
  },
  mounted(){
    // console.log(typeof(this.defalutAddress))
    console.log(this.isSelectAddress)
    this.setCookie('addressType',1);//从填写订单跳转到选择地址
    this.getIntegral();
    //根据不同的typeIndex获取不同的数据
    if(this.getCookie('typeIndex') == 1){
      this.getDetailData();
    }else if(this.getCookie('typeIndex') == 2){
      this.getShoppingCarData();
    };

    // this.checkDefaultAddress();
    //根据是否有点击数据，判断是否获取数据
    if(this.isSelectAddress != ''){
      this.getIdAddress();
    }else{
      this.checkDefaultAddress();
    }
  }
}
</script>

<style lang="less" scoped>
.fill-order-main{
  padding-bottom: 1.0rem;
	.fill-head {
    background-color: #fff !important;
   border-bottom: .01rem solid #EEEFF3;
    box-sizing: border-box;
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.24rem;
    text-align: center;
   position: fixed !important;
   top: 0 !important;
   left: 0 !important;
   z-index: 99;
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
        p {
          text-align: center;
        }
      }
      /* .head-client {
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
      } */
    }
  }

	.shop-list{
		height: auto;
		width: 100%;
		border-top: 0.15rem solid #f5f5f5;
    // border-bottom: 0.15rem solid #f1f1f1;
    
	}

	.shop-order-descri{
		height: auto;
		width: 100%;
		margin-bottom: 1.0rem;
		.order-descri-all{
			width: 7.08rem;
			margin: 0 auto;
      font-size: .28rem;
      .pay-methods.pay-methoda{
        height: 1.04rem;
        line-height: .74rem;
        input{
          text-align: left;
          color: green;
        }
        .inte-to{
          position: relative;
          margin-right: 0.2rem;
          .pay-weight{
            display: block;
            position: absolute;
            bottom:-0.46rem;
            left: 0;
            line-height: 0.4rem;
            width: 5rem;
            color: #ccc;
          }
        }
      }
			.pay-methods{
				height: .74rem;
				line-height: .74rem;
				border-bottom: .01rem solid #f5f5f5;
				.pay-weight{
					font-size: .24rem;
          color: #2a2a2a;
        }
        
				.pay-methods-input{
					text-indent: 1.2rem;
					width:100%;
				}
        .pay-methods-input-beizhu{
          width: 100%;
        }
				.yinlian{
          color: #aeaead;
					img{
						width: .15rem;
					  height: .28rem;
					  vertical-align: middle;
					  margin-left: .14rem;
					}
          .price-icon{
            font-size: .24rem;
          }
          .price-count{
            font-size: .32rem;
          }
					span{
						color: #ff1051;
          }
          
				}
      .yinlian-pay{
        color: #666;
      }
			}
      .pay-methods-beizhu{
        height: .74rem;
        line-height: .74rem;
        width: 100%;
        textarea{
          width: 100%;
        }
      }
		}
	}

.sale {
  height: 1rem;
  width: 100%;
  border-top: .08rem solid #f5f5f5;
  border-bottom: 0.15rem solid #f5f5f5;
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
      img{
        height: 0.28rem;
        width: 0.28rem;
        vertical-align: middle;
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
    bottom: 0;
    background-color: white;
    border-top: .01rem solid #f5f5f5;
    border-bottom: .01rem solid #f5f5f5;
    .check-all{
        margin-left: .2rem;
        margin-top: .04rem;
        font-size: .26rem;
        color: #aeaead;
        span{
        	color: #ff1051;
        }
    }
    .purchase-all{
      font-size: .26rem;
      color: #aeaead;
      .purchase-count{
        .price-icon-detail{
          font-size: .24rem;
        }
        >span{
          color: #ff1051;
        }
      }
      .purchase-btn{
          width: 2.1rem;
          height: .72rem;
          margin-top: .14rem;
          text-align: center;
          background-color: #ff1051;
          color: white;
          margin-left:.14rem;
          margin-right:.24rem;
          font-size: .3rem;
          border-radius: .36rem;
      }
      button[disabled="disabled"] {
        background: #aeaead;
      }
    }
  }


  .purchase-over-line {
     p {
      margin-top: 0.05rem;
      // height: 0.5rem;
      line-height: 0.4rem;

      
     }

     .purchase-over-line-price {
         margin-top: 0;
         color: #ff5349;
         font-size: .4rem;
      }
     .purchase-btn{
          width: 2.4rem;
          height: 1.0rem;
          line-height: 1.0rem;
          text-align: center;
          background-color: #ff5349;
          color: white;
          // margin-left: .14rem;
          font-size: .32rem;
      }
  }
}
</style>


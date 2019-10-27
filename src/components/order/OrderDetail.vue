<template>
  <div class="order-detail-main">
     <!-- 头部 -->
    <div class="order-head" style="background-color:#fff !important">
      <div class="head-all">
        <div class="head-left fl" @click="detailsPath('/orderIndex',id)">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>订单详情</p>
        </div>
      </div>
    </div>
    <!-- 地址 -->
		<div class="address">
			<div class="address-all">
				<div class="address-left">
					<div class="address-title">
						<p class="name fl">
							<span>{{orderDetailData.fullname?orderDetailData.fullname.length>7?orderDetailData.fullname.slice(0,7)+"...":orderDetailData.fullname:''}}</span>
							<span class="phone">{{orderDetailData.phone}}</span>
						</p>
						<button class="btn fl" v-show="orderDetailData.isDefault == 1">默认</button>
					</div>
					<div class="clearfix"></div>
					<div class="address-detail">
						<img src="./../../assets/images/ic_positioning@2x.png"  alt="" >
						<p>{{orderDetailData.address ? orderDetailData.address.length > 23 ? orderDetailData.address.slice(0,23)+'...' : orderDetailData.address : ''}}</p>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
			<div class="fengexian">
				<img src="./../../assets/images/caitiao.png"  alt="" >
			</div>
	 </div>
		<!-- 商品详情 -->
		<div class="order-shop-detail">
			<ul class="shop-list-all">
				<li class="shop-list-item" v-for="(item,index) in orderDetailData.detailsList">
					<div class="cover-all">
             <img :src="item.imgurl ? item.imgurl : './../../assets/images/1.png'" alt="" class="cover-image">
          </div>
					<div class="item-instro">
            <div class="instro-head">
              	{{item.productName}}
            </div>
            <div class="insro-decri-all">
            	<div class="insro-decri fl" style="-webkit-box-orient: vertical;box-orient: vertical">
		              {{item.attribute}}
	            </div>
	            <div class="fr">
	            	<button class="insro-decri-btn fr" v-show="orderDetailData.order_status == 0">待支付</button>
	              <button class="insro-decri-btn fr" v-show="orderDetailData.order_status == 2">待发货</button>
	              <button class="insro-decri-btn fr" v-show="orderDetailData.order_status == 3">已发货</button>
	              <button class="insro-decri-btn fr" v-show="orderDetailData.order_status == 4">已完成</button>
	              <button class="insro-decri-btn fr" v-show="orderDetailData.order_status == 5">已失效</button>
	            </div>
            </div>
            <div class="clearfix"></div>
            
            <div class="instro-price-all">
              <span class="instro-price fl">
              	<span class="price-icon">&#165;</span>
              	<span>{{formatPrice(item.price,2)}}</span>
              </span>
              <span class="instro-count fr">&times
                 <span>{{item.quantity}}</span>
              </span>
            </div>
          </div>
				</li>
			</ul>
			<div class="clearfix"></div>
			<div class="order-content-detail">
				<p>支付方式
					<span class="fr">支付宝支付
						<!-- {{orderDetailData.pay_channel == 'lianlian' ? '连连认证支付' : '微信支付'}} -->
					</span>
				</p>
				<p class="order-pay">订单总额
					<!-- <span class="fr"><span class="price-icon">&#165;</span>
						<span>{{formatPrice(orderDetailData.totalamount,2)}}</span>
					</span> -->
					<span class="price-span fr">
						<span class="price-icon">&#165;</span>
						<span>{{formatPrice(orderDetailData.totalamount,2)}}</span>
					</span>
				</p>
				<div class="clearfix" v-if='orderDetailData.jifenprize != "0.0" && orderDetailData.jifenprize!="" && orderDetailData.jifenprize!="null" && orderDetailData.jifenprize!= undefined'></div>
				<p class="order-pay" v-if='orderDetailData.jifenprize != "0.0" && orderDetailData.jifenprize!="" && orderDetailData.jifenprize!="null" && orderDetailData.jifenprize!= undefined'>积分抵扣
					<span class="price-span fr">
						<span class="price-icon">&#165;</span>
						<span>{{formatPrice(orderDetailData.jifenprize,2)}}</span>
					</span>
				</p>
				<div class="clearfix"></div>
				<p class="order-pay">商品优惠
					<span class="price-span fr">
						<span class="price-icon">&#165;</span>
						<span>0.00</span>
					</span>
				</p>
				<div class="clearfix"></div>
				<p class="order-pay">运费
					<!-- （<span class="pay-weight">总重：kg</span>） -->
					<span class="price-span fr">
						<span class="price-icon">&#165;</span>
						<span>0.00</span>
					</span>
				</p>
				<div class="clearfix"></div>
				<p class="fr">
					<span class="total-price-text">实付款&nbsp;</span>
					<span class="total-price fr">
						<span class="price-icon">&#165;</span>
						<span class="price-count">{{formatPrice(orderDetailData.totalamount,2)}}</span>
					</span>
				</p>
			</div>
		</div>
		<!-- 备注信息 -->
			<div class="clearfix"></div>
			<div class="order-remark-detail">
				<p class="order-num">订单编号：
					<span class="fr">{{orderDetailData.order_no}}</span>
				</p>
				<p class="order-num" v-show="orderDetailData.order_status == 3">快递单号：
					<span class="fr">
						<span class="fl">{{orderDetailData.logistics_order_no}}</span>
						<button class="insro-decri-btn fr">{{orderDetailData.logistics_name}}</button>
					</span>
				</p>
				<!-- <p v-show="orderDetailData.order_status == 2 || orderDetailData.order_status == 3 || orderDetailData.order_status == 4">支付时间：
					<span class="fr">{{orderDetailData.pay_time}}</span>
				</p> -->
				<p class="order-num" style="border-bottom:none">备注：
					<!-- <span class="fr">{{orderDetailData.description}}</span> -->
				</p>
				<p class="order-note">
					{{orderDetailData.description}}
				</p>
				<!-- <p class="order-pay">运费（<span class="pay-weight">总重：0.87kg</span>）
					<span class="fr"><span class="price-icon">&#165;</span>0.00</span>
				</p>
				<p class="fr">实付款&nbsp;
					<span class="total-price fr"><span class="price-icon">&#165;</span>5799.00</span>
				</p> -->
			</div>
			<!-- 支付按钮 -->
			<div class="confirm" v-show="orderDetailData.order_status == 0">
				<button class="btn" @click="toPay()">去支付</button>
			</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
         //列表基本数据
          orderDetailData:{},
          orderId:this.$route.query.id,//订单Id
          id:this.$route.query.indexId,//订单状态
    }
  },
  methods:{
  	getOrderDetail(){
  		this.loading(true);
  		var params = {
        params:{
         id:this.orderId,
         godId:this.getCookie('godId'),
        } 
      }
  		this.getData('post','/order/queryById',params,(res) => {
	        // console.log(res)
	        if(res.data.resultdesc == '成功'){
	        	this.loading(false);
	          this.orderDetailData = res.data.object;
        		this.totalPrice = res.data.object.totalamount;
            this.setCookie('companyName',res.data.object.company_name);
            this.setCookie('dealTime',res.data.object.createtime);
            this.setCookie('orderNumber',res.data.object.order_no);
						this.setCookie('totalPrice',res.data.object.totalamount);
						this.setCookie('integral',res.data.object.jifenprize);
	        }else{
	          MessageBox.alert(res.data.resultdesc);
	        }
      });
  	},
  	//去支付
  	toPay(){
  		this.setCookie('typeIndex',4);
  		this.$router.push({
  			path:'/orderPay',
  			query:{
  				id:this.orderId,
  				totalPrice:this.totalPrice
  			}
  		})
  	}
  },
  mounted(){
  	this.getOrderDetail();
  }
}
</script>

<style lang="less" scoped>
.order-detail-main{
	position: relative;
	padding-bottom: 1.0rem;
	.order-head {
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

	.order-shop-detail{
		height:auto;
		width:100%;
		border-top:.15rem solid #f1f1f1;
		border-bottom:.15rem solid #f1f1f1;
		.order-content-detail{
			height:3.86rem;
			width:7.08rem;
			margin:0 auto;
			font-size: .32rem;
			color: #333;
			p{
				height:.76rem;
				line-height:.76rem;
				.total-price-text{
					font-size: .26rem;
					color: #888;
				}
				.total-price{
					color:#ff1051;
					.price-icon{
						font-size: .24rem;
					}
					.price-count{
						font-size: .32rem;
					}
				}
			}
			.order-pay{
				border-bottom:.01rem solid #EEEFF3;
				.price-span{
					color:#333;
				}
				.price-icon{
					font-size: .22rem;
				}
			}
		}
	}

	.order-remark-detail{
		height:auto;
		width:7.08rem;
		margin:0 auto;
		font-size:.3rem;
		color: #333;
		padding-bottom:1.0rem;
		p{
			height:.76rem;
			line-height: .76rem;
		}
		.order-num{
			border-bottom:.01rem solid #EEEFF3;
			.insro-decri-btn{
	        height:.3rem;
	        border-radius:.1rem;
	        font-size: .22rem;
	        line-height:.3rem;
	        color:#ff1051;
	        margin-top:.23rem;
	        margin-left: .10rem;
	        box-shadow: 0 0 0 .01rem #ff1051;
	      }
		}

		.order-note {
			height: auto;
			line-height: 0.5rem;
		}
	}
}
</style>


<template>
  <div class="order-pay-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="backToPre()">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>订单支付</p>
        </div>
      </div>
    </div>
		<!-- 支付详情 -->
		<div class="pay-detail">
			<div class="pay-detail-all">
				<p class="pay-methods">订单金额
					<span class="yinlian fr"><span class="price-icon">&#165;</span>
						<span>{{formatPrice(totalPrice,2)}}</span>
					</span>
				</p>
				<p v-if='integral != "0.0" && integral != 0 && integral!="" && integral!=undefined && integral!="null"' class="pay-methods">积分抵扣
					<span class="yinlian fr"><span class="price-icon">&#165;</span>
						<span>{{formatPrice(integral,2)}}</span>
					</span>
				</p>
				<!-- <p class="pay-methods">商户名称
					<span class="fr">
						<span>{{companyName}}</span>
					</span>
				</p> -->
				<p class="pay-methods">订单编号
					<span class="fr">
						<span>{{orderNumber}}</span>
					</span>
				</p>
				<p class="pay-methods">交易时间
					<span class="fr">
						<span>{{dealTime}}</span>
					</span>
				</p>
			</div>
		</div>
		<!-- 支付方式 -->
		<div class="select-shop-model">
      <div class="shop-model-title">
        <p class="shop-model-text">支付方式</p>
      </div>
      <ul class="pay-methods-all">
        <li class="lianlian-pay" v-for="(item,index) in payMethods">
          <div class="pay-img fl">
            <img style="width:0.31rem" src="./../../assets/images/zfb.png" alt="">
          </div>
          <p class="pay-name fl">{{item.channelName}}</p>
          <div class="pay-radio fr" @click="changePayMethods(item,index)">
            <!-- <img :src="item.channelCode == payId ? item.iconRedSrc : item.iconGraySrc" alt=""> -->
						<img :src="item.iconRedSrc" alt="">
          </div>
        </li>
      </ul>
    </div>
		<!-- 银行 -->
		<!-- <div class="yinhang">
			<div class="yinhang-all">
				<div class="yinhang-name">
					<div class="yinhang-img fl">
						<img :src="bankLogo"  alt="" >
						<p>{{bankName}}</p>
					</div>
					<p class="yinhang-code fr">尾号
						<span>{{bankCode}}</span>
					</p>
				</div>
			</div>
		</div> -->
		<!-- 确认支付 -->
		<div class="confirm">
			<button class="btn" style="font-size:0.32rem" @click="codePrint()">确认支付</button>
		</div>
		<!-- 跳转from表单 -->
		<!-- <form id="myForm" :action="payUrl" type="post" style="display:none">
			<input type="text" :value="reqData" name="req_data">
		</form> -->
		
		<!-- 发送验证码弹出框 -->
		<!-- <mt-popup
		  v-model="displayFlag"
		  position="center" class="display-flag">
		  <div class="reflectTxt1">
		  	<div class="close-btn" @click="displayFlag = false">
	        <img src="./../../assets/images/ic-close@2x.png" alt="">
	      </div>
	      <div class="clearfix"></div>
				<h4>认证支付</h4>
				<p v-show="showCodeBtn" style="text-align:center">本次交易需要短信确认</p>
				<p v-show="!showCodeBtn">本次交易需要短信确认，验证码已发送至您的手机<label v-text="hidePhone(phone)"></label></p>
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<input type="text" maxlength="6" id="code" class="code" @keyup="codePrint" v-model="allCode"/>
			</div>
			<div class="rbtn">
				<button type="button" class="getCode" v-show="showCodeBtn"  @click="getCode()">{{confirmText}}</button>
    		<button type="button" class="getCode" v-show="!showCodeBtn">{{remainTime}} s</button> 
			</div>
		</mt-popup> -->
  </div>
</template>
<script>
import $ from 'jquery';
import { MessageBox } from 'mint-ui';
import bankList1 from '../../assets/js/bankList.js';
let Base64 = require('js-base64').Base64;
export default {
  data () {
    return {
         totalPrice:this.getCookie('totalPrice'),
         orderId:this.getCookie('orderId'),
         displayFlag:false,//弹出框显示
         testbuttonIsInit:true,
         productId:this.getCookie('productId'),
				 integral:this.getCookie('integral'),
         showCodeBtn:true,
         showSendTxt:true,
         remainTime:60,
				 timer:'',
         allCode:'',//输入的验证码
         phone:this.getCookie('phone'),
         bankAllCode:this.getCookie('fullBankcardNumber'),//银行卡号全部
         bankCode:'',//银行卡号
         // payUrl:'',//支付地址
         // reqData:'',//支付数据
         companyName:this.getCookie('companyName'),
         orderNumber:this.getCookie('orderNumber'),
         dealTime:this.getCookie('dealTime'),
         bankName:this.getCookie('bankName'),
         confirmText:'获取短信验证码',
         bankLogo:'',
         addressId:this.getCookie('addressId'),//收货地址ID
         status:this.getCookie("status"),

         payMethods:[],//支付方式
        payId:'lianlian',//支付方式ID
        payName:'',//支付名称

        radioImg:{
          iconRedSrc:'./static/images/choose@2x.png',
          iconGraySrc:'./static/images/xuangray.png',
          iconLianlianSrc:'./static/images/ic_lianlian@2x.png',
          iconWeixinSrc:'./static/images/ic_weixinzhifu@2x.png',
        },//radio入选框
    }
  },
  methods:{
  	/**
  	 * [获取支付方式]
  	 * @作者     王柳
  	 * @日期     2018-06-01
  	 * @return {[type]}   [description]
  	 */
    getPayMethods(){
    	this.loading(true);
      var params = {
        params:{
         godId:this.getCookie('godId')
        } 
      }
      this.getData('post','/order/findPayChannel',params,(res) => {
      	this.loading(false);
        // console.log(res.data.object)
        if(res.data.resultdesc == '成功'){
          var payMethods = [];
          payMethods = res.data.object;
          payMethods.forEach((item,index) => {
            item = Object.assign({},item,{
              isSelected:false
            },this.radioImg);
            this.$set(payMethods,index,item);
          });
          var havePayMethods = [];
          payMethods.forEach((item,index) => {
            if(item.wapOwner == true){
              havePayMethods.push(item);
            }
          });
          // console.log(havePayMethods)
          this.payMethods = havePayMethods;
          this.payName = this.payMethods[0].channelName;
          // console.log(this.payMethods)
        }else{
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
     //选择支付方式
    changePayMethods(item,index){
      // this.payMethods.forEach((citem,cindex) => {
      //   citem.isSelected = false;
      //   if(index == cindex){
      //     citem.isSelected = true;
          this.payId = item.channelCode;
      //   }
      // });
    },
  	//根据typeindex返回不同的页面
    backToPre(){
      if(this.getCookie('typeIndex') == 1){
      	MessageBox({
            title: '提示',
            message: '你的订单将在30分钟后取消确认离开',
            showCancelButton: true,
            confirmButtonText: '继续支付',
            cancelButtonText:'确认离开',
            callback:(action) => {
            	if(action == 'cancel'){
            		this.detailsPath('/detail',this.productId);
            	}else{
            		return;
            	}
            }
        })
      }else if(this.getCookie('typeIndex') == 2){
				MessageBox({
            title: '提示',
            message: '你的订单将在30分钟后取消确认离开',
            showCancelButton: true,
            confirmButtonText: '继续支付',
            cancelButtonText:'确认离开',
            callback:(action) => {
            	if(action == 'cancel'){
            		this.toPath('/shoppingCar');
            	}else{
            		return;
            	}
            }
        })
      }else if(this.getCookie('typeIndex') == 3){
      	MessageBox({
            title: '提示',
            message: '你的订单将在30分钟后取消确认离开',
            showCancelButton: true,
            confirmButtonText: '继续支付',
            cancelButtonText:'确认离开',
            callback:(action) => {
            	if(action == 'cancel'){
            		this.detailsPath('/orderIndex',this.getCookie('indexId'));
            	}else{
            		return;
            	}
            }
        })
      }else if(this.getCookie('typeIndex') == 4){
      	MessageBox({
            title: '提示',
            message: '你的订单将在30分钟后取消确认离开',
            showCancelButton: true,
            confirmButtonText: '继续支付',
            cancelButtonText:'确认离开',
            callback:(action) => {
            	if(action == 'cancel'){
            		this.detailsPath('/orderDetail',this.$route.query.id);
            	}else{
            		return;
            	}
            }
        })
      };
    },
  	//将支付返回结果转成json字符串
  	parseJson(param) {
			var obj = {};
			var keyvalue = [];
			var key = "",
				value = "";
			var paraString = param.split("&");
			for(var i in paraString) {
				keyvalue = paraString[i].split("=");
				key = keyvalue[0];
				value = keyvalue[1];
				obj[key] = value;
			}
			return obj;
		},
  	//显示输入的验证码
    codePrint(){
    	console.log(1)
    	// return;
   //  	var len = this.allCode.length;
   //  	var str = this.allCode;
			// for(var i=0; i<6; i++){
			// 	// console.log(str[i])
			// 	if(str[i]){
			// 		$(".reflectTxt1 li").eq(i).text(str[i]);
			// 	}else{
			// 		$(".reflectTxt1 li").eq(i).text("");
			// 	}

				// if(len == 6){
					var params = {
						params:{
							godId:this.getCookie('godId'),
							payType:5,
							orderId:this.orderId,
							addressId:this.addressId
						}
					};
					if(this.volidRealName()){//是否实名认证
	          if(this.status == 0 || this.status == undefined){//是否绑卡
	          	this.setCookie('bankCardType',1);//从支付页面跳转到绑卡
	            this.toPath('/bankCardBinding');
	          }else {
							this.getData('post','/mallPay/lianlian/wapPay',params,(res) => {
				        if(res.data.resultdesc == '成功'){
									window.location.href=res.data.object;
				          // var result = this.parseJson(res.data.object);
									// var payUrl = Base64.decode(result.payUrl);
									// var reqData = Base64.decode(result.reqData);
									// this.$store.dispatch('setPayData',{
									// 	payUrl,
									// 	reqData
									// });
									// this.toPath('/submitPay');
									// this.$nextTick(function() {
									// 	 document.getElementById('myForm').submit();
									// });
				        }else{
				          MessageBox.alert(res.data.resultdesc);
				        }
				      });
					 }
	      }else{
	      	this.setCookie('bankCardType',1);//从支付页面跳转到绑卡
          this.$router.push({
            path:'/realName'
          });
        }
    },
   
  	//定时器
    reduceTime(){
      if(this.remainTime < 1){
        this.remainTime = 0;
        this.showSendTxt = !this.showSendTxt;
				this.showCodeBtn = !this.showCodeBtn;
				this.confirmText = '重新获取';
        clearInterval(this.timer);
      }else{
        this.remainTime = this.remainTime -1;
      }
    },
  	//获取短信验证码
    // getCode(){
				// var params = {
				// 	phone:this.getCookie('phone')
				// };
				// this.$http.post('/user/randomVcode', {
				// 	params: params
				// }).then((res) => {
				// 	//结果
				// 	var result = res.data.result;
				// 	if(result == "000000") {
				// 		// MessageBox.confirm(res.data.object);
				// 		this.showSendTxt = !this.showSendTxt;
				// 		this.showCodeBtn = !this.showCodeBtn;
				// 		this.remainTime = 60;
				// 		this.timer = setInterval(this.reduceTime,1000);
				// 	} else {
				// 		MessageBox.confirm(res.data.resultdesc);
				// 	}
				// });
    // },
    
  },
  mounted(){
  	this.getPayMethods();

  	// this.bankCode = this.bankAllCode.slice(this.bankAllCode.length-4,this.bankAllCode.length);
  	
  	// bankList1.forEach((item,index)=>{
   //     if(item.bankname === this.getCookie('bankName')) {
   //        this.bankLogo = item.bankfullLogo;
   //     }
  	// })
  }
}
</script>

<style lang="less" scoped>
.order-pay-main{
	.pay-detail{
		// height: 3.36rem;
		overflow: hidden;
		width: 100%;
		padding-top: .88rem;
		padding-bottom: .48rem;
		border-top: .01rem solid #ddd;
		border-bottom: .15rem solid #f1f1f1;
		.pay-detail-all{
			width: 7.08rem;
			margin: 0 auto;
			padding-top: .38rem;
			padding-bottom: .48rem;
			height: 2.4rem;
			.pay-methods{
				height: .3rem;
				padding-bottom: .4rem;
				font-size: .3rem;
				.pay-weight{
					font-size: .2rem;
				}
				.yinlian{
					img{
						width: .2rem;
					  height: .3rem;
					  vertical-align: middle;
					  margin-left: .14rem;
					}
					span{
						color: #ff1051;
					}
				}
			}
		}
	}

	.yinhang{
		height: 1.8rem;
		width: 100%;
		font-size: .3rem;
		.yinhang-all{
			width: 7.08rem;
			margin: 0 auto;
			height: 1.24rem;
			padding-top: .3rem;
			padding-bottom: .2rem;
			/* border-bottom: .01rem solid #ddd; */
			.yinhang-name{
				height: .36rem;
				margin-bottom: .54rem;
				.yinhang-img{
					width: auto;
					img{
						width: auto;
						height: .5rem;
					}
					/* // p{
					// 	float: left;
					// } */
				}
				
			}
			.code{
				span{
					color: #ff5349;
				}
			}
		}
	}
	
	.display-flag{
		width: 5.6rem;
		height: 4.66rem;
		border-radius: .1rem;
		
		.reflectTxt1{
				.close-btn{
					width: .4rem;
					height: .4rem;
					float: right;
					margin-right: .15rem;
					margin-top: .15rem;
				}
			}
			.reflectTxt1 h4{
				padding:0 0 0.2rem;
				line-height: 0.5rem;
				font-size:0.36rem;
				font-weight:400;
				color:#333;
				text-align:center;
			}
			.reflectTxt1 p{
				width:5.12rem;
				margin-left: .24rem;
				font-size:.28rem;
				color:#666;
				line-height:.44rem;
				margin-bottom:.44rem;
			}
			.reflectTxt1 ul{
				display: flex;
				width:4.34rem;
				border:0.5px solid #cfcfcf;
				margin:0 auto;
			}
			.reflectTxt1 li{
				border-left:0.5px solid #cfcfcf;
				width:0.72rem;
				height:0.72rem;
				line-height:0.72rem;
				text-align:center;
				font-size:0.34rem;
				color:#222;
			}
			.reflectTxt1 li:first-child{
				border-left:none;
			}
			.reflectTxt1 input.code{
				position:absolute;
				left:50%;
				bottom:1.8rem;
				transform:translateX(-50%);
				width:4.34rem;
				height:0.72rem;
				line-height:.72rem;
				opacity: 0;
				border:0.5px solid #cfcfcf;
				color:#333333;
				font-size:.32rem;
				text-align: center;
				letter-spacing: .05rem;
			}
			.rbtn{
				text-align: center;
				padding:.44rem 0;
			}
			.getCode{
				width:3.4rem;
				height:0.68rem;
				box-sizing:border-box;
				background: #FF5349;
			    color: #ffffff;
			    line-height: .40rem;
			    font-size: .32rem;
			    border-radius: 0.32rem;
			    letter-spacing: 0.02rem;
			}
			.getCode[disabled='disabled']{
				background: #CCCCCC;
				color: #ffffff !important;
			}
			.close{
				position:absolute;
				bottom:-1.34rem;
				left:50%;
				transform:translateX(-50%);
				width:0.74rem;
				height:0.74rem;
				margin-top:0.6rem;
			}
			.close {
				display: inline-block;
	      position: absolute;
	      right:0;
	      top:0;
	      width: 0.8rem;
	      height: 0.8rem;
	      line-height: 0.8rem;
	      text-align: right;
	      img{
	        width:0.36rem;
	        height:auto;
	        vertical-align: middle;
	      }
	    }
	}
}
</style>


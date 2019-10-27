<template>
	<div class="index-main">
		<!-- 头部 -->
	    <div class="system-head">
	      <div class="head-all">
	        <div class="head-left fl" @click="toPath('/mine')">
	          <img src="./../../assets/images/右箭头.png"  alt="" >
	        </div>
	        <div class="head-title">
	          <p>系统设置</p>
	        </div>
	      </div>
	    </div>
	    
	    <!--系统设置-->
	    <div class="systemCon">
	    	<div class="systemTop">
	    		<div class="systemTopLt"><img src="../../../static/images/ic_head_moren@2x.png" /></div>
	    		<div class="systemTopRt">{{dealPhone(phone)}}</div>
	    	</div>
	    	<div class="systemList">
	    		<ul>
	    			<li>
	    				<a href="javascript:;" @click="accountLink">
		    				<label>账户信息</label>
		    				<span class="fr">{{bankInfo}}</span>
		    			</a>
	    			</li>
	    			<li>
	    				<a href="javascript:;" @click="addressLink">
	    					<label>收货地址</label>
	    					<span class="fr" v-show="!haveAddress">去设置</span>
	    					<span class="fr" v-show="haveAddress">已设置</span>
	    				</a>
	    			</li>
	    			<li><a  @click="toPath('/updatePass')"><label>登录密码</label><span class="fr">去修改</span></a></li>
	    			<li><a  @click="toPath('/problem')"><label>帮助中心</label><span class="fr"></span></a></li>
	    			<li><a  @click="toPath('/aboutUs')"><label>关于我们</label><span class="fr"></span></a></li>
	    		</ul>
	    	</div>
	    	<div class="systemBottom">
	    		<button class="login-out" @click="loginOut">退出登录</button>
	    	</div>
	    </div> 
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
    	godId:'',
    	phone:'',
    	status:'',
    	isIdNumber:'',//是否实名认证
    	haveAddress:'',//是否添加收货地址
    	bankInfo:'',
    	// godId:this.getCookie('godId'),
    	// phone:this.getCookie('phone'),
    	// status:this.getCookie('status'),
    	// isIdNumber:this.getCookie('isIdNumber'),//是否实名认证
    	// haveAddress:this.getCookie('isAddress') == 1 ? true : false,//是否添加收货地址
    }
  },
  methods:{
    accountLink(){
    	if(this.isIdNumber != 0 && this.isIdNumber != ""){
    		this.toPath('/bankCardBinding');
    		this.setCookie('bankCardType',2);//从填写订单跳转到绑卡
    		if(this.status != 0 && this.status != ""){
    			this.toPath('/accountInfo');
    			this.setCookie('bankCardType',2);//从填写订单跳转到绑卡
    		}
    	}else{
    		this.toPath('/realName');
    		this.setCookie('bankCardType',2);//从填写订单跳转到绑卡
    	}
    },
    addressLink(){
    	if(this.isIdNumber != 0 && this.isIdNumber != ""){
    		this.toPath('/bankCardBinding');
    		this.setCookie('bankCardType',2);//从填写订单跳转到绑卡
    		if(this.status != 0 && this.status != ""){
    			if(this.getCookie("isAddress") != 0){
		    		this.toPath('/addressList');
		    		this.setCookie('addressType',2);
		    	}else{
		    		this.toPath('/addAddress');
		    		this.setCookie('addressType',2);
		    	}
    		}
    	}else{
    		this.toPath('/realName');
    		this.setCookie('bankCardType',2);//从填写订单跳转到绑卡
    	}
    	// if(this.getCookie("isAddress") != 0){
    	// 	this.toPath('/addressList');
    	// 	this.setCookie('addressType',2);
    	// }else{
    	// 	this.toPath('/addAddress');
    	// 	this.setCookie('addressType',2);
    	// }
    },
    loginOut(){
    	var params = {
    		params:{
    			phone: this.phone,
				  godId: this.godId
    		}
			}
    	MessageBox.confirm("确认退出登录？")
    	.then(()=>{
    	  this.loading(true);
		   this.getData('post','/user/logout',params,(res) => {
		        if(res.data.result == '000000'){
		          var loginData = res.data.object;
		          //清除购物车数量
		          // this.$store.dispatch();
					/*存储cookie*/
					this.delCookie("godId");
					this.delCookie("token");
					this.delCookie("fullName");//是否绑定银行卡
					this.delCookie("phone");
					this.delCookie("isIdNumber");
					this.delCookie("idNumber");
					this.delCookie("fullIdNumber");
					this.delCookie("status");
					this.delCookie("bankcardNumber");
					this.delCookie("fullBankcardNumber");
					this.delCookie("bankName");
					this.delCookie("isAddress");
					this.delCookie("defaultId");
					this.delCookie("shoppingCarSelectedList");
					this.delCookie('typeIndex');
					this.delCookie('indexType');
					this.delCookie('addressType');
					this.delCookie('backCardType');
					this.delCookie('mineIndex');
					localStorage.removeItem('addressId');
					this.toPath('/');


					this.$store.dispatch('setShoppingCount',true);
	        }else{
	          MessageBox.alert(res.data.resultdesc);
	        }

	        this.loading(false);
	      });
    	});
    },

    /**
     * [setBankInfo 设置认证信息，如果认证了就显示银行信息，如果没认证则显示未认证]
     * @Author   王柳
     * @DateTime 2018-03-16
     */
    setBankInfo() {
       if(this.isIdNumber != 0 && this.isIdNumber != ""){
         this.haveInfo = false;
       	 this.bankInfo = '去绑卡';
       	  if(this.status != 0 && this.status != ""){
	    			//已经认证且绑卡过了
	       	 this.haveInfo = true;
	       	 this.bankInfo = this.getCookie("bankName") + ' 尾号' + this.getCookie("fullBankcardNumber").slice(-4);
    		  }
       }else{
       	 this.haveInfo = false;
       	 this.bankInfo = '去认证';
       }
    },

    //获取用户信息
		getUserMessage(){
			var params = {
        params:{
         godId:this.getCookie('godId'),
        } 
      }
			this.getData('post','/user/query',params,(res) => {
	        if(res.data.resultdesc == '成功'){
	        	this.isIdNumber = res.data.object.isIdNumber;
	        	this.godId = res.data.object.godId;
	        	this.phone = res.data.object.phone;
	        	this.status = res.data.object.status;
	        	this.haveAddress = res.data.object.isAddress == 1 ? true : false;
				  	//设置银行信息
				  	this.setBankInfo();
	        }else{
	          // MessageBox.alert(res.data.resultdesc);
	        }
      });
		}
  },
  mounted(){
  	this.getUserMessage();
  	
  }
}
</script>

<style lang="less" scoped>
.index-main{
	.system-head {
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
	.systemCon{
		margin-top: .88rem;
		background: #eeeff3;
		min-height:calc(100vh - 0.88rem);
		position: relative;
		.systemTop{
			margin-bottom: 0.14rem;
			background: #ffffff;
			padding:0.20rem 0.30rem;
			font-size:0;
			.systemTopLt{
				width:1.20rem;
				height:1.20rem;
				vertical-align: middle;
				display: inline-block;
			}
			.systemTopRt{
				line-height: 1.20rem;
				display: inline-block;
				width:calc(100% - 1.80rem);
				padding-left:0.20rem;
				font-size:0.30rem;
				color:#666666;
				vertical-align: middle;
			}
		}
		.systemList{
			background: #ffffff;
			ul{
				li{
					height:1rem;
					line-height: 1rem;
					padding:0 0.24rem;
					border-bottom:0.01rem solid #eeeff3;
					a{
						display: inline-block;
						width:100%;
						background:url(../../../static/images/箭头@2x.png) right center no-repeat;
						background-size:0.13rem 0.20rem;
						label{
							font-size: 0.30rem;
							color: #333333;
						}
						span{
							padding-right:0.26rem;
							font-size: 0.24rem;
							color: #AEAEAD;
						}	
					}
				}
			}
		}
		.systemBottom{
			width: 6.8rem;
	    background: #ff0f4f;
	    margin-left:.35rem;
	    border-radius: .44rem;
	    height: .88rem;
	    position: fixed;
	    left: 0;
	    bottom: .4rem;
	    z-index: 5;
	    button {
	      color: #ffffff;
	      font-size: 0.32rem;
	      line-height: .88rem;
	      width: 100%;
	      border-radius: .44rem;
	      text-align: center;
	      button[disabled="disabled"] {
	        background: #ffdddb;
	      }
	    }
		}
	}
}


</style>
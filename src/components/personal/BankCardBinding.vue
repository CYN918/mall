<template>
	<div class="index-main">
		<!-- 头部 -->
	    <div class="bank-head">
	      <div class="head-all">
	        <div class="head-left fl" @click="toBackBankCard()">
	          <img src="./../../assets/images/右箭头.png"  alt="" >
	        </div>
	        <div class="head-title">
	          <p>绑定银行卡</p>
	        </div>
	        <div class="head-manager fr">
	        	<a href="javascript:;" @click="toPath('/supportBank')">支持银行卡</a>
	        </div>
	      </div>
	    </div>
	    
	    <div class="clearfix"></div>
	    <div class="bankCardBind" :style="{height:(minHeight * 1.72 /100) +'rem'}">

	    	<div class="bankCardBindTop">
		    	<div class="infoText" v-show="!status">
	    			<p>请务必填写本人常用的银行卡</p>
	    		</div>
		    	<div class="infoGroup">
	    			<label>持卡人姓名</label>
	    			<div class="infoInput">
	    				<input type="text" v-model="name"  placeholder="请输入您的真实姓名" readonly="readonly"/>
	    			</div>
	    		</div>
	    		<div class="infoGroup">
	    			<label>身份证号码</label>
	    			<div class="infoInput">
	    				<input type="text" v-model="idCard" placeholder="请输入您的身份证号码" maxlength="18" readonly="readonly"/>
	    			</div>
	    		</div>
	    		<div class="infoGroup">
	    			<label>银行卡卡号</label>
	    			<div class="infoInput">
	    				<input type="number" v-model="bankCard" placeholder="请输入您本人的银行卡卡号" oninput="if(value.length>19)value=value.slice(0,19);" @focus="getFocus"/>
	    			</div>
	    		</div>
	    		<div class="infoGroup">
	    			<label>预留手机号</label>
	    			<div class="infoInput">
	    				<input  v-model="bankPhone" placeholder="请输入您预留的手机号" maxlength="11" oninput="if(value.length>11)value=value.slice(0,11)" readonly="readonly"/>
	    			</div>
	    		</div>
    		</div>
    		<div class="bankCardBindCenter" ref="codeInput">
    			<div class="infoCodeGroup">
	    			<label>验证码</label>
	    			<div class="infoCode">
	    				<input type="number" name="code" class="code" maxlength="6" v-model="code" placeholder="请输入验证码" oninput="if(value.length>6)value=value.slice(0,6)" @focus="getFocus"/>
	    			</div>
	    			<div class="infoCodeBtn">
	    				<button type="button" class="getCode" v-show="showCodeBtn" @click="getCode()">获取验证码</button>
						<button type="button" class="getCode" v-show="!showCodeBtn">{{TIME_COUNT}} s</button>
	    			</div>
	    		</div>
    		</div>
	    </div>
	    <div class="bankCardBindBottom">
  			<button @click="binkCard" v-bind:disabled="dis">提交认证</button>
  		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
    	phone:this.getCookie("phone"),
    	name:this.hideName(this.getCookie("fullName")),
    	idCard:this.getCookie("idNumber"),
    	fullIdNumber:this.getCookie("fullIdNumber"),
    	bankCard:"",
    	bankPhone:this.hidePhone(this.getCookie("phone")),
    	code: "",
    	//获取短信验证码
		showCodeBtn: true,
		TIME_COUNT:60,
		timer: null,
		status:this.getCookie("status") == 0 ? false : true,
		dis:true,

		minHeight:window.innerHeight,
    }
  },
  methods:{
  	//得到焦点的时候，页面重新滚动事件
  	getFocus(){
  		console.log(1)
  		// var target = this;
        setTimeout(() => {
            this.$refs.codeInput.scrollIntoView(true);
        },100);
  	},
	 //根据addressType的值，返回不同的页面
	toBackBankCard(){
		if(this.getCookie('bankCardType') == 1){
			this.toPath('/orderPay');
		}else{
			this.toPath('/systemSetting');
		}
	},
	//获取用户信息
	getUserMessage(){
		var params = {
			params:{
				godId:this.getCookie('godId'),
			}
		};
		this.getData('post','/user/query',params,(res) => {
        //结果
			// console.log(res)
			var result = res.data.result;
			if(result == "000000") {
				this.setCookie("status",1);
				this.setCookie("fullBankcardNumber",res.data.object.fullBankcardNumber);
				this.setCookie("bankName",res.data.object.bankName);
				this.setCookie("bankcardNumber",res.data.object.bankcardNumber);
			} else {
				MessageBox.alert(res.data.resultdesc);
			}
    });
	},
	/**
     * [倒计时]
     * @作者     王柳
     * @日期     2018-03-24
     * @return {[type]}   [description]
     */
    reduceTime(){
    	if(this.TIME_COUNT < 1){
    		this.showCodeBtn = true;
				clearInterval(this.timer);
				this.timer = null;
    	}else{
    		this.TIME_COUNT--;
    		this.showCodeBtn = false;
    	}
    },
	getCode() { //获取短信验证码
		this.loading(true);
		if(this.name == '' || this.bankPhone == ''){
			MessageBox.alert('请填入必要信息');
		}else if(this.bankCard == ''){
			MessageBox.alert('请输入银行卡');
		}else{
			var params = {
				phone:this.phone
			};
			this.$http.post('/user/randomVcode', {
				params: params
			}).then((res) => {
				//结果
				this.loading(false);
				var result = res.data.result;
				if(result == "000000") {
					  this.TIME_COUNT = 60;
						this.showCodeBtn = false;
						this.timer = setInterval(this.reduceTime,1000);
				} else {
					MessageBox.alert(res.data.resultdesc);
				}

			});
	 }
	},
	binkCard(){//绑卡
		if(this.isValidityCard(this.bankCard)){
			this.loading(true);
				var params = {
					params:{
						godId:this.getCookie('godId'),
						godName:this.getCookie("fullName"),
						godIdNo:this.getCookie("fullIdNumber"),
						phone:this.getCookie("phone"),
						bankCardNo:this.bankCard,
						vcode:this.code,
					}
				};
				// console.log(params)
				this.getData('post','/userBankcard/binding',params,(res) => {
		        // console.log(res)
		        this.loading(false);
		        if(res.data.result == '000000'){
		        	MessageBox.alert('实名认证成功！')
		        	.then(() => {
		        		  this.getUserMessage();
									this.toPath('/accountInfo');
									// if(this.getCookie('bankCardType') == 1){
						  	// 		this.toPath('/fillOrder');
						  	// 	}else{
						  	// 		this.toPath('/systemSetting');
						  	// 	}
		        	});
		        }else if(res.data.resultdesc == 'vcode不可为空'){
		          MessageBox.alert('验证码不能为空');
		        }else{
		        	MessageBox.alert(res.data.resultdesc);
		        }
	      });
		}
	},
	supportBank(){//支持银行卡
		this.$http.post('/bankLimit/query', {
			
		}).then((res) => {
			//结果
			var result = res.data.result;
			if(result == "000000") {
				
			} else {
				MessageBox.alert(res.data.resultdesc);
			}

		});
	}
	
  },
  mounted(){
  	this.getFocus();
  	console.log(this.minHeight)
  	// this.getUserMessage();
  },
  watch:{
  	bankCard: function(val) {
			if(val != "" && val.length >= 16) {
				this.dis = false;
			} else {
				this.dis = true;
			}
		}
  }
}
</script>

<style lang="less" scoped>
.bank-head {
  box-sizing: border-box;
  height: 0.88rem;
  line-height: 0.88rem;
  width: 100%;
  padding: 0 0.24rem;
  text-align: center;
 position: fixed !important;
 top: 0 !important;
 left: 0 !important;
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
      width: auto;
      overflow:hidden; 
      white-space: nowrap;
      text-overflow:ellipsis;
      word-break:break-all;
      p {
        text-align: center;
      }
    }
   .head-manager {
			width:auto;
			a{
				font-size: 0.26rem !important;
				color: #006DF0;
			}
		}
   
  }
}


.index-main{
	.bankCardBind{
		/* min-height: calc(100vh - 0.9rem); */
		background:#fff;
		padding-top: .88rem;
		.bankCardBindTop{
			p{
				font-size:0.26rem;
				color:#666666;
				padding:0.20rem 0.24rem;
			}
			.infoGroup{
				height:1rem;
				padding:0 0.24rem;
				background: #ffffff;
				border-bottom:0.01rem solid #EEEFF3;
				label{
					min-width:1.60rem;
					max-width:1.80rem;
					line-height: 1rem;
					padding-right:0.24rem;
					display: inline-block;
					vertical-align: middle;
					font-size:0.30rem;
					color:#333333;
				}
				.infoInput{
					display: inline-block;
					input{
						font-size:0.30rem;
						color:#666666;
	    				line-height: 1rem;
					}
				}
			}
			.infoText{
				height:.8rem;
				/* padding:0 0.24rem; */
				background: #EEEFF3;
				border-bottom:0.01rem solid #EEEFF3;
				font-size: 0.26rem;
				line-height: .5rem;
			}
		}
		.bankCardBindCenter{
			background: #FFFFFF;
			padding:0 0.24rem;
			border-top: 0.15rem solid #EEEFF3;
			.infoCodeGroup{
				label{
					max-width:1.80rem;
					line-height: 1rem;
					padding-right:0.24rem;
					display: inline-block;
					vertical-align: middle;
					font-size:0.30rem;
					color:#333333;
				}
				.infoCode{
					display: inline-block;
					input{
						font-size:0.30rem;
						color:#666666;
	    				line-height: 1rem;
	    				max-width: 3.00rem;
					}
				}
				.infoCodeBtn{
					display: inline-block;
					border-left:0.01rem solid #EEEFF3;
					button{
						font-size:0.30rem;
						color: #ff1051;
						padding-left:0.70rem;
						padding-right:0;
					}
				}
			}
		}
		
	}

	.bankCardBindBottom{
		width:100%;
		height: 1rem;
		/* position: relative;
		left:0;
		bottom:0;
		z-index:5; */
		button{
			width:100%;
			height:1rem;
			color:#ffffff;
			background:#ff1051;
			text-align: center;
			font-size:0.32rem;
		}
		button[disabled="disabled"] {
		   background: #ffdddb;
		}
	}
}
</style>
<template>
  <div class="index-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="backToLoginOrReg">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>注册</p>
        </div>
      </div>
    </div>
    <!--注册-->
    <!-- <div class="infoText">
  			<p>温馨提示：注册过华夏万家金服账户请直接登录，无需再注册</p>
  	</div> -->
    <div class="register-form" v-show="showCode">
    	<div class="form-group">
    		<label v-show="phone">手机号</label>
    		<div class="form-input">
    			<input type="number" name="user" class="user" v-model="phone" placeholder="请输入您的手机号码" maxlength="11"  oninput="this.value=this.value.replace(/[^0-9]+/,'');if(value.length>11)value=value.slice(0,11);"/>
    			<a v-show="phone" @click.stop="clearPhone()"><img src="../../../static/images/ic_Shut@2x.png" /></a>
    		</div>
    	</div>
    	<div class="form-group">
    		<label v-show="pass">密码设置</label>
    		<div class="form-input" v-show="showPass">
    			<input 
    			type="password" 
    			name="password" 
    			class="password"
    			ref="passInput"
    		    v-model="pass" 
    		    placeholder="8位及以上数字与字母组成" maxlength="16" 
    		    @focus="isShowEye()" 
    		    @blur="showEye = pass === '' ? false : true"
    		    oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"/>
    			<a @click.prevent="showPassEye()" v-show="showEye"><img src="../../../static/images/ic_eyes_no@2x.png" /></a>
    		</div>
    		<div class="form-input" v-show="!showPass">
    			<input 
    			type="text" 
    			name="password"  
    			class="password" 
    			ref="passInputText"
    			v-model="pass"  
    			placeholder="8位及以上数字与字母组成" maxlength="16" 
    			@focus="isShowEye()"
				@blur="showEye = pass === '' ? false : true"
    			oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
    			/>
    			<a @click.prevent="showPassEye()" v-show="showEye"><img src="../../../static/images/ic_eyes_yes@2x.png" /></a>
    		</div>
    	</div>
    	<!--<div class="form-group">
    		<div class="showUp">
    			<label>邀请人（选填）</label>
    			<img src="../../../static/images/ic_an@2x.png" v-show="!showInvite" class="down" @click="showInviter()" />
    			<img src="../../../static/images/ic_an@2x.png" v-show="showInvite" class="up" @click="showInviter()" />
    		</div>
    		<div class="form-input" v-show="showInvite">
    			<input type="text" name="user" class="user" v-model="inviter" placeholder="请输入您的邀请人"  />
    			<a href="javscript:;" v-show="inviter" @click="clearInviter()"><img src="../../../static/images/ic_Shut@2x.png" /></a>
    		</div>
    	</div>-->
    	<div class="form-group">
    		<div class="register-btn">
    			<button class="register" v-bind:disabled="dis" @click="showRegisterCode()">注册</button>
    		</div>
    		<div class="hasAccount">
    			已有账户？
    			<a href="javascript:;" @click="toPath('/login')">请登录</a>
    		</div>
    	</div>
    </div>
    
    <!--注册-短信-->
    <div class="register-form" v-show="!showCode">
    	<div class="regist-txt" v-show="!showSendTxt">验证码已发送至手机号<label v-text="dealPhone(phone)"></label>，请查收</div>
    	<div class="form-group">
    		<label v-show="code">验证码</label>
    		<div class="form-input">
    			<input type="number" name="code" class="code" maxlength="6" v-model="code" placeholder="手机验证码" oninput="if(value.length>6)value=value.slice(0,6);value=value.replace(/[^0-9]/g,'')"/>
    			<button type="button" class="getCode" v-show="showCodeBtn"  @click="getCode()">
    				{{hasGetCode ? '重新获取' :'获取验证码'}}
    			</button>
    			<button type="button" class="getCode" v-show="!showCodeBtn">{{TIME_COUNT}} s</button> 
    		</div>
    	</div>
    	<div class="form-group">
    		<div class="register-btn">
    			<button class="registerCode" v-bind:disabled="disCode" @click="register()">完成注册</button>
    		</div>
    		<div class="regist-agree" @click="toPath('/userAgreement')">完成注册即代表同意
    			<span style="cursor:pointer">《用户注册协议》</span>
    		</div>
    	</div>
    </div>
    
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import md5 from '../../../static/js/md5.min.js';
export default {
  data () {
    return {
        showPass:true,
        showCode:true,
        showSendTxt:true,
        showEye:false,
        phone:"",
        pass:"",
        code:"",
        dis:true,
        disCode: true,
		showCodeBtn: true,
		timer: null,
		hasGetCode:false,   //是否已经获取过验证码
		needGetCode:true,   //是否允许获取验证码  true - 允许  false - 不允许
		TIME_COUNT:60,
		timer:''
    }
  },
  watch:{
  	phone:function(val){
  		if(val != "" && this.pass != ""&& val.length == 11){
  			this.dis = false;
  		}else{
  			this.dis = true;
  		}
  	},
  	pass:function(val){
  		if(val != "" && this.phone != "" && val.length >7 && val.length<17){
  			this.dis = false;
  		}else{
  			this.dis = true;
  		}
  	},
  	code:function(val){
  		if(val != "" && val.length == 6){
  			this.disCode = false;
  		}else{
  			this.disCode = true;
  		}
  	}
  },
  methods:{
  	//得到焦点显示眼睛
		isShowEye(){
			// console.log(1)
			this.showEye = true;
		},
  	/**
  	 * [backToLoginOrReg 返回到上一页或者返回注册页，根据状态区分]
  	 * @Author   王柳
  	 * @DateTime 2018-03-15
  	 * @return   {[type]}   [description]
  	 */
  	backToLoginOrReg() {
       if(!this.showCode) {
          this.showCode = true;
       }else if(this.showCode){
       	  this.toPath('/login');
       }
  	},
    showPassEye(){
    	this.showPass = !this.showPass;
    	this.$nextTick(function() {
			if(!this.showPass) {
	          this.$refs.passInputText.focus()
	    	}else {
	    	  this.$refs.passInput.focus()
	    	}
		})
    	
    },
    /**
     * [验证手机号是否已经注册]
     * @作者     王柳
     * @日期     2018-03-27
     * @return {[type]}   [description]
     */
    checkPhoneRegister(){
  	  this.$http.post('/user/checkPhone', {
				params: {
					phone:this.phone
				}
			}).then((res) => {
			   //如果注册过了
         if(res.data.result === '000002') {
           MessageBox.alert(res.data.resultdesc);
         }else {
          //如果没有注册过
           this.showCode = !this.showCode;
         }
			});
    },
    showRegisterCode(){
    	if(this.validatePhone(this.phone)){
				if(this.validatePass(this.pass)){
					this.code = '';
		      this.checkPhoneRegister();
				}
			}
    },
    clearPhone(){
    	this.phone = "";
    },
    /**
     * [倒计时]
     * @作者     王柳
     * @日期     2018-03-24
     * @return {[type1]}   [description]
     */
    reduceTime(){
    	if(this.TIME_COUNT < 1){
    		this.showCodeBtn = true;
				clearInterval(this.timer);
				this.timer = null;
				this.hasGetCode = true;
				this.needGetCode = true;
				this.showSendTxt = !this.showSendTxt;
    	}else{
    		this.TIME_COUNT--;
    		this.showCodeBtn = false;
    	}
    },
    /**
     * [获取短信验证码]
     * @作者     王柳
     * @日期     2018-03-27
     * @return {[type]}   [description]
     */
    getCode(){
    	if(!this.needGetCode) return;

		this.loading(true);

		this.needGetCode = false;

		var params = {
			phone:this.phone
		};
		this.$http.post('/user/randomVcode', {
			params: params
		}).then((res) => {
			//结果
			var result = res.data.result;
			if(result == "000000") {
				this.TIME_COUNT = 60;
				this.showCodeBtn = false;
				this.timer = setInterval(this.reduceTime,1000);
				// MessageBox.alert(res.data.object);
				this.showSendTxt = !this.showSendTxt;
			} else {
				MessageBox.alert(res.data.resultdesc);
				this.needGetCode = true;
			}

			this.loading(false);
		});
    },
    /**
     * [注册]
     * @作者     王柳
     * @日期     2018-03-27
     * @return {[type]}   [description]
     */
    register(){
    	if(this.validateCode(this.code)){
    		 this.loading(true);
    		 var params = {
						phone: this.phone,
						passWord: md5(this.pass),
						vcode:this.code
					};
					this.$http.post('/user/register', {
						params: params
					}).then((res) => {
							var result = res.data.result;
							if(result == "000000"){
								var loginData = res.data.object;
								/*存储cookie*/
								this.setCookie("godId",loginData.godId);
								this.setCookie("token",loginData.token);
								this.setCookie("fullName",loginData.fullName);
								this.setCookie("phone",loginData.phone);
								this.setCookie("isIdNumber",loginData.isIdNumber);
								this.setCookie("idNumber",loginData.idNumber);
								this.setCookie("fullIdNumber",loginData.fullIdNumber);
								this.setCookie("status",loginData.status);//是否绑定银行卡
								this.setCookie("bankcardNumber",loginData.bankcardNumber);
								this.setCookie("fullBankcardNumber",loginData.fullBankcardNumber);
								this.setCookie("bankName",loginData.bankName);
								this.setCookie("isAddress",loginData.isAddress);
								MessageBox.alert("注册成功！").then(this.toPath('/mine'));
							}else{
								MessageBox.alert(res.data.resultdesc);
							}

							this.loading(false);
					});
    	}
    }
    
  },
  mounted(){
  	// if(this.getCookie('userAgreement') == 1){
  	// 	this.showCode = false;
  	// }
  }
}
</script>

<style lang="less" scoped>
.detail-head {
	height: .88rem;
	width: 100%;
	.head-all {
		margin: 0 auto;
		padding:0 0.20rem;
		.head-left {
			height: 0.88rem;
			width: 0.42rem;
			line-height:0.88rem;
			img {
				height:0.42rem;
				transform: rotate(180deg);
				vertical-align: middle;
			}
		}
		.head-title {
			line-height:.88rem;
			width: 5.6rem;
			text-align: center;
			p {
				text-align: center;
				font-size:0.38rem;
			}
		}
		.head-client {
			height: 0.42rem;
			width: 0.58rem;
			vertical-align: middle;
		}
		.head-manager {
			height: 0.88rem;
			line-height:0.88rem;
			width: 0.66rem;
			font-size:0.30rem;
		}
	}
}
.index-main{
	.infoText{
		height:.8rem;
		padding:.88rem .24rem 0 .24rem;
		background: #fff6f0;
		/* border-bottom:0.01rem solid #EEEFF3; */
		font-size: 0.26rem;
		line-height: .8rem;
	}
	.register-form{
		padding:.6rem 0.60rem .6rem .6rem;
		.regist-txt{
			font-size:0.26rem;
			color:#999999;
		}
		.form-group{
			padding-top:0.60rem;
			.form-input{
				position:relative;
				border-bottom:0.5px solid #d7d7d7;
				padding:0.16rem 0;
				input{
					width:100%;
					height:0.46rem;
					line-height:0.46rem;
					color:#333333;
					font-size:0.38rem;
				}
				a{
					display: inline-block;
					text-align: center;
					width:0.44rem;
					height:0.44rem;
					position: absolute;
					right:0;
					bottom:0.20rem;
				}
				.code{
					width:3.84rem;
				}
				.getCode{
					position: absolute;
					right:0;
					bottom:0.16rem;
					height:0.46rem;
					line-height:0.46rem;
					font-size: 0.30rem;
					color: #ff1051;
					border-left:.01rem solid #d7d7d7;
					padding-left:0.32rem;
					min-width: 2.20rem;
				}
			}
			label{
				font-size: 0.28rem;
				color: #AEAEAD;
			}
			.showUp{
				img{
					display: inline-block;
					text-align: center;
					width:0.32rem;
					height:0.32rem;
					vertical-align: middle;
				}
				.up{
					transform: rotate(180deg);
				}
				.down{
					transform: rotate(0deg);
				}
			}
			.register-btn{
				margin-top:0.30rem;
				button{
					background: #ff1051;
					border-radius: 1rem;
					width: 100%;
					height:0.88rem;
					text-align: center;
					font-size: 0.34rem;
					color: #FFFFFF;
				}
				button[disabled="disabled"]{
					background: #ffdddb;
				}
			}
			.regist-agree{
				font-size:0.26rem;
				color:#999999;
				text-align: center;
				padding:0.30rem;
				span{
					cursor: pointer;
					color: #ff1051;
				}
			}
			.hasAccount{
				font-size:0.26rem;
				color:#999999;
				text-align: center;
				padding:0.30rem;
				a{
					color:#ff1051;
				}
			}
		}
	}
}
</style>


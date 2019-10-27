<template>
	<div class="index-main">

		<!-- 头部 -->
		<div class="detail-head">
			<div class="head-all">
				<div class="head-left fl " @click="toBackPre()">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p v-show="showType">密码登录</p>
					<p v-show="!showType">快速登录</p>
				</div>
				<div class="head-manager fr" @click="toPath('/register')">
					<span>注册</span>
				</div>
			</div>
		</div>
		
		<!-- <div class="infoText">
  			<p>温馨提示：注册过华夏万家金服账户请直接登录，无需再注册</p>
  	</div> -->
		<!--login-form for pass-->
		<div class="login-form">
			<div class="form-group">
				<label v-show="phone">手机号</label>
				<div class="form-input">
					<input type="number" name="user" v-model="phone" placeholder="请输入手机号码" maxlength="11" oninput="this.value=this.value.replace(/[^0-9]+/,'');if(value.length>11)value=value.slice(0,11);"/>
					<a  v-show="phone" @click="clearPhone()"><img src="../../../static/images/ic_Shut@2x.png" /></a>
				</div>
			</div>
			<div class="form-group" v-show="showType">
				<label v-show="pass">密码</label>
				<div class="form-input" v-show="showPass">
					<input 
					type="password" 
					name="password" 
					ref="passInput"
					v-model="pass" 
					placeholder="请输入登录密码" maxlength="16" 
					@focus="isShowEye()" 
					@blur="showEye = pass === '' ? false : true"
					oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
					/>
					<a @click.prevent="showPassEye()"  v-show="showEye">
						<img src="../../../static/images/ic_eyes_no@2x.png" />
					</a>
				</div>

				<div class="form-input" v-show="!showPass">
					<input 
					type="text" 
					name="password"
					ref="passInputText" 
					v-model="pass" 
					placeholder="请输入登录密码" maxlength="16" 
					@focus="isShowEye()"
					@blur="showEye = pass === '' ? false : true"
					oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
					/>
					<a  @click.prevent="showPassEye()" v-show="showEye">
						<img src="../../../static/images/ic_eyes_yes@2x.png" />
					</a>
				</div>
			</div>
			<div class="form-group" v-show="!showType">
				<label v-show="code">验证码</label>
				<div class="form-input">
					<input type="text" name="code" class="code" maxlength="6" v-model="code" placeholder="短信验证码" />
					<button type="button" class="getCode" v-show="showCodeBtn" v-bind:disabled="disCode" @click="getCode()">{{hasGetCode ? '重新获取' :'获取验证码'}}</button>
					<button type="button" class="getCode" v-show="!showCodeBtn">{{TIME_COUNT}} s</button>
				</div>
			</div>
			<div class="form-group">
				<div class="login-btn">
					<button class="login" v-bind:disabled="dis" @click="loginIn()">登录</button>
				</div>
				<div class="login-link">
					<a  v-show="showType" @click="showLogin()">快速登录</a>
					<a  v-show="!showType" @click="showLogin()">密码登录</a>
					<a  @click="toPath('/forgetPass')">忘记密码？</a>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import { MessageBox , Indicator } from 'mint-ui';
import md5 from '../../../static/js/md5.min.js';
export default {
	data() {
		return {
			showType: true,
			showPass: true,
			showEye:false,
			//form数据
			phone: "",
			pass: "",
			code: "",
			//禁用按钮
			dis: true,
			//获取短信验证码
			disCode: true,
			showCodeBtn: true,
			timer: null,
			TIME_COUNT:60,
			hasGetCode:false,
			needGetCode:true,   //是否允许获取验证码  true - 允许  false - 不允许
		}
	},
	watch: {
		phone: function(val) {

			if((val != "" && this.pass != "") || (val != "" && this.code != "")) {
				this.dis = false;
			} else {
				this.dis = true;
			}

			if(val != "" && val.length == 11) {
				this.disCode = false;
			} else {
				this.disCode = true;
			}
		},
		pass: function(val) {
			if(val != "" && this.phone != "" && val.length >7 && val.length<17) {
				this.dis = false;
			} else {
				this.dis = true;
			}

			// if(val === '')  this.showEye = false;
		},
		code: function(val) {
			if(val != "" && this.phone != "") {
				this.dis = false;
			} else {
				this.dis = true;
			}
		}
	},
	mounted(){
		if(this.getCookie('godId') != ''){
			// this.loginOut();
		}
 	},
	methods: {
		toBackPre(){
			if(this.getCookie('typeIndex') == 1){
				this.toPath('/mine');
	      // this.detailsPath('/detail',this.getCookie('productId'));
	    }else if(this.getCookie('typeIndex') == 6){
	      this.toPath('/mine');
	    }else{
	    	this.toPath('/');
	    }
		},
		//得到焦点显示眼睛
		isShowEye(){
			// console.log(1)
			this.showEye = true;
		},
		showLogin() {
			this.showType = !this.showType;
		},
		showPassEye() {
			this.showPass = !this.showPass;
	    	this.$nextTick(function() {
	    		if(!this.showPass) {
		          this.$refs.passInputText.focus()
		    	}else {
		    	  this.$refs.passInput.focus()
		    	}
	    	})
		},
		clearPhone() {
			this.phone = "";
		},
		passwordInput(e) {
          if(/[^A-z0-9]/g.test(e.target.value)) {
          	e.preventDefault();
          }
		},/**
     * [倒计时]
     * @作者     王柳
     * @日期     2018-03-24
     * @return {[type]}   [description]
     */
    reduceTime(){
      if(this.TIME_COUNT < 1){
        this.showCodeBtn = true;
        clearInterval(this.timer);
        this.hasGetCode = true;
        this.needGetCode = true;
        this.timer = null;
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
	getCode() {

		var phoneReg = /^((13[0-9])|(14[0-9])|(15[0-3,5-9])|(166)|(17[2-9])|(18[0-9])|(19[8,9]))\d{8}$/;
       //如果不是手机号，返回原值
        if(this.phone == '') {
           MessageBox.alert('请输入手机号')
           return;
        }else if(!phoneReg.test(this.phone)) {
           MessageBox.alert('请输入正确的手机号')
           return;
        }


        if(!this.needGetCode) return;

		// this.loading(true);

		this.needGetCode = false;

        this.checkPhoneRegister();
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
							} else {
								MessageBox.alert(res.data.resultdesc);
								this.needGetCode = true;
							}

			        // this.loading(false);
						});
         }else {
          //如果没有注册过
           MessageBox.alert('该手机号未注册');
           this.needGetCode = true;
           // this.loading(false);
         }
      });
    },
    /**
     * [登录]
     * @作者     王柳
     * @日期     2018-03-27
     * @return {[type]}   [description]
     */
		loginIn() {
			var params = '';
			if(this.showType) {
				if(this.validatePhone(this.phone)){
					if(this.validatePass(this.pass)){
                        // this.loading(true);
						params = {
							phone: this.phone,
							passWord: md5(this.pass)
						};
						this.$http.post('/user/login', {
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
									this.setCookie("fullBankcardNumber",loginData.fullBankcardNumber);//银行卡号
									this.setCookie("bankName",loginData.bankName);//银行名字
									this.setCookie("isAddress",loginData.isAddress);
									if(this.getCookie('typeIndex') == 1){
							      this.detailsPath('/detail',this.getCookie('productId'));
							    }else if(this.getCookie('typeIndex') == 6){
							      this.toPath('/mine');
							    }else{
							    	this.toPath('/');
							    }
									
									// localStorage.removeItem('tokenid');
									localStorage.setItem('tokenid',loginData.token);
									localStorage.setItem('godId',loginData.godId);


									this.$store.dispatch('setShoppingCount',true);
								}else{
									MessageBox.alert(res.data.resultdesc);
								}

								// this.loading(false);
						});
					}
				}
			} else {
				if(this.validatePhone(this.phone)){
					if(this.validateCode(this.code)){
						// this.loading(true);
						params = {
							phone: this.phone,
							vcode: this.code
						};
						this.$http.post('/user/noPassWordLogin', {
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
									
									localStorage.setItem('tokenid',loginData.token);
									localStorage.setItem('godId',loginData.godId);
									if(this.getCookie('typeIndex') == 1){
							        this.detailsPath('/detail',this.getCookie('productId'));
							    }else if(this.getCookie('typeIndex') == 6){
							        this.toPath('/mine');
							    }else{
							    	this.toPath('/');
							    }


									this.$store.dispatch('setShoppingCount',true);
								}else{
									MessageBox.alert(res.data.resultdesc);
								}

								// this.loading(false);
						});


					}
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>

	.index-main {
		.infoText{
			height:.8rem;
			padding:.88rem .24rem 0 .24rem;
			background: #fff6f0;
			/* border-bottom:0.01rem solid #EEEFF3; */
			font-size: 0.26rem;
			line-height: .8rem;
		}
		.login-form {
			padding: 0.60rem;
			.form-group {
				padding-top: 0.60rem;
				.form-input {
					position: relative;
					border-bottom: 0.5px solid #d7d7d7;
					padding: 0.16rem 0;
					input {
						width: 100%;
						height: 0.46rem;
						line-height: 0.46rem;
						color: #333333;
						font-size: 0.38rem;
					}
					a {
						display: inline-block;
						text-align: center;
						width: 0.44rem;
						height: 0.44rem;
						position: absolute;
						right: 0;
						bottom: 0.20rem;
					}
					.code {
						width: 3.84rem;
					}
					.getCode {
						position: absolute;
						right: 0;
						bottom: 0.16rem;
						height: 0.46rem;
						line-height: 0.46rem;
						font-size: 0.30rem;
						color: #ff1051;
						border-left: .01rem solid #d7d7d7;
						padding-left: 0.32rem;
						min-width: 2.20rem;
					}
				}
				label {
					font-size: 0.28rem;
					color: #AEAEAD;
				}
				.login-btn {
					margin-top: 0.30rem;
					button {
						background: #ff1051;
						border-radius: 1rem;
						width: 100%;
						height: 0.88rem;
						text-align: center;
						font-size: 0.34rem;
						color: #FFFFFF;
					}
					button[disabled="disabled"] {
						background: #ffdddb;
					}
				}
				.login-link {
					padding: 0.28rem;
					text-align: center;
					font-size: 0;
					a {
						display: inline-block;
						padding: 0 0.40rem;
						line-height: 0.36rem;
						font-size: 0.30rem;
						color: #666666;
						border-right: 0.01rem solid #d7d7d7;
					}
					a:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>
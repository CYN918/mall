<template>
  <div class="index-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/login')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>找回密码</p>
        </div>
      </div>
    </div>
    <!--注册-->
    <div class="forgetPass-form">
    	<div class="forgetPass-txt" v-show="!showSendTxt">验证码已发送至手机号
        <label>{{dealPhone(phone)}}</label>，请查收
      </div>
    	<div class="form-group">
    		<label v-show="phone">手机号</label>
    		<div class="form-input">
    			<input type="text" name="user" class="user" v-model="phone" placeholder="请输入您的手机号码" maxlength="11"  oninput="this.value=this.value.replace(/[^0-9]+/,'');if(value.length>11)value=value.slice(0,11);"/>
    			<a v-show="phone" @click="clearPhone()"><img src="../../../static/images/ic_Shut@2x.png" /></a>
    		</div>
    	</div>
    	<div class="form-group" >
    		<label v-show="code">验证码</label>
    		<div class="form-input">
    			<input 
    			type="number" 
    			name="code" 
    			class="code" 
    			v-model="code" 
    			placeholder="短信验证码" 
    			oninput="if(value.length>6)value=value.slice(0,6)"
    			/>


    			<button 
    			type="button" 
    			class="getCode" 
    			v-show="showCodeBtn" 
    			@click="getCode()"
    			>
    			<!-- v-bind:disabled="dis"  -->

    			{{hasGetCode ? '重新获取' :'获取验证码'}}
    		  </button>
    			<button type="button" class="getCode" v-show="!showCodeBtn">{{TIME_COUNT}} s</button>
    		</div>
    	</div>
    	<div class="form-group">
    		<div class="forgetPass-btn">
    			<button v-bind:disabled="dis"  @click="forgetNext()">下一步</button>
    		</div>
    		<!-- <div class="hasAccount">
    			已有账户？
    			<a href="javascript:;" @click="toPath('/login')">请登录</a>
    		</div> -->
    	</div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
        showCode:true,
        showSendTxt:true,
        
        phone:"",
        code:"",
        
        dis:true,
        //短信验证码
        disCode:true,
        showCodeBtn:true,
        timer: null,
        hasGetCode:false,
        needGetCode:true,   //是否允许获取验证码  true - 允许  false - 不允许
        TIME_COUNT:60,
        timer:''
    }
  },
  watch:{
  	// phone:function(val){
  	// 	if(val != "" && val.length == 11){
  	// 		this.dis = false;
  	// 	}else{
  	// 		console.log(334);
  	// 		this.dis = true;
  	// 	}
  	// },
  	code:function(val){
  		if((val != "" && val.length == 6)&&(this.phone != "" && this.phone.length == 11)){
  			this.disCode = false;
  			this.dis = false;
  		}else{
  			console.log(33);
  			this.disCode = true;
  			this.dis = true;
  		}
  	}
  },
  methods:{
    showPassEye(){
    	this.showPass = !this.showPass;
    },
    showRegisterCode(){
    	this.showCode = !this.showCode;
    },
    clearPhone(){
    	this.phone = "";
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
        this.hasGetCode = true;
        this.needGetCode = true;
        this.showSendTxt = !this.showSendTxt;
      }else{
        this.TIME_COUNT--;
        this.showCodeBtn = false;
      }
    },
    getCode() { //获取短信验证码
    	// let phoneReg = /^1\d{10}$/g;
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

      this.loading(true);

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
            }
            this.$http.post('/user/randomVcode', {
              params: params
            }).then((res) => {
              //结果
              var result = res.data.result;
              if(result == "000000") {
                this.TIME_COUNT = 60;
                this.showCodeBtn = false;
                this.timer = setInterval(this.reduceTime,1000);
                this.showSendTxt = false;
                // MessageBox.alert(res.data.object);
              } else {
                this.needGetCode = true;
                MessageBox.alert(res.data.resultdesc);
              }

              this.loading(false);
            });
         }else {
          //如果没有注册过
           MessageBox.alert('该手机号未注册');
           this.needGetCode = true;
           this.loading(false);
         }
      });
    },
    forgetNext(){//下一步
      if(this.validatePhone(this.phone) && this.code) {
         this.$router.push({
        		path:'/resetPass',
        		query:{
        			phone:this.phone,
        			code:this.code
        		}
  	     });
      }
    }
    
  },


  mounted() {
  	if(this.$route.query.phone) {
  		this.phone = this.$route.query.phone;
  		this.code = this.$route.query.code;
  	}
  }
}
</script>

<style lang="less" scoped>
.index-main{
	.forgetPass-form{
		padding:1.48rem 0.60rem 0.60rem 0.60rem;
    /* padding:0.60rem; */
		.forgetPass-txt{
			font-size:0.26rem;
			color:#999999;
		}
		.form-group{
			padding-top:0.60rem;
			.form-input{
				position:relative;
				border-bottom:0.5px solid #EEEFF3;
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
			.forgetPass-btn{
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
			/* .hasAccount{
        font-size:0.26rem;
        color:#999999;
        text-align: center;
        padding:0.30rem;
        a{
          color:#ff1051;
        }
      } */
		}
	}
}
</style>


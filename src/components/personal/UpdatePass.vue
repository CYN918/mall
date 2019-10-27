<template>
  <div class="index-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/systemSetting')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>修改密码</p>
        </div>
      </div>
    </div>
    <!--注册1-->
    <div class="updatePass-form">
    	<div class="form-group">
    		<label v-show="oldPass">原登录密码</label>
    		<div class="form-input" v-show="showOldPass">
    			<input 
          type="password" 
          name="password" 
          class="password"
          ref="passInput"  
          v-model="oldPass" 
          placeholder="请输入旧密码" 
          @focus="showOldEye = true" 
          @blur="showOldEye = oldPass === '' ? false : true" 
          oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')" 
          maxlength="16"/>
    			<a  @click="showOldPassEye()" v-show="showOldEye">
            <img src="../../../static/images/ic_eyes_no@2x.png" />
          </a>
    		</div>
    		<div class="form-input" v-show="!showOldPass">
    			<input 
          type="text" 
          name="password"  
          class="password"
          ref="passInputText"  
          v-model="oldPass"  
          placeholder="请输入旧密码" 
          oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
          @focus="showOldEye = true" 
          @blur="showOldEye = oldPass === '' ? false : true" 
          maxlength="16"/>
    			<a  @click="showOldPassEye()" 
          v-show="showOldEye"
          >
            <img src="../../../static/images/ic_eyes_yes@2x.png" /></a>
    		</div>
    	</div>
    	<div class="form-group">
    		<label v-show="newPass">8位及以上新密码</label>
    		<div class="form-input" v-show="showNewPass">
    			<input 
          type="password" 
          name="password" 
          class="password" 
          ref="newPassInput"  
          v-model="newPass" 
          placeholder="8位及以上新密码" 
          oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
          @focus="showNewEye = true" 
          @blur="showNewEye = newPass === '' ? false : true" 
          maxlength="16"/>
    			<a  @click="showNewPassEye()" v-show="showNewEye">
            <img src="../../../static/images/ic_eyes_no@2x.png" />
          </a>
    		</div>
    		<div class="form-input" v-show="!showNewPass">
    			<input 
          type="text" 
          name="password"  
          class="password" 
          ref="newPassInputText"  
          v-model="newPass"  
          placeholder="8位及以上新密码" 
          oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')" 
          @focus="showNewEye = true" 
          @blur="showNewEye = newPass === '' ? false : true" 
          maxlength="16"/>
    			<a  @click="showNewPassEye()" v-show="showNewEye">
            <img src="../../../static/images/ic_eyes_yes@2x.png" />
          </a>
    		</div>
    	</div>
    	<div class="form-group">
    		<label v-show="rePass">重复新密码</label>
    		<div class="form-input" v-show="showRePass">
    			<input 
          type="password" 
          name="password" 
          class="password" 
          ref="rePassInput"  
          v-model="rePass" 
          placeholder="请再次输入新密码" 
          oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')" 
          @focus="showReEye = true" 
          @blur="showReEye = rePass === '' ? false : true" 
          maxlength="16"/>
    			<a  @click="showRePassEye()" v-show="showReEye">  <img src="../../../static/images/ic_eyes_no@2x.png" />
          </a>
    		</div>
    		<div class="form-input" v-show="!showRePass">
    			<input 
          type="text" 
          name="password"  
          class="password" 
          ref="rePassInputText"  
          v-model="rePass"  
          placeholder="请再次输入新密码" 
          oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')" 
          @focus="showReEye = true" 
          @blur="showReEye = rePass === '' ? false : true" 
          maxlength="16"
          />
    			<a  @click="showRePassEye()" v-show="showReEye">
            <img src="../../../static/images/ic_eyes_yes@2x.png" />
          </a>
    		</div>
    	</div>
    	<div class="form-group">
	    	<div class="updatePass-btn">
	    		<button v-bind:disabled="dis" @click="updatePass()">重设密码</button>
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
        showOldPass:true,
       	showNewPass:true,
       	showRePass:true,
       	oldPass:"",
       	newPass:"",
       	rePass:"",
       	dis:true,
        showOldEye:false,
        showNewEye:false,
        showReEye:false,
    }
  },
  watch:{
  	oldPass:function(val){
  		if(val != "" && this.newPass != "" && this.rePass !="" && val.length >7 && val.length<17){
  			this.dis = false;
  		}else{
  			this.dis = true;
  		}
  	},
  	newPass:function(val){
  		if(val != "" && this.rePass != ""&& this.oldPass !="" && val.length >7 && val.length<17){
  			this.dis = false;
  		}else{
  			this.dis = true;
  		}
  	},
  	rePass:function(val){
  		if(val != "" && this.oldPass != "" && this.newPass !="" && val.length >7 && val.length<17 ) {
  			this.dis = false;
  		}else{
  			this.dis = true;
  		}
  	}
  },
  methods:{
    //得到焦点显示眼睛
    isShowEye(){
      // console.log(1)
      this.showEye = true;
    },
    showOldPassEye(){
    	this.showOldPass = !this.showOldPass;

      this.$nextTick(function() {
        if(!this.showOldPass) {
            this.$refs.passInputText.focus()
        }else {
          this.$refs.passInput.focus()
        }
      })
    },
    showNewPassEye(){
    	this.showNewPass = !this.showNewPass;

      this.$nextTick(function() {
        if(!this.showNewPass) {
            this.$refs.newPassInputText.focus()
        }else {
          this.$refs.newPassInput.focus()
        }
      })
    },
    showRePassEye(){
    	this.showRePass = !this.showRePass;

      this.$nextTick(function() {
        if(!this.showRePass) {
            this.$refs.rePassInputText.focus()
        }else {
          this.$refs.rePassInput.focus()
        }
      })
    },
    updatePass(){
    	if(this.newPass != this.rePass){
  				MessageBox.alert("新密码不一致");
  		}else{
	  			var params = {
            params:{
              oldPassWord:md5(this.oldPass),
              newPassWord:md5(this.newPass),
              phone:this.getCookie("phone"),
              godId:this.getCookie('godId')
            }
					};
          this.getData('post','/user/changePassWord',params,(res) => {
            // console.log(res.data.object)
            if(res.data.resultdesc == '成功'){
              MessageBox.alert("修改密码成功");
              this.setCookie('token',res.data.object.token);
              this.toPath('/systemSetting');
            }else{
              MessageBox.alert(res.data.resultdesc);
            }
          });
  		}
    }
  }
}
</script>

<style lang="less" scoped>
.index-main{
	.updatePass-form{
		padding:.88rem 0.60rem 0.60rem;
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
			}
			label{
				font-size: 0.28rem;
				color: #AEAEAD;
			}
			.updatePass-btn{
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
		}
	}
}
</style>


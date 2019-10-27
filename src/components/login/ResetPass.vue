<template>
  <div class="index-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="backWithQuery()">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title fl">
          <p>重置密码</p>
        </div>
      </div>
    </div>
    <!--重置密码-->
    <div class="updatePass-form">
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
    			maxlength="18" 
    			@focus="showNewEye = true" 
    			@blur="showNewEye = newPass === '' ? false : true"
    			oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"/>
    			<a  @click.prevent="showNewPassEye()" v-show="showNewEye">
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
    			maxlength="18" 
    			oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
    			@focus="showNewEye = true"
				@blur="showNewEye = newPass === '' ? false : true"
    			/>
    			<a  @click.prevent="showNewPassEye()" v-show="showNewEye">
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
    			maxlength="18" 
    			@focus="showReEye = true"
				@blur="showReEye = rePass === '' ? false : true" 
    			oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
    			/>
    			<a  
    			@click.prevent="showRePassEye()" 
    			v-show="showReEye"
    			><img src="../../../static/images/ic_eyes_no@2x.png" 
    			/></a>
    		</div>
    		<div class="form-input" v-show="!showRePass">
    			<input 
    			type="text" 
    			name="password"  
    			class="password" 
    			ref="rePassInputText"
    			v-model="rePass"  
    			placeholder="请再次输入新密码" 
    			maxlength="18" 
    			oninput="this.value=this.value.replace(/[^A-z0-9]/gi,'')"
                @focus="showReEye = true"
				@blur="showReEye = rePass === '' ? false : true" 
    			/>
    			<a  
    			@click="showRePassEye()" 
    			v-show="showReEye"
    			>
    				<img src="../../../static/images/ic_eyes_yes@2x.png" />
    		    </a>
    		</div>
    	</div>
    	<div class="form-group">
	    	<div class="updatePass-btn">
	    		<button v-bind:disabled="dis" @click="resetPass()">重设密码</button>
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
       	showNewPass:true,
       	showRePass:true,
       	newPass:"",
       	rePass:"",
       	phone:this.$route.query.phone,
       	code:this.$route.query.code,
       	dis:true,
       	showNewEye:false,
       	showReEye:false,
    }
  },
  watch:{
  		newPass:function(val){
  		if(val != "" && this.rePass != "" && val.length >7 && val.length<17){
  			this.dis = false;
  		}else{
  			this.dis = true;
  		}
  	},
  	rePass:function(val){
  		if(val != "" && this.newPass != "" && val.length >7 && val.length<17){
  			this.dis = false;
  		}else{
  			this.dis = true;
  		}
  	},
  },
  methods:{
  	//得到焦点显示眼睛
  	
	isShowEye(type){
		this.showNewEye = true;
		this.showReEye = true;
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
    resetPass(){
    	if(this.newPass != this.rePass){
  				MessageBox.alert("密码不一致，请重新输入！");
  		}else{
	  			var params = {
							newPassWord:md5(this.newPass),
	        		phone:this.phone,
	        		vcode:this.code
					};
					this.$http.post('/user/resetPassWord', {
						params: params
					}).then((res) => {
						//结果
						var result = res.data.result;
						if(result == "000000") {
							MessageBox.alert("密码重置成功！").then(this.toPath('/login'));
						} else {
							MessageBox.alert(res.data.resultdesc);
						}
				});
  		}
    },
    
    /**
     * [backWithQuery 重置密码的返回，需要保持之前的输入信息]
     * @Author   王柳
     * @DateTime 2018-03-15
     * @return   {[type]}   [description]
     */
    backWithQuery() {
       this.$router.push({
       	  path:'/forgetPass',
       	  query:{
       	  	 phone:this.$route.query.phone,
    		     code:this.$route.query.code
       	  }
       })
    }
  },
  mounted(){
  	 
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
					background: #ff0f4f;
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


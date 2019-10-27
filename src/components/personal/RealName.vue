<template>
	<div class="index-main">
		<!-- 头部 -->
	    <div class="detail-head">
	      <div class="head-all">
	        <div class="head-left fl" @click="toBackBankCard()">
	          <img src="./../../assets/images/右箭头.png"  alt="" >
	        </div>
	        <div class="head-title">
	          <p>实名认证</p>
	        </div>
	      </div>
	    </div>
	    
	    <!--实名认证-->
	    <div class="realName">
	    	<p>请务必填写本人真实信息，开通成功后不可修改</p>
	    	<div class="infoGroup">
    			<label>持卡人姓名</label>
    			<div class="infoInput">
    				<input type="text" v-model="fullName" placeholder="请输入您的真实姓名"  />
    			</div>
    		</div>
    		<div class="infoGroup">
    			<label>身份证号码</label>
    			<div class="infoInput">
    				<input type="text" v-model="idNumber" placeholder="请输入您的身份证号" maxlength="18" />
    			</div>
    		</div>
    		
    		<div class="realNameBottom">
    			<button v-bind:disabled="dis" @click="realName()">提交认证</button>
    		</div>
	    </div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
    	godId:this.getCookie('godId'),
    	phone:this.getCookie('phone'),
    	fullName:"",
    	idNumber:"",
    	dis:false
    }
  },
  // watch:{
  // 	fullName:function(val){
  // 		if(val !="" ){
  // 			this.dis = false;
  // 		}else{
  // 			this.dis = true;
  // 		}
  // 	},
  // 	idNumber:function(val){
  // 		if(val != ""){
  // 			this.dis = false;
  // 		}else{
  // 			this.dis = true;
  // 		}
  // 	}
  // },
  methods:{
  	 //根据addressType的值，返回不同的页面
		toBackBankCard(){
			if(this.getCookie('bankCardType') == 1){
				this.toPath('/orderPay');
			}else{
				this.toPath('/systemSetting');
			}
		},
    realName(){
    	if(this.fullName != ""){
	    	if(this.idNumber != ""){
	    		if(this.valiteIdCard(this.idNumber)){
		    		if(this.isAge(this.idNumber)){
		    			this.loading(true);
		    		var params = {
		    				params:{
		    					fullName:this.fullName,
									phone:this.phone,
									godId:this.godId,
									idNumber:this.idNumber,
									token:this.getCookie('token')
		    				}
						};
						this.getData('post','/user/realNameAuth',params,(res) => {
				        // console.log(res)
				        this.loading(false);
				        if(res.data.resultdesc == '成功'){
				          this.setCookie("fullName",this.fullName);
									this.setCookie("idNumber",res.data.object.idNumber);
									this.setCookie("fullIdNumber",res.data.object.fullIdNumber);
									this.setCookie("isIdNumber",1);
									this.toPath('/bankCardBinding');
				        }else{
				          MessageBox.alert(res.data.resultdesc);
				        }
			      });
		    		}
		    	}
	    	}else{
	    		MessageBox.alert("身份证号不可为空！");
	    	}
    	}else{
    		MessageBox.alert("真实姓名不可为空！");
    	}
    }
  }
}
</script>

<style lang="less" scoped>
.index-main{
	.realName{
		padding-top:.88rem;
		min-height: calc(100vh - 0.9rem);
		background:#EEEFF3;
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
		.realNameBottom{
			width:100%;
			height: 1rem;
			position: fixed;
			left:0;
			bottom:0;
			z-index:5;
			button{
				width:100%;
				height:1rem;
				color:#ffffff;
				background:#FF1051;
				text-align: center;
				font-size:0.32rem;
				button[disabled="disabled"]{
					background: #ffdddb;
				} 
			}
		}
	}
}
</style>
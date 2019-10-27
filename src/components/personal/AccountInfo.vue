<template>
	<div class="index-main">
		<!-- 头部 -->
	    <div class="detail-head">
	      <div class="head-all">
	        <div class="head-left fl" @click="toBackBankCard()">
	          <img src="./../../assets/images/右箭头.png"  alt="" >
	        </div>
	        <div class="head-title">
	          <p>账户信息</p>
	        </div>
	        <!--<div class="head-manager fr">
	        	<a href="javascript:;">更改银行卡</a>
	        </div>-->
	      </div>
	    </div>
	    
	    <!--账户信息-->
	    <div class="infoCon">
	    	<div class="infoTop">
	    		<div class="infoText" v-show="!status">
	    			<p>请务必填写本人身份信息，开通成功后不可修改</p>
	    		</div>
	    		<div class="infoGroup">
	    			<label>持卡人姓名</label>
	    			<div class="infoInput">
	    				<input type="text" v-model="fullName" readonly="readonly" />
	    			</div>
	    		</div>
	    		<div class="infoGroup">
	    			<label>身份证号码</label>
	    			<div class="infoInput">
	    				<input type="text" v-model="idNumber" readonly="readonly" />
	    			</div>
	    		</div>
	    	</div>
	    	<div class="infoBottom" v-show="status">
	    		<div class="infoGroup">
	    			<label>银行卡卡号</label>
	    			<div class="infoInput">
	    				<input type="text" v-model="bankNumber" readonly="readonly" />
	    			</div>
	    		</div>
	    		<p>
	    		  <!-- <img :src="bankLogo"> -->
						<img src="./../../assets/images/yl.jpg" alt="">
	    		  {{bankName}}	
	    		</p>
	    	</div>
	    </div>
	    <!-- 添加银行卡 -->
      <div class="confirm" v-show="!status">
        <button class="btn" style="font-size:0.32rem" @click="toPath('/bankCardBinding')">提交认证</button>
      </div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';	
import bankList1 from '../../assets/js/bankList.js';
import $ from 'jquery';
export default {
  data () {
    return {
    	fullName:this.hideName(this.getCookie("fullName")),
    	idNumber:this.getCookie("idNumber"),
    	isIdNumber:this.getCookie("isIdNumber") == 1 ? true : false,
    	bankNumber:'',
    	bankName:'',
    	status:'',
    	bankLogo:'',
    }
  },
  methods:{
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
      }
			this.getData('post','/user/query',params,(res) => {
	        if(res.data.resultdesc == '成功'){
	        	this.bankNumber = res.data.object.bankcardNumber;
	        	this.bankName = res.data.object.bankName;
	        	this.status = res.data.object.status == 1 ? true : false;
	        	bankList1.forEach((item,index)=>{
				       if(item.bankname === this.bankName) {
				          this.bankLogo = item.bankName;
				       }
				  	});
	        }else{
	          MessageBox.alert(res.data.resultdesc);
	        }
      });
		}
  },
  mounted(){
  	this.getUserMessage();
  	this.pushHistory();
  }
}
</script>

<style lang="less" scoped>
.detail-head{
	border-bottom: 0.01rem solid #d7d7d7;
	.head-all{
		.head-manager{
			width:auto;
			a{
				font-size: 0.26rem;
				color: #006DF0;
			}
		}
	}
} 
.index-main{
	.infoCon{
		padding-top: .88rem;
		min-height:calc(100vh - 0.88rem);
		background:#fff;
		.infoTop{
			/* margin-bottom:0.16rem; */
		}
		.infoBottom{
			border-top:0.15rem solid #EEEFF3;
			padding-top: -.24rem;
			p{  
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding:0.14rem 0.24rem;
				font-size:0.24rem;
				color:#666666;
				height: 0.8rem;
				width: 100%;

				img {
					margin-right: 0.1rem; 
					width: 0.8rem;
					height: 0.8rem;
				}
			}
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
			padding:0 0.24rem;
			background: #EEEFF3;
			border-bottom:0.01rem solid #EEEFF3;
			font-size: 0.26rem;
			line-height: .8rem;
		}
	}
}
</style>
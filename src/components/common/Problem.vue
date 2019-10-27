<template>
	<div class="index-main">
		<!-- 头部 -->
		<div class="detail-head" v-show="deadshow">
			<div class="head-all">
				<div class="head-left fl" @click="toBack()">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>帮助中心</p>
				</div>
			</div>
		</div>
		
		<div class="problemList">
			<img src="./../../assets/images/1.png" alt="">
			<img src="./../../assets/images/2.png" alt="">
			<img src="./../../assets/images/3.png" alt="">
			<img src="./../../assets/images/4.png" alt="">
			<img src="./../../assets/images/5.png" alt="">
			<!-- <div class="problemGroup" v-show="problemShow0">
				<div class="problemTitle">
					<h4>【账户认证】绑定银行卡失败原因</h4>
				</div>
				<div class="problemCon">
					<p>1、检查填写卡号是否有误；</p >
					<p>2、必须绑定本人银行卡（银行信息必须与实名认证信息一致）；</p >
					<p>3、绑定银行卡必须是储蓄卡，暂不支持绑定信用卡，（只支持16位和19位的银行储蓄卡）；</p >
					<p>4、银行卡如长期未使用，可能会造成银行卡异常，建议与发卡行确认相关原因。</p >
				</div>
			</div>
			<div class="problemGroup" v-show="problemShow1">
				<div class="problemTitle">
					<h4>【资金】关于提现</h4>
				</div>
				<div class="problemCon">
					<p>1、平台提现最低限额为：余额大于等于50元；</p>
					<p>2、提现到账时间为T+0，若后续有变动，请关注我们“华夏万家金服”APP或者微信公众号最新通知；</p>
					<p>3、平台推广期间，提现手续费暂不收取，您提现产生的费用将由华夏万家平台垫付。</p>
				</div>
			</div>
			<div class="problemGroup" v-show="problemShow2">
				<div class="problemTitle">
					<h4>【投资】优惠券使用规则</h4>
				</div>
				<div class="problemCon">
					<p>1、加息券、现金券、投资券只适用于华夏万家金服U享计划项目，不适用于零钱罐；</p>
					<p>2、单笔投资时只能使用一张券；</p>
					<p>3、有效期限以券面标注时间为准；</p>
					<p>4、加息券、现金券、投资券不可同时使用。</p>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			deadshow:true,
			problemShow0:false,
			problemShow1:false,
			problemShow2:false
		}
	},
	methods:{
		initProblem(num){
			if(num == '0'){
				this.problemShow0 = !this.problemShow0;
			}else if(num == '1'){
				this.problemShow1 = !this.problemShow1;
			}else if(num == '2'){
				this.problemShow2 = !this.problemShow2;
			}else{
				this.problemShow0 = !this.problemShow0;
				this.problemShow1 = !this.problemShow1;
				this.problemShow2 = !this.problemShow2;
			}
		}
	},
  	mounted(){
  		this.initProblem(this.$route.query.id);

  		var u = navigator.userAgent;
  		// alert(u);
  		// getAppData();
  		// alert(JSON.stringify(getAppData()));
	    var isAndroid = u.indexOf('wanjiajinfu:android') > -1; //android终端
	    var isiOS = u.indexOf('wanjiajinfu:ios') > -1; //ios终端
	    
	    if(isiOS || isAndroid){
	    	this.deadshow = false;
	    	document.getElementsByClassName('problemList')[0].style.paddingTop = 0;
	    };
  	}
}
</script>


<style lang="less" scoped>
	.index-main{
		.problemList{
			overflow: hidden;
			padding-top:.88rem;
			img{
				vertical-align: middle;
			}
			.problemGroup{
				margin-bottom:0.20rem;
				.problemTitle{
					h4{
						font-size:0.40rem;
						color:#333333;
						font-weight: normal;
					}
				}
				.problemCon{
					p{
						font-size:0.30rem;
						color:#666666;
						line-height:0.42rem;
						padding-top:.30rem;
					}
				}
			}
		}
	}
</style>
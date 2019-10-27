<template>
	<div class="index-main">
		<!-- 头部 -->
		<div class="detail-head" v-show="deadshow">
			<div class="head-all">
				<div class="head-left fl" @click="toBack()">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>关于我们</p>
				</div>
			</div>
		</div>
		
		<div class="problemList">
			<img src="./../../assets/images/aboutus.png" alt="">
			<!-- <div class="problemGroup">
				<div class="problemCon">
					<p>新宝商城商城由深圳田港电子商务有限公司于2018年初启动，2018年3月26日正式上线，以智能设备为载体，提供场景式物联服务及内容服务的平台。新宝商城通过“场景化服务”为企业用户和个人用户提供综合的网上购物体验服务，倾力打造智享生活方式。</p>
					<p>新宝商城是一家通过大数据及和移动购物的电子商务平台，为用户提供高品质商品和服务，打造优质的场景化综合网上购物平台，涵盖手机数码、生活家居、超市、家用电器等品类。</p>
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
		}
	},
	methods:{
		// initProblem(num){
		// 	if(num == '0'){
		// 		this.problemShow0 = !this.problemShow0;
		// 	}else if(num == '1'){
		// 		this.problemShow1 = !this.problemShow1;
		// 	}else if(num == '2'){
		// 		this.problemShow2 = !this.problemShow2;
		// 	}else{
		// 		this.problemShow0 = !this.problemShow0;
		// 		this.problemShow1 = !this.problemShow1;
		// 		this.problemShow2 = !this.problemShow2;
		// 	}
		// }
	},
  	mounted(){
  		// this.initProblem(this.$route.query.id);
  		
  		var u = navigator.userAgent;
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
			/* padding:1.28rem .4rem .4rem .4rem; */
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
						text-indent: .6rem;
						font-size:0.28rem;
						color:#666666;
						line-height:0.42rem;
						padding-top:.30rem;
					}
				}
			}
		}
	}
</style>
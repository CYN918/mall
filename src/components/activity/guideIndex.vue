<template>
	<div class="guide-index">
		<!-- 头部 -->
		<div class="detail-head" v-show="deadshow">
			<div class="head-all">
				<div class="head-left fl" @click="toPath('/')">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>全球购购物攻略</p>
				</div>
			</div>
		</div>
		<!-- 内容 -->
		<div class="activity-content">
			<ul class="activity-ul">
				<li class="activity-li" v-for="(item,index) in listDataOne">
					<img :src="item.src" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			deadshow:true,
			listDataOne:[{
				src:'./static/activityImgs/guide1.png'
			},{
				src:'./static/activityImgs/guide2.png'
			},{
				src:'./static/activityImgs/guide3.png'
			},{
				src:'./static/activityImgs/guide4.png'
			},{
				src:'./static/activityImgs/guide5.png'
			},{
				src:'./static/activityImgs/guide6.png'
			}]
		}
	},
	methods:{
		

	},
  	mounted(){
  		this.getAppType((type) => {
				if(type == 'isiOS' || type == 'isAndroid'){
					this.deadshow = false;
	    	  document.getElementsByClassName('activity-content')[0].style.paddingTop = 0;
				}
			});
  	}
}
</script>


<style lang="less" scoped>
.guide-index{
	.activity-content{
		padding-top: .88rem;
		text-align: center;
		width:100%;
		height: auto;
		.activity-ul{
			width:100%;
			height: auto;
			.activity-li{
				width:100%;
			  img{
			  	width:100%;
			  	height: 100%;
			  	display: block;
			  }
			}
		}
	}
}
</style>
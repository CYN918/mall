<template>
	<div class="version-update-index">
		<!-- 头部 -->
		<div class="detail-head" v-show="deadshow">
			<div class="head-all">
				<div class="head-left fl" @click="toPath('/')">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>版本升级</p>
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
				src:'./static/activityImgs/shengji1.png'
			},{
				src:'./static/activityImgs/shengji2.png'
			},{
				src:'./static/activityImgs/shengji3.png'
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
.version-update-index{
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
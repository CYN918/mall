<template>
	<div class="may-eighteen">
		<!-- 头部 -->
		<div class="detail-head" v-show="deadshow">
			<div class="head-all">
				<div class="head-left fl" @click="toPath('/')">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>带你种草全球购</p>
				</div>
			</div>
		</div>
		<!-- 内容 -->
		<div class="activity-content">
			<ul class="activity-ul">
				<li class="activity-li">
					<img :src="classData[0].src" alt="" @click="toClassList(classData[0].categoryId)">
				</li>
				<li class="activity-li" v-for="(item,index) in listDataOne">
					<img :src="item.src" alt="" @click="toDetail(item.productId)">
				</li>
				<li class="activity-li">
					<img :src="classData[1].src" alt="" @click="toClassList(classData[1].categoryId)">
				</li>
				<li class="activity-li" v-for="(item,index) in listDataTwo">
					<img :src="item.src" alt="" @click="toDetail(item.productId)">
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
			classData:[{
				categoryId:'56',
				src:'./static/activityImgs/may1.png'
			},{
				categoryId:'56',
				src:'./static/activityImgs/may8.png'
			}],
			listDataOne:[{
				productId:176,
				src:'./static/activityImgs/may2.png'
			},{
				productId:178,
				src:'./static/activityImgs/may3.png'
			},{
				productId:185,
				src:'./static/activityImgs/may4.png'
			},{
				productId:181,
				src:'./static/activityImgs/may5.png'
			},{
				productId:180,
				src:'./static/activityImgs/may6.png'
			},{
				productId:184,
				src:'./static/activityImgs/may7.png'
			}],
			listDataTwo:[{
				productId:183,
				src:'./static/activityImgs/may9.png'
			},{
				productId:179,
				src:'./static/activityImgs/may10.png'
			},{
				productId:182,
				src:'./static/activityImgs/may11.png'
			},{
				productId:177,
				src:'./static/activityImgs/may12.png'
			}]
		}
	},
	methods:{
		//跳转到首页
		toIndex(){
			this.getAppType((type) => {
				if(type == 'isiOS'){
					var appData = {};
					appData = getAppData();
					if(appData.godId == "" || appData.godId == undefined || appData.godId == null){
						window.webkit.messageHandlers.gotoLogin.postMessage({});
					}else{
						window.webkit.messageHandlers.gotoHome.postMessage({});
					}
				}else if(type == 'isAndroid'){
					var appData = {};
					appData = JSON.parse(wkj.getAppData());
					if(appData.godId == "" || appData.godId == undefined || appData.godId == null){
						wkj.gotoLogin();
					}else{
						wkj.gotoHome();
					}
				}else if(type == 'h5'){
					if(this.volidUserId()){
						this.toPath('/');
					}else{
						this.toPath('/login');
					}
				}
			})
		},
		//跳转到分类页面
		toClassList(id){
			this.getAppType((type) => {
				if(type == 'isiOS'){
					window.webkit.messageHandlers.gotoClassify.postMessage({categoryId:id,categoryName:'服饰鞋包'});
				}else if(type == 'isAndroid'){
					wkj.gotoClassify(id);
				}else if(type == 'h5'){
					this.$router.push({
						path:'/classList',
						query:{
							id:id,
		          categoryName:'全球购美妆'
						}
					})
				}
			});
		},
		//跳转到详情页面
		toDetail(id){
			// console.log(id)
			this.getAppType((type) => {
				if(type == 'isiOS'){
					window.webkit.messageHandlers.gotoGoodsDetail.postMessage({productId:id});
				}else if(type == 'isAndroid'){
					wkj.gotoGoodsDetail(id,'');
				}else if(type == 'h5'){
					this.detailsPath('/detail',id);
				}
			});
		}

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
.may-eighteen{
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
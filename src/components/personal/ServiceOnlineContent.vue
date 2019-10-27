<template>
	<div class="service-online-content">
		<!-- 头部 -->
		<div class="detail-head">
			<div class="head-all">
				<div class="head-left fl " @click="toBack()">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>在线客服</p>
				</div>
			</div>
		</div>

		<div class="service-content">
			<iframe ref="serviceOnlineIframe" :src="url" scrolling="auto" width="100%"  frameborder="0"></iframe>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
    	url:'http://service.wankaji.net:8082/crm/im/mobile.htm?c=81cd2mn4mf'
    }
  },
  methods:{
     setUrl(){
     		if(this.getCookie('godId') != '' || this.getCookie('godId')){
     			this.url = this.url + '&u=' + this.getCookie('godId') + '&t=' + new Date().getTime();
     			
     		}else{
     			this.url = this.url + '&u=' + '' + '&t=' + new Date().getTime();
     			// console.log(this.url)
     		}
     }
  },
  mounted(){
  	this.setUrl();
  	this.$refs.serviceOnlineIframe.style.height = window.innerHeight + 'px';
  }
}
</script>

<style lang="less" scoped>
 .service-online-content {
 	height: 100%;
 	.service-content{
 		height: 100%;
 		z-index: 22;
 		padding-top: .88rem;
 	}
 }
 
</style>
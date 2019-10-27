<template>
	<div class="index-main">
		<!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/orderPay')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>连连支付</p>
        </div>
      </div>
    </div>
		<!-- 跳转from表单 -->
		<form id="myForm" :action="payUrl" type="post" style="display:none" target="iframe">
			<input type="text" :value="reqData" name="req_data">
		</form>
		<iframe 
    name="iframe" 
    frameborder="0" 
    width="100%"
    align="middle" 
    class="iframe-style"
    ></iframe>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
export default{
	data(){
		return {
			payUrl:'',
			reqData:''
		}
	},
	computed:{
    ...mapGetters(['payInfo'])
  },
	mounted(){
		this.payUrl = this.payInfo.payUrl;
		this.reqData = this.payInfo.reqData;
		// console.log(this.payInfo)
		// this.$nextTick(function() {
		// 	 document.getElementById('myForm').submit();
		// });
	}
	
}
</script>


<style lang="less" scoped>
.iframe-style{
	height:100vh;
}
</style>
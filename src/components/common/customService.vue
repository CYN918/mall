<template>
	<div class="custom-service">
		<!-- 头部 -->
		<div class="detail-head">
			<div class="head-all">
				<div class="head-left fl" @click="toBackPre()">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>联系客服</p>
				</div>
			</div>
		</div>
		<!-- 内容 -->
		<div class="serviceCon">
			<ul>
				<li class="item">
					<!-- @click.stop="toOnlineService" -->
					<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=36c3182a01ed75e24546a924b8025563534485d3cdb87d2a88e3741c9d0e4780">
						<!-- @click.stop="toPath('/serviceOnlineContent')" -->
						<h4 class="title">
							<img src="../../../static/images/ic_customer@2x.png" class="absolute" />
							<label>在线客服</label>
							<img src="../../../static/images/ic_right.png" class="fr" />
						</h4>
						<p class="desc">您可提前将APP使用中遇到的问题进行截图，及时定位问题不等待～</p>
						<p class="time">人工服务时间：9:00-22:00</p>
					</a>
				</li>
				<!-- <li class="item">
					<a href="tel:4006505656">
						<h4 class="title">
							<img src="../../../static/images/ic_phone@2x.png" class="absolute" />
							<label>电话客服 400-650-5656</label>
							<img src="../../../static/images/ic_right.png" class="fr" />
						</h4>
						<p class="desc">电话客服可能等待时间较长，建议您选择在线客服。</p>
						<p class="time">人工服务时间：9:00-22:00</p>
					</a>
				</li> -->
				<!-- <li class="item" v-clipboard:copy="message"  v-clipboard:success="onCopy"  v-clipboard:error="onError">
					<a href="javascript:;">
						<h4 class="title">
							<img src="../../../static/images/ic_focus@2x.png" class="absolute" />
							<label>关注新宝商城</label>
							<img src="../../../static/images/ic_right.png" class="fr" />
						</h4>
						<p class="desc">添加新宝商城公众号，与百万用户一起玩转新宝商城。</p>
						<p class="time">复制<span v-model="message">wankaji88</span>前往微信添加关注</p>
					</a>
				</li> -->
				<li class="item">
					<a href="javascript:;">
						<h4 class="title" @click="toPath('/problem')">
								<img src="../../../static/images/ic_problem@2x.png" class="absolute" />
								<label>帮助中心</label>
								<img src="../../../static/images/ic_right.png" class="fr" />
						</h4>
					</a>
					<!-- <div class="hotAsk">
						<ul>
							<li @click="detailsPath('/problem',0)">
								<a href="javascript:;"><label></label><span>【账户认证】绑定银行卡失败原因</span></a>
							</li>
							<li @click="detailsPath('/problem',1)">
								<a href="javascript:;"><label></label><span>【资金】关于提现</span></a>
							</li>
							<li @click="detailsPath('/problem',2)">
								<a href="javascript:;"><label></label><span>【投资】优惠券使用规则</span></a>
							</li>
						</ul>
					</div> -->
				</li>
			</ul>
			<div class="weixinDialog" v-show="dialog">
				<div class="weixinCon">
					<div class="weixinTop">
						<h3>新宝商城公众号：wankaji88</h3>
						<p>公众号已复制至粘贴板，您可前往微信搜索添加</p>
					</div>
					<div class="weixinBtn" @click="onCopy">
						<a href="javascript:;">取消</a>
						<a href="javascript:;">确定</a>
					</div>
				</div>
			</div>

			<p class="footer-phone">服务热线 400-650-5656</p>
		</div>
	</div>
</template>
<script>
	
export default {
	data() {
		return {
			dialog:false,
			message: 'wankaji88',
			indexId:this.$route.query.id,
			url:'http://service.wankaji.net:8082/crm/im/mobile.htm?c=81cd2mn4mf'
		}
	},
	methods: {
		onCopy(e) {
      this.dialog = !this.dialog;
    },
    onError(e) {
      this.dialog = !this.dialog;
    },
	  //根据不同的typeIndex获取不同的页面
	  toBackPre(){
	  	if(this.getCookie('typeIndexService') == 1){
      	this.detailsPath('/detail',this.getCookie('productId'));
	    }else if(this.getCookie('typeIndexService') == 2){
	    	this.detailsPath('/orderIndex',this.indexId);
	    }else{
	      this.toPath('/mine');
	    };
	  },
	  //设置在线客服地址
	  toOnlineService(){
   		if(this.getCookie('godId') != '' || this.getCookie('godId')){
   			this.url = this.url + '&u=' + this.getCookie('godId') + '&t=' + new Date().getTime();
   			window.location.href = this.url;
   		}else{
   			this.url = this.url + '&u=' + '' + '&t=' + new Date().getTime();
   			window.location.href = this.url;
   		}
   	},

	},
	mounted(){
		// window.location.reload();
		// this.setUrl();
	}
}
</script>

<style lang="less" scoped>
.custom-service {
	.serviceCon {
		padding: 0 0.12rem;
		text-align: center;
		min-height:calc(100vh - 1.0rem);
		background: #EEEFF3;
		padding-top: 1.04rem;
		.item {
			padding: 0.32rem 0.14rem 0.36rem 0.74rem;
			background: #FFFFFF;
			border-radius: 8px;
			h4 {
				position: relative;
				line-height: 0.45rem;
				margin: 0 0 0.16rem;
				text-align: left;
				label{
					font-weight: normal;
				}
				img.absolute {
					position: absolute;
					top: 50%;
					left: -0.55rem;
					transform: translateY(-50%);
					width: 0.36rem;
					height: 0.36rem;
					display: inline-block;
				}
				img.fr{
					position: absolute;
					top: 50%;
					right: 0rem;
					transform: translateY(-50%);
					width: 0.36rem;
					height: 0.36rem;
					display: inline-block;
				}
			}
			.desc {
				padding-right: 0.58rem;
				line-height: 0.37rem;
				margin-bottom: 0.08rem;
				font-size: 0.26rem;
				text-align: left;
				color: #666666;
			}
			.time {
				line-height: 0.37rem;
				margin-bottom: 0.08rem;
				font-size: 0.26rem;
				text-align: left;
				color: #AEAEAD;
			}
			.hotAsk ul {
				li {
					padding-bottom: 0.24rem;
					a {
						display: block;
						line-height: 0.42rem;
						font-size: 0.3rem;
						color: #666666;
						text-align: left;
						label {
							display: inline-block;
							width: 0.08rem;
							height: 0.08rem;
							border-radius: 50%;
							background: #999999;
							vertical-align: middle;
						}
						span {
							padding-left:0.20rem;
							vertical-align: middle;
							font-size: 0.26rem;
							color: #666666;
						}
					}
				}
			}
		}
		.weixinDialog{
			position: fixed;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background:rgba(0,0,0,.3);
			z-index: 10;
			.weixinCon{
				position: absolute;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
				background: #FFFFFF;
				border-radius: 0.10rem;
				z-index:11;
				.weixinTop{
					padding:0.40rem;
					width:5.0rem;
					h3{
						font-weight: normal;
						font-size:0.30rem;
						color:#333333;
						margin-bottom:0.20rem;
					}
					p{
						font-size:0.28rem;
						color:#333333;
					}
				}
				.weixinBtn{
					border-top:0.01rem solid #D7D7D7;
					display: inline-block;
					width: 100%;
					a{
						width: 50%;
						height:0.8rem;
						float: left;
						display: inline-block;
						border-right:0.01rem solid #D7D7D7;
						box-sizing: border-box;
						text-align: center;
						line-height:0.80rem;
					}
					a:last-child{
						border-right: none;
						color:#40AFFE;
					}
				}
			}
		}

		.footer-phone{
			position: fixed;
			bottom: 1.0rem;
			left: 2.0rem;
			color: #bbb;
		}
	}
}
</style>
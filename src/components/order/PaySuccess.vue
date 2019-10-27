<template>
  <div class="pay-success-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>订单支付成功</p>
        </div>
      </div>
    </div>
		<!-- 支付详情 -->
		<div class="pay-success-detail">
			<div class="success-detail-all">
				<div class="success-img">
					<img src="./../../assets/images/successful@2x.png"  alt="" >
				</div>
				
				<div class="content-all">
					<p class="content-pay-methods">支付方式：
						<span>微信支付</span>
					</p>
					<div class="content-pay-price">
						<p>支付金额：
							<span class="price-icon">&#165;</span>
							<span class="pay-span">5799.00</span>
						</p>
						<p>优惠金额：
							<span class="price-icon">&#165;</span>
							<span class="pay-span">0.00</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 查看订单 -->
		<div class="look-order">
			<button @click="toPath('/orderIndex')">查看订单</button>
			<button @click="toPath('/')">我再逛逛</button>
		</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
          
    }
  },
  methods:{
    
  },
  mounted(){
  	
  }
}
</script>

<style lang="less" scoped>
.pay-success-main{
	.pay-success-detail{
		height: 6.2rem;
		width: 100%;
		border-top: .01rem solid #ddd;
		font-size: .28rem;
		color: #333;
		.success-detail-all{
			width: 6.8rem;
			margin: 0 auto;
			padding-top: .88rem;
			.success-img{
				width: 4.09rem;
				margin: .8rem 0 .59rem 1.49rem;
				height: 2.74rem;
			}
			.content-all{
				.content-pay-methods{
					margin-bottom: .3rem;
					.pay-span{
						color: #ff5349;
					}
				}
				.content-pay-price{
					display: flex;
					justify-content: space-between;
					.price-icon{
						color: #ff0f4f;
						font-size: .24rem;
					}
					.pay-span{
						color: #ff0f4f;
						font-size: .32rem;
					}
				}
			}
		}
	}

	.look-order{
		width: 6.8rem;
		margin: 0 auto;
		height: .72rem;
		margin-top: .77rem;
		button{
			float: left;
			width: 3rem;
			height: .72rem;
			line-height: .72rem;
			background-color:#ededf0;
			border-radius: .36rem;
			color: #333;
			font-size: .32rem;
		}
		button:nth-child(2){
			background-color: #ff0f4f;
			color: white;
			margin-left: .78rem;
		}
	}
}
</style>


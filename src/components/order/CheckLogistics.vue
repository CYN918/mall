<template>
  <div class="check-logistics-main">
  	<!-- 头部 -->
  	<div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toBack()">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>物流跟踪</p>
        </div>
      </div>
    </div>
    <!-- 物流信息 -->
    <div class="logistics-message">
    	<div class="logistics-message-all">
    		<p>物流公司：韵达快递</p>
	    	<p>快递编号：89000000006</p>
	    	<p>预计到达时间：2018-02-26</p>
    	</div>
    </div>
    <!-- 物流详情 -->
    <div class="logistics-detail">
    	<p class="logistics-detail-title">订单跟踪</p>
    	<ul class="logistics-detail-content">
    		<li class="logistics-detail-item" v-for="(item,index) in logisticsData">
    			 <em class="logistics-detail-img"></em>
    			 <p>{{item.message}}
    			 	<span class="logistics-telephone">{{item.telephone}}</span>
    			 </p>
           <p class="logistics-time" style="margin-top:10px">
	           {{item.time}}
	         </p>
    		</li>
    	</ul>
    </div>
  </div>

</template>
<script>

export default {
  data () {
    return {
         logisticsData:[{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付。',
         		telephone:'18508235510',
         		time:'2017-08-18 08:24:18'
         },{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。',
         		time:'2017-08-18 08:24:18'
         },{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。',
         		time:'2017-08-18 08:24:18'
         },{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。',
         		time:'2017-08-18 08:24:18'
         },{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。',
         		time:'2017-08-18 08:24:18'
         },{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。',
         		time:'2017-08-18 08:24:18'
         },{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。',
         		time:'2017-08-18 08:24:18'
         },{
         		message:'【南宁市】您的订单正在配送途中，请您准备签收，感谢您的耐心等待。京东扫码付，单单享立减。',
         		time:'2017-08-18 08:24:18'
         }]
    }
  },
  
}
</script>

<style lang="less" scoped>
.check-logistics-main{
	.logistics-message{
		height:2.28rem;
		padding:.88rem 0 0 .24rem;
		border-bottom: .15rem solid #f5f5f5;
		.logistics-message-all{
			padding:.3rem 0 .06rem 0;
			font-size: .28rem;
			color:#333;
			p{
				margin-bottom: .24rem;
			}
		}
	}

	.logistics-detail{
    height: auto;
    margin:.3rem .24rem 0 .24rem;
    color:#666;
    font-size:.24rem;
    position: relative;
    .logistics-detail-title{
      font-size:.28rem;
      margin-bottom: .14rem;
    }
    .logistics-detail-content{
      height: auto;
      margin-left:.16rem;
      border-left:.01rem solid #eee;
      .logistics-detail-item{
        padding: 0 0 .6rem .12rem;
        margin-left: .16rem;
        position: relative;
        .logistics-telephone{
          color:#007aff;
        }
        .logistics-time{
          font-size:.22rem;
        }
        .logistics-detail-img{
          display: block;
          width: .12rem;
          height: .12rem;
          border-radius: .06rem;
          position:absolute;
          left:-.24rem;
          top:.12rem;
          z-index:1;
          background-color: #ddd;
        }
        &::before{
          content: '';
          width: .3rem;
          height: .3rem;
          position: absolute;
          z-index: 0;
          top: .04rem;
          left: -.33rem;
          background-color: #fff;
          border-radius: .15rem;
        };
        &:first-child{
          color:#ff1051;
          >.logistics-detail-img{
            background-color: #ff1051;
            width: .12rem;
            height: .12rem;
            border-radius:.06rem;
          }
          >.logistics-time{
            color:#ff1051;
          }
        }
        &:last-child::after{
          content: '';
          width: .04rem;
          height: 100%;
          background-color: #fff;
          position: absolute;
          left: -.20rem;
          top: .12rem;
          z-index:0;
        }
      }
    }
  }
}
</style>


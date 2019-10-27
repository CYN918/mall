<template>
  <div class="order-index-main">
    <!-- 头部 -->
    <div class="order-head" style="background-color:#fff !important">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/mine')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>订单中心</p>
        </div>
      </div>
    </div>
    <!-- <div class="clearfix"></div> -->
    <!-- 列表头部 -->
    <div class="order-nav-all" style="background-color:#fff !important">
    	<ul class="order-nav-ul">
				<li 
        :class="item.orderStatus == indexId? 'order-nav-list active' : 'order-nav-list'" 
        v-for="(item,index) in listHeadData" 
        @click="selectChange(index)"
        >
					{{item.title}}
				</li>
			</ul>
    </div>
		<!-- 列表 -->
		<ul class="order-list" v-if="orderListData.length > 0"
			v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loadingMore"
      :infinite-scroll-distance="10"
			>
			<li class="order-list-item" v-for="(item,index) in orderListData">
				<div class="order-list-head-all">
					<div class="order-list-head">
						<span class="fl">{{item.createtime}}</span>
						<span class="red fr" v-show="item.order_status == 0">待付款</span>
						<span class="yellow fr" v-show="item.order_status == 2">待发货</span>
						<span class="green fr" v-show="item.order_status == 3">已发货</span>
						<span class=" fr" v-show="item.order_status == 4">已完成</span>
						<span class="gray fr" v-show="item.order_status == 5">订单失效</span>
					</div>
				</div>
				<div class="clearfix"></div>
				<ul class="shop-list-all" @click="toOrderDetail(item.id)">
					<li class="shop-list-item" v-for="(citem,cindex) in item.detailsList">
						<div class="cover-all ">
               <img :src="citem.imgurl ? citem.imgurl : './../../assets/images/1.png'" alt="" class="cover-image">
            </div>
						<div class="item-instro ">
              <div class="instro-head">
                	{{citem.productName}}
              </div>
              <div class="insro-decri-orderIndex" style="-webkit-box-orient: vertical;box-orient: vertical">
                 {{citem.attribute}}
              </div>
              <div class="instro-price-all">
                <span class="instro-price fl"><span class="price-icon">&#165;</span><span>{{formatPrice(citem.price,2)}}</span>&nbsp;</span>
                <span class="instro-count fr">&times
                  <span>{{citem.quantity}}</span>
                </span>
              </div>
            </div>
					</li>
				</ul>
				<div class="clearfix"></div>
				<div class="order-price">
					<p>共
						<span>{{item.totalQuantity}}</span>件商品
						<span class="fr">总价：<span class="price-icon">&#165;</span>
							<span class="price">{{formatPrice(item.totalamount,2)}}</span>（含运费<span class="price-icon">&#165;</span>
							<span class="price">0.00</span><span v-if='item.jifenprize != "0.0" && item.jifenprize != "" && item.jifenprize != "null" && item.jifenprize != undefined '>,积分抵扣<span class="price-icon">&#165;</span><span class="price">{{formatPrice(item.jifenprize,2)}}</span></span>）
						</span>
					</p>
          <div class="clearfix"></div>
					<div class="client fr">
						<button class="to-pay" v-show="item.order_status == 0" @click="toOrderPay(item.id,item.totalamount,item.addressId,item.jifenprize)">去支付</button>
					</div>
					<div class="client fr">
						<!-- <button v-show="item.order_status == 2" @click="toclass(item.id)">再来一单</button> -->
					</div>
					<div class="client fr">
						<button v-show="item.order_status == 3" @click="confirmRevise(item.id)">确认收货</button>
					</div>
					<!-- <div class="client fr">
						<button v-show="false" class="go-pay">去支付</button>
					</div> -->
					<div class="client fr" v-show="item.order_status == 4">
						<button class="client-btn" @click="toService()">申请售后</button>
					  <!-- <button @click="toclass(item.id)">再来一单</button> -->
					</div>
					<div class="client fr">
						<button v-show="item.order_status == 5" @click="deleteOrder(item.id)">删除订单</button>
					</div>
				</div>
			</li>
		</ul>
		<div class="no-shopping" v-else>
      <div class="no-shopping-img">
         <img src="./../../assets/images/defaultpage_1@2x.png" alt="">
      </div>
     
      <p class="no-shopping-text">亲，您还没有相关订单</p>
    </div>
  </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
export default {
  data () {
    return {
    		// 列表头部数据
    			listHeadData:[{
    				title:'全部',
    				orderStatus:-1,
    				isActive:true
    			},{
    				title:'待付款',
    				orderStatus:0,
    				isActive:false
    			},{
    				title:'待发货',
    				orderStatus:2,
    				isActive:false
    			},{
    				title:'待收货',
    				orderStatus:3,
    				isActive:false
    			},{
    				title:'已完成',
    				orderStatus:4,
    				isActive:false
    			}],
        //列表基本数据
          orderListData:[],
          integral: '',
        	userId:this.getCookie('godId'),
        	indexId:this.$route.query.id,
        	loadingMore:true,
        	pageSize:10,
        	pageNum:1,
          totalPageNum:0,//总页数
          totalCount:0,//总条数

        	
    }
  },
  methods:{
    //跳转到联系客服页面
    toService(){
      this.detailsPath('/customService',this.indexId);
      this.setCookie('typeIndexService',2);
    },
    toclass(id){
      this.$router.push({
        path:'/class'
      })
    },
    //查看订单详情
    toOrderDetail(id){
      this.$router.push({
        path:'/orderDetail',
        query:{
          id:id,
          indexId:this.indexId
        }
      })
    },
    //确认收货
    confirmRevise(id){
        var params = {
          params:{
           godId:this.getCookie('godId'),
           id:id
          } 
        }
        // MessageBox.confirm('确认删除该订单吗?')
        // .then(()=>{
          this.getData('post','/order/confirmOrder',params,(res) => {
            console.log(res)
            if(res.data.resultdesc == '成功'){
              this.indexId = 4;
              // Toast({
              //   message: '删除成功',
              //   className:'toast-delete',
              //   duration: 1000
              // });
              this.getOrderList();
            }else{
              MessageBox.alert(res.data.resultdesc);
            }
        });
      // })
    },
  	//删除失效订单
  	deleteOrder(id){
  		var params = {
        params:{
         godId:this.getCookie('godId'),
	       id:id
        } 
      }
  		MessageBox.confirm('确认删除该订单吗?')
      .then(()=>{
      	this.getData('post','/order/delete',params,(res) => {
	        // console.log(res)
	        if(res.data.resultdesc == '成功'){
            Toast({
              message: '删除成功',
              className:'toast-delete',
              duration: 1000
            });
	          this.getOrderList();
	        }else{
	          MessageBox.alert(res.data.resultdesc);
	        }
      });
    })
  },
  	//加载更多
    loadMore() {
      // console.log(1)
      this.loadingMore = true;
      if(this.pageNum < this.totalPageNum){
        // console.log(2)
          this.pageNum += 1;
          this.getOrderList();
      }else{
         return;
      }
    },
    // 选择不同的订单状态
    selectChange(index){
    	switch(index){
    		case 0:
	    		this.indexId = -1;
          this.detailsPath('/orderIndex',this.indexId);
	    		break;
    		case 1:
	    		this.indexId = 0;
          this.detailsPath('/orderIndex',this.indexId);
	    		break;
    		case 2:
	    		this.indexId = 2;
          this.detailsPath('/orderIndex',this.indexId);
	    		break;
    		case 3:
	    		this.indexId = 3;
          this.detailsPath('/orderIndex',this.indexId);
	    		break;
	    	case 4:
	    		this.indexId = 4;
          this.detailsPath('/orderIndex',this.indexId);
	    		break;
	    	default:
	    	 break;
    	};
    	
    },
    //获取订单列表
    getOrderList(){
      this.loading(true);
    	var params = {
    		page:{
					pageNum:this.pageNum,
					pageSize:this.pageSize
				},
        params:{
          godId:this.getCookie('godId'),
	        orderStatus:this.indexId
        } 
      }
    	this.getData('post','/order/list',params,(res) => {
	        // console.log(res.data.object)
	        if(res.data.resultdesc == '成功'){
            this.loading(false);
            if(this.pageNum == 1){
              this.orderListData = res.data.object.list;
              this.totalCount = res.data.object.total;
              var a_size = this.totalCount % this.pageSize;
              var pageSize = parseInt(this.totalCount / this.pageSize);
             
              // console.log(a_size,pageSize)
              if(a_size != 0){
                this.totalPageNum = pageSize + 1;
              }else{
                this.totalPageNum = pageSize;
              }
            }else{
              var orderListData = [];
              orderListData = res.data.object.list;
              // this.orderListData.concat(orderListData);
              orderListData.forEach((item,index) => {
                if(item){
                  this.orderListData.push(item);
                }
              });
            }
	        }
          /*else{
	          MessageBox.alert(res.data.resultdesc);
	        }*/
      });
    },
    
    //点击待支付跳转到支付页面
    toOrderPay(id,price,addressId,jifenprize){
    	this.setCookie('orderId',id);
    	this.setCookie('totalPrice',price);
      this.setCookie('addressId',addressId);
      this.setCookie('typeIndex',3);
      this.setCookie('indexId',this.indexId);
      this.setCookie('integral',jifenprize);
    	this.$router.push({
    		path:'/orderPay'
    	})
    },
  },
  mounted(){
    this.getOrderList();
  },

  watch:{
    'indexId':function(val) {
        setTimeout(() => {
          this.pageNum = 1;
          // this.getOrderList();
        },100);

    }
  }
}
</script>

<style lang="less" scoped>
.order-index-main{
	.order-head {
    background-color: #fff !important;
   border-bottom: .01rem solid #EEEFF3;
    box-sizing: border-box;
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.24rem;
    text-align: center;
   position: fixed !important;
   top: 0 !important;
   left: 0 !important;
   z-index: 99;
    .head-all {
      height: .88rem;
      .head-left {
        display: inline-block;
        width: 0.44rem;
        line-height: 0.88rem;
        img {
          transform: rotate(180deg) translateX(0.06rem);
          vertical-align: middle;
        }
      }
      .head-title {
        display: inline-block;
        line-height: 0.88rem;
        text-align: center;
        font-size: .36rem;
        width: 5.9rem;
        overflow:hidden; 
        white-space: nowrap;
        text-overflow:ellipsis;
        word-break:break-all;
        p {
          text-align: center;
        }
      }
      /* .head-client {
        width: 0.44rem;
        line-height: 0.88rem;
        img {
          vertical-align: middle;
        }
      }
      .head-manager {
        height: 0.42rem;
        width: 0.66rem;
        font-size: .3rem;
        span{
          line-height:0.42rem;
        }
      } */
    }
  }

	.order-list{
    padding-top: 1.76rem;
		width: 100%;
		height: auto;
		border-top: .15rem solid #f1f1f1;
		font-size: .26rem;
		.order-list-item{
			height: auto;
			border-bottom: .15rem solid #f1f1f1;
		}
		.order-list-head-all{
			height: .6rem;
			line-height: .6rem;
			border-bottom: .01rem solid #f1f1f1;
			.order-list-head{
				width: 7.08rem;
				margin: 0 auto;
				color: #aeaead;
				.red{
					color: #ff1051;
				}
				.green{
					color: #1dcd5b;
				}
				.yellow{
					color: #f9b000;
				}
        .gray{
          color: gray;
        }
			}
		}
		.order-price{
			height: 1.4rem;
			width: 7.08rem;
			margin: 0 auto;
			font-size: .26rem;
			p{
				height: .8rem;
				line-height: .8rem;
        .price-icon{
          color: #ff1051;
          font-size: .22rem;
        }
				.price{
					color: #ff1051;
          font-size: .28rem;
				}
			}
			button{
				width: 1.6rem;
				height: .46rem;
				border-radius: .28rem;
        /* box-shadow: 0 0 0 .01rem #ff1051; */
        color: #ff1051;
        border:.01rem solid #ff1051;
			}
			.go-pay{
				background-color: #ff1051;
				color: white;
			}
			.client-btn{
				color: #666;
        box-shadow: 0 0 0 .01rem #666;
			}
			.to-pay{
				color: white;
				background-image: linear-gradient(90deg, #ff779c,#ff1051);
			}
		}
	}

	.no-shopping{
      height: auto;
      width: 100%;
      padding-top:1.76rem;
      .no-shopping-img{
        width: 4.15rem;
        height: 2.46rem;
        margin: 0 0 .56rem 1.71rem;
        padding-top: 1.4rem;
      }
      .no-shopping-text{
        width: 2.6rem;
        margin: 0 auto;
        color: #666;
        font-size: .26rem;
      }
      
    }
}
</style>


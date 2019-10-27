<template>
  <div class="discount-index-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/mine')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>优惠券</p>
        </div>
      </div>
    </div>
    <!-- 列表头部 -->
    <div class="order-nav-all">
    	<ul class="order-nav-ul">
				<li 
        :class="item.discountStatus == indexId? 'discount-nav-list active' : 'discount-nav-list'" 
        v-for="(item,index) in listHeadData" 
        @click="selectChange(index)"
        >
					{{item.title}}
				</li>
			</ul>
    </div>
		<!-- 优惠券 -->
    <div class="discount-content">
      优惠券
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
		// 列表头部数据
			listHeadData:[{
				title:'未使用',
				discountStatus:0,
				isActive:true
			},{
				title:'已使用',
				discountStatus:1,
				isActive:false
			},{
				title:'已过期',
				discountStatus:2,
				isActive:false
			}],
      indexId:this.$route.query.id,
    }
       
  },
  methods:{
    /**
     * [选择不同的券包状态]
     * @作者     王柳
     * @日期     2018-06-01
     */
    selectChange(index){
      switch(index){
        case 0:
          this.indexId = 0;
          this.detailsPath('/discount',this.indexId);
          break;
        case 1:
          this.indexId = 1;
          this.detailsPath('/discount',this.indexId);
          break;
        case 2:
          this.indexId = 2;
          this.detailsPath('/discount',this.indexId);
          break;
        default:
         break;
      };
    },

  }
}
</script>

<style lang="less" scoped>
.discount-index-main{
	.discount-content{
      margin-top: 1.76rem;
  }
}
</style>


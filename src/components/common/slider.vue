<template>
  <div class="banner" :style="defaultType == 'index' ? indexCssText : detailCssText">
     <mt-swipe :auto="3000" >
        <mt-swipe-item v-for="(item,index) in defaultBannerList" :key="index">
          <a :href="item.bannerType !== 0 ? item.redirectUrl : 'javascript:void(0)'">
            <img :src="item.imgUrl">
          </a>
        </mt-swipe-item>
     </mt-swipe>
  </div>
</template>
<script>
export default {
  props:['bannerList','type'],
  data() {
    return {
      // bannerList:[
      //    { url: 'javascript:', 
      //      img: '/static/img/ic_mine_bg@2x.png',
      //      title: '送你一朵fua' },
      //     { url: 'javascript:', 
      //       img: '/static/img/ic_mine_bg@2x.png',
      //       title: '送你一次旅行',
      //     }
      //  ],
      defaultBannerList:[],
      // type:'index',   //banner类型，index - 首页的  detail - 详情的
      defaultType:'index',
      indexCssText:{
        height:'4.0rem'
      },
      detailCssText:{
        height:'5.3rem',
      },
    }
  },
  mounted() {
    //根据不同的类型，附加上不同的class
    if(this.defaultType == 'index') {
       document.querySelector('.mint-swipe-indicators').classList.add('detail-dots')
    }else {
       document.querySelector('.mint-swipe-indicators').classList.add('index-dots')
    }
  },
  watch:{
    'bannerList':function(val){
      this.defaultBannerList = val ? val : [];
    },
    'type':function(val){
      this.defaultType = val ? val : 'index';
    }
  }
}

</script>
<style lang='less'>
   .banner {
     width: 100%;
   }

   .vux-swiper {
     .vux-img {
      width: 100%;
      height: 100%;
     }
   }

   .mint-swipe-indicators {
    bottom:0.4rem;
   }

   .mint-swipe-indicator {
    opacity: 1;
    border-radius: 0.08rem !important;
   }

   .index-dots .mint-swipe-indicator {
      margin-right: 0.16rem;
      width: 0.16rem !important;
      height: 0.16rem !important;
      background: #cfcfcf;
      border: none;
   }

   .index-dots .is-active {
      width: 0.48rem !important;
      background: white !important;
   }

   .detail-dots {
       display: flex;
       justify-content: flex-start;
       align-items: center;
   }

   .detail-dots .mint-swipe-indicator {
      width: 0.16rem !important;
      height: 0.04rem !important;
      background: #fff !important;
   }

   .detail-dots .is-active {
      width: 0.16rem !important;
      height: 0.16rem !important;
      border-radius: 50% !important;
      background: transparent !important;
      border: 0.04rem solid #fff;
   }

</style>

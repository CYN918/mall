<template>
  <div class="wj-marquee">
   <ul class="wj-marquee-content" :style="{top: top / 100 + 'rem'}">
       <li 
       v-for="(item,index) in copyMarqueeList"
       style="-webkit-box-orient: vertical;box-orient: vertical" 
       >
          <a :href="item.lanternType !== 0 ? item.redirectUrl : 'javascript:void(0)'">{{item.lanternContent}}</a>
       </li>
   </ul>
  </div>
</template>
<script>
export default {
   props:['marqueeList'],
   data () {
    return {
			copyMarqueeList:[],//底部基本数据
      timer:null,   //用于存储定时器
      top:-66,  //定义走马灯上下滚动
      scrollIndex:0,  //滚动的索引
      percent:66,   //每次滚动的距离，如果是移动端，50 == 1rem
      duration:2500,  //切换的间隔时间
      speed:5,   //切换过程中的速度
    }
  },

  methods:{
     /**
      * [scrolling 开始滚动]
      * @Author   罗文
      * @DateTime 2018-03-16
      * @return   {[type]}   [description]
      */
     scrolling() {
        this.timer = setInterval(()=>{
           //每次切换时的滚动效果，需要较快的切换
           let count = 0;
           let end = this.top - this.percent;

           let animate = setInterval(()=>{
               if(this.top <= end) {
                 this.top = end;
                 this.scrollIndex --;
                 clearInterval(animate);
                 
                 //如果是朝上滚动，则滚动到最后一个的时候，需要立即回到第一个
                 if(Math.abs(this.scrollIndex) == this.copyMarqueeList.length - 2) {
                    this.scrollIndex = 0;
                    this.top = -66;
                 }
               }else {
                 this.top -- ;
               }
           },this.speed)
        },this.duration)
     }
	},
  created() {
    
  },
  mounted(){
    this.scrolling();

    //处理定时器切换tab被中断的bug
    document.addEventListener("visibilitychange", ()=> {
      if(document.hidden === true) {
          // 页面被挂起,需要清除掉定时器，避免切换回tab时定时器功能迷乱
          clearInterval(this.timer);
          this.timer = null;
      } else {
          // 页面由挂起被激活
          // 重启定时器
          this.scrolling();
      }
    });
  },
  watch:{
    'marqueeList':function(val) {
      if(val && val.length > 0 ) {
         //在滚动之前，先提取首尾两条数据，组成无限滚动模型
         this.copyMarqueeList = [val[val.length - 1],...val,val[0]];
      }
    }
  },


}
</script>

<style scoped>

   .wj-marquee {
      position: relative;
      height: 0.66rem;
      line-height: .66rem;
      width: 100%;
      overflow: hidden;
   }

   .wj-marquee-content {
      position: absolute;
      left: 0;
      top: 0;
      height: auto;
   }

   li {
    display: -webkit-box;
    -webkit-box-orient: vertical !important; 
    -webkit-line-clamp: 1;
    overflow: hidden;
    height: 0.66rem;
    line-height: .66rem;
   }

   .wj-marquee a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color:#888;
      font-size: .24rem;
      margin-top: .05rem;
   }
</style>


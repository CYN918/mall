<template>
  <div class="slider-nav-main">
    <div class="slider-nav-all" ref="sliderNav">
      <ul class="slider-nav-ul">
        <li 
        :class="item.classIndex == indexId? 'slider-nav-li active' : 'slider-nav-li'" 
        v-for="(item,index) in ClassNavData"
        @click="selectChange(index,item.id,item.categoryName,$event)">
          {{item.categoryName}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props:['ClassNavData'],
  data() {
    return {
      // 列表导航数据
      // ClassNavData:[{
      //   categoryName:'家居',
      //   classIndex:0,
      //   isActive:true
      // },{
      //   categoryName:'新品',
      //   classIndex:1,
      //   isActive:false
      // },{
      //   categoryName:'家庭宽带',
      //   classIndex:2,
      //   isActive:false
      // },{
      //   categoryName:'智能家居',
      //   classIndex:3,
      //   isActive:false
      // },{
      //   categoryName:'区块链',
      //   classIndex:4,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   isActive:false
      // }],
      indexId:0,//列表头部的选中index
      // categoryId:'',
    }
  },
  methods:{
    /**
     * [toSingalClass 跳转到某一个分类页面]
     * @作者     王柳
     * @日期     2018-04-11
     * @param  {[type]}   id   [description]
     * @param  {[type]}   name [description]
     * @return {[type]}        [description]
     */
    // toSingalClass(id) {
    //   this.$router.push({
    //     path:'/class',
    //     query:{
    //       id:id
    //     }
    //   })
    // },
     /**
      * [选择不同的分类]
      * @作者     王柳
      * @日期     2018-04-11
      * @param  {[type]}   index [description]
      * @return {[type]}         [description]
      */
    selectChange(index,id,name,e){
      this.indexId = index;
      console.log(this.indexId)
      // this.categoryId = id;
      // this.categoryName = name;
      this.$emit('getCategoryId',id);
      // this.toSingalClass(id);
      // this.$router.push({
      //   path:'/class',
      //   query:{
      //     id:id
      //   }
      // });
    },
    // document.body.style.overflow = 'hidden';
    // document.ontouchmove = function(e) {
    //   e.preventDefault();
    // };
    // this.$refs.sliderNav.ontouchmove = function (e) {
    //   console.log(2)
    //    e.stopPropagation();
    //    e.returnValue = true;
    // }
  },
}

</script>
<style lang='less' scoped>
.slider-nav-main{
  height: 100%;
  .slider-nav-all{
    height: 100%;
    overflow:scroll;
    .slider-nav-ul{
      height: 100%;
      .slider-nav-li{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.0rem;
        text-align: center;
      }
      .active{
        border-left: .1rem solid #ff0f4f;
        color:#ff0f4f;
        background-color: #f7f7f7;
      }
    }
  }
}

</style>

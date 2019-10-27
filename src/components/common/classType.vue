<template>
	<div class="class-type-main" :style="{height:classTypeHeigth + 'px'}">
    <mt-swipe :auto="0">
      <mt-swipe-item :key="index" v-for="(item,index) in classTypeAll">
        <ul class="class-type" >
          <li class="class-type-item" v-for="(citem,cindex) in item.categoryListItem">
            <a @click="toSingalClass(citem.id,citem.categoryName)">
              <img :src="citem.categoryIconImgUrl" height="100%" width="100%"  alt="">
              <p>
                {{citem.categoryName}}
               <!--  {{citem.categoryName ? citem.categoryName.length > 4 ? citem.categoryName.slice(0,4) : citem.categoryName : ''}} -->
              </p>
            </a>
          </li>
        </ul>
      </mt-swipe-item>
    </mt-swipe>
	</div>
</template>

<script>
export default{
  props:['categoryList'],
	data(){
		return {
      classTypeHeigth:0,//分类UL的高度//  
      classTypeAll:[{
        categoryListItem:[]
      }],
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
    toSingalClass(id,name) {
      this.$router.push({
        path:'/classList',
        query:{
          id:id
        }
      });
      this.setCookie('categoryName',name);
    }
	},
  mounted(){
    
  },
  updated(){
    var classTypeHeigth = document.getElementsByClassName('class-type');
     this.classTypeHeigth = classTypeHeigth[0].clientHeight + 13;
  },
  watch:{
    'categoryList':function(val){
      var categoryListAll = val;

      if(categoryListAll.length > 8){
        this.classTypeAll[0].categoryListItem = categoryListAll.slice(0,8);
        // console.log(categoryListAll.slice(16,24))
        if(categoryListAll.slice(8,16).length > 0){
          this.classTypeAll.push({
            categoryListItem:categoryListAll.slice(8,16)
          });
          if(categoryListAll.slice(16,24).length > 0){
            this.classTypeAll.push({
              categoryListItem:categoryListAll.slice(16,24)
            });
            if(categoryListAll.slice(24,32).length > 0){
              this.classTypeAll.push({
                categoryListItem:categoryListAll.slice(24,32)
              });
              if(categoryListAll.slice(32,40).length > 0){
                this.classTypeAll.push({
                  categoryListItem:categoryListAll.slice(32,40)
                });
                if(categoryListAll.slice(40).length > 0){
                  this.classTypeAll.push({
                    categoryListItem:categoryListAll.slice(40)
                  });
                }
              }
            }
          }
        }
      }else{
        this.classTypeAll[0].categoryListItem = categoryListAll;
      }
    }
  }
}
</script>


<style lang="less" scoped>
.class-type-main{
	/* height:3.42rem; */
	width: 100%;
	background-color: #fff;
  border-bottom: .01rem solid #eeedf1;

	.class-type{
		width: 7.4rem;
		margin-left: .05rem;
    padding-top: .24rem;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		.class-type-item{
      width: 1.84rem;
      height: 1.2rem;
      text-align: center;
			margin:0 0 .3rem 0;
			img{
				width: .8rem;
				height: .8rem;
			}
      p{
        font-size: .24rem;
        color: #666;
      }
		} 
		.class-type-item:nth-child(4n){
			/* width: 0; */
		}
	}
}
</style>
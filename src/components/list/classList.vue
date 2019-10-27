<template>
  <div class="class-list-main">
    <!-- 头部 -->
    <div class="detail-head" style="background-color:#fff !important">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>新宝精选</p>
        </div>
      </div>
    </div>
    <!-- 列表头部 -->
    <div class="order-nav-all" ref="cateContainer">
      <ul class="order-nav-ul"  ref="cateList" >
        <!-- :style="{width:ClassData.length * 3.0 +'rem'}" -->
        <li 
        :class="item.classIndex == indexId? 'order-nav-list active' : 'order-nav-list'" 
        v-for="(item,index) in ClassData" 
        @click="selectChange(index,item.id,item.categoryName,$event)"
        >
          {{item.categoryName}}
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
    <!-- 列表 -->
    <div v-if="SingalClassData.length > 0">
      <div class="shop-list-img">
        <img :src="SingalClassData[0].categoryImgUrl" alt="">
        <!-- <img src="./../../assets/images/huodongtu@2x.png" alt=""> -->
      </div>
      <div class="list">
        <ul class="list-ul">
          <li class="list-item fl" v-for="(item,index) in SingalClassData" @click="toDetailsIndex(item.productId)">
            <div class="cover" 
            :style="{background:'url('+item.coverImgUrl+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
            </div>
            <p class="list-item-title">
             {{item.productName?item.productName.length>20?item.productName.slice(0,20)+"...":item.productName:''}}
            </p>
            <span class="price">&#165;<span>&nbsp;{{formatPrice(item.price,2)}}</span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-no-result" v-else>
      <img src="./../../assets/images/defaultpage_1@2x.png" alt="">
      <p>抱歉，该分类暂无数据</p>
    </div>
  </div>
</template>

<script>

export default{
  data(){
    return {
      cateListWidth:0,//分类头部
      SingalClassData:[],//某个分类数据
      ClassData:[],//分类数据
      categoryName:this.getCookie('categoryName'),//分类名称
      categoryId:this.$route.query.id,//分类Id
      loadingMore:true,
      pageSize:10,
      pageNum:1,
      totalPageNum:0,//总页数
      totalCount:0,//总条数
      indexId:0,//列表头部的选中index
      

      // 列表头部数据
      // ClassData:[{
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
      // }],
    }
  },
  methods:{
    //点击某个商品跳转到商品详情页面
    toDetailsIndex(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id,
          categoryId:this.categoryId,
        }
      })
    },
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
          id:id,
        }
      });
      this.setCookie('categoryName',name);
    },

    getActivePos() {
       let currentItemWidth = this.$refs.cateList.children[this.indexId].offsetWidth;
       let children = this.$refs.cateList.children;

       for(let i = 0 ; i < children.length ; i ++) {
           // if(children[i].offsetLeft > 350) {
              if(this.indexId >= i) {
                this.$refs.cateContainer.scrollLeft = children[this.indexId].offsetLeft - currentItemWidth;
                break;
              }
           // }
       }
    },
     /**
      * [选择不同的分类]
      * @作者     王柳
      * @日期     2018-04-11
      * @param  {[type]}   index [description]
      * @return {[type]}         [description]
      */
    selectChange(index,id,name,e){
      // console.log(e.target.offsetLeft);

      this.indexId = index;
      this.categoryId = id;
      this.categoryName = name;
      
      this.toSingalClass(this.categoryId,this.categoryName);
    },
     /**
     * [获取分类数据]
     * @作者     王柳
     * @日期     2018-03-15
     * @return {[type]}   [description]
     */
    getClassData() {
      this.loading(true);
      this.$http.post("/category/queryCategToValidList", {})
      .then(res => {
        if(res.data.resultdesc == '成功'){
          this.loading(false);
          // console.log(res)
          var classData = [];
          classData = res.data.object.list;
          classData.forEach((item,index) => {
              item = Object.assign({},item,{
                classIndex:index,
              });
              this.$set(this.ClassData,index,item);
          });

          //循环this.ClassData,匹配分类名称是否与当前分类名称相同，相同得到选中的indexId
          this.ClassData.forEach((item,index) => {
            if(item.categoryName == this.categoryName){
              this.indexId = index;
            }
          });


          this.$nextTick(function() {
            //这里需要计算聚焦的这个分类的位置，将之摆到视野区
            this.getActivePos();
          });
        }
      });
    },
    
    /**
     * [获取某一个分类数据]
     * @作者     王柳
     * @日期     2018-03-15
     * @return {[type]}   [description]
     */
    getSingalClassData() {
      this.loading(true);
      var params = {
        page:{
          pageNum:this.pageNum,
          pageSize:this.pageSize
        },
        params:{
         categoryId:this.categoryId
        } 
      }
      this.$http.post("productCategory/queryProductCategoryList",params)
      .then(res => {
        if(res.data.resultdesc == '成功'){
          this.loading(false);
          if(this.pageNum == 1){
            this.SingalClassData = res.data.object.list;
            // this.SingalClassData.forEach((item,index) => {
            //   if(item.coverImgUrl == '' || item.coverImgUrl == null){
            //     item.coverImgUrl = './static/images/morentupian.png';
            //   }
            // });
            this.totalCount = res.data.object.total;
             
            var a_size = this.totalCount % this.pageSize;
            var pageSize = parseInt(this.totalCount / this.pageSize);
           
            // console.log(a_size,pageSize)
            if(a_size != 0){
              this.totalPageNum = pageSize + 1;
            }else{
              this.totalPageNum = pageSize;
            }
            // this.totalPageNum = res.data.object.pages;
            // console.log(this.totalPageNum)
          }else{
            var SingalClassData = [];
            SingalClassData = res.data.object.list;
            SingalClassData.forEach((item,index) => {
              if(item){
                this.SingalClassData.push(item);
              }
            });
          }

          this.SingalClassData.forEach((item,index) => {
            if(item.coverImgUrl == '' || item.coverImgUrl == null){
              item.coverImgUrl = './static/images/morentupian.png';
            }
          });
          
        }
      });
    },
  },
  mounted(){
    this.setCookie('typeIndex',8);
    this.getClassData();
    this.getSingalClassData();
    
    let _this = this;
    
    document.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(document.body.scrollHeight - scrollTop <= window.innerHeight) {
          //滚动到最底部，判断是否需要加载更多
          _this.loadingMore = true;
          if(_this.pageNum < _this.totalPageNum){
              _this.pageNum += 1;
              _this.getSingalClassData();
          }
      }
    }
    
  },
  beforeRouteLeave (to, from, next) {
    document.onscroll = null;
    next();
  },
  updated(){
    var orderList = document.getElementsByClassName('order-nav-list');
  },
  watch:{
    'indexId':function(val) {
      setTimeout(() => {
        this.pageNum = 1;
      },100);
    },
  }
}
</script>


<style lang="less" scoped>
.class-list-main{
  .shop-list-img{
    padding-top: 1.76rem;
    width: 100%;
    height: 2.6rem;
    border-bottom: .08rem solid #eeedf1;
  }

  .search-no-result{
    margin: 3.93rem 0 0 0;
    img{
      width: 4.15rem;
      height: 2.46rem;
      margin: 0 0 .56rem 1.71rem;
    }
    p{
      color: #333;
      font-size: .26rem;
      text-align: center;
    }
  }
}

</style>
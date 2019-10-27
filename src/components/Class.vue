<template>
  <div class="class-main">
    <!-- 搜索框 -->
    <div class="search-box search-box-class">
      <div class="search-box-content" @click.stop="toSearchIndex()"> 
        <div class="search-box-cover"></div>
        <input type="text" name="" placeholder="伙拼平价超市，爆款特卖热销让利..." id="search-input" readonly="readonly" class="search-class">
        <img src="./../assets/images/shousuo-icon@2x.png" height="25" width="25" alt="">
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="class-content-all">
      <div class="class-slider-nav">
        <div class="slider-nav" ref="sliderNav">
          <!-- <SliderNav :ClassNavData="ClassNavData" @getCategoryId="getCategoryId"></SliderNav> -->
          <ul class="slider-nav-ul" ref="sliderNavUl">
            <li 
            :class="index == indexId? 'slider-nav-li active' : 'slider-nav-li'" 
            v-for="(item,index) in ClassNavData"
            @click="selectChange(index,item.id,item.categoryName,$event)">
              {{item.categoryName}}
            </li>
          </ul>
        </div>
      </div>
      <!-- 分类内容 -->
      <div class="class-all">
          <div class="class-content" ref="classContent" v-if="TwoClassData.length > 0">
            <div class="class-content-img">
              <img :src="headImg" alt="" >
              <!-- <img src="./../assets/images/huodongtu@2x.png" alt="" v-else> -->
            </div>
            <ul class="class-content-ul">
              <li class="class-content-li" v-for="(item,index) in TwoClassData">
                <div class="class-content-header">
                  <h3>
                    {{item.categoryName}}
                  </h3>
                  <div class="class-content-header-more" v-show="item.categorylist.length == 0" @click="toThreeClassList(item.id,item.categoryName)">
                    <span>更多</span>
                    <img src="./../assets/images/jiantou@2x.png">
                  </div>
                </div>
                <!-- v-show="item.categoryLevel == 2" -->
                <!-- 如果有三级分类 -->
                <ul class="class-content-list" v-if="item.categorylist.length > 0">
                  <li 
                  class="class-content-item" 
                  v-for="(citem,cindex) in item.categorylist"
                  @click="toThreeClassList(citem.id,citem.categoryName)">
                    <div class="cover" 
                    :style="{background:'url('+citem.categoryImgUrl+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                    </div>
                    <p class="list-item-title">
                     {{citem.categoryName?citem.categoryName.length>20?citem.categoryName.slice(0,20)+"...":citem.categoryName:''}}
                    </p>
                  </li>
                </ul>
                <!-- 如果没有三级分类 -->
                <ul class="class-content-list" v-else>
                  <li 
                  class="class-content-item" 
                  v-for="(citem,cindex) in item.productCategoryList"
                  @click="toDetailsIndex(citem.productId)">
                    <div class="cover" 
                    :style="{background:'url('+citem.coverImgUrl+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                    </div>
                    <p class="list-item-title">
                     {{citem.productName?citem.productName.length>20?citem.productName.slice(0,20)+"...":citem.productName:''}}
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="search-no-result" v-else>
            <img src="./../assets/images/defaultpage_1@2x.png" alt="">
            <p>抱歉，该分类暂无数据</p>
          </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <Footer :navindex="navindex"></Footer>
  </div>
</template>
<script>
import Footer from './common/footer.vue';
// import SliderNav from './common/sliderNav.vue';
export default {
   data () {
    return {
			navindex: 1,
      TwoClassData:[],//某个分类数据
      ClassNavData:[],//分类数据
      categoryId:this.$route.query.id ? this.$route.query.id : '',//分类Id
      categoryName:this.$route.query.categoryName ? this.$route.query.categoryName : '',
      headImg:'',//分类头部图片地址
      // loading:true,
      pageSize:10,
      pageNum:1,
      totalPageNum:0,//总页数
      totalCount:0,//总条数
      indexId:0,//列表头部的选中index
      minHeight:window.innerHeight,
      // 列表导航数据
      // ClassNavData:[{
      //   categoryName:'家居',
      //   classIndex:0,
      //   id:1,
      //   isActive:true
      // },{
      //   categoryName:'新品',
      //   classIndex:1,
      //   id:2,
      //   isActive:false
      // },{
      //   categoryName:'家庭宽带',
      //   classIndex:2,
      //   id:3,
      //   isActive:false
      // },{
      //   categoryName:'智能家居',
      //   classIndex:3,
      //   id:4,
      //   isActive:false
      // },{
      //   categoryName:'区块链',
      //   classIndex:4,
      //   id:5,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:5,
      //   id:6,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:6,
      //   id:7,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:7,
      //   id:8,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:8,
      //   id:9,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:9,
      //   id:10,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:10,
      //   id:11,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:11,
      //   id:12,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:12,
      //   id:13,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:13,
      //   id:14,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:14,
      //   id:15,
      //   isActive:false
      // },{
      //   categoryName:'水果',
      //   classIndex:15,
      //   id:16,
      //   isActive:false
      // }],
    }
  },
  components:{
    Footer,
  },
  methods:{
    //阻止classContent滚动事件冒泡
    // classContentScroll(e){
    //   console.log(1)
    //        e.stopPropagation();
    //        e.returnValue = true;
       
    // },
    //跳转到搜索页面
    toSearchIndex(){
      this.$router.push({
        path:'/searchIndex',
        query:{
          categoryId:this.categoryId,
          categoryName:this.categoryName
        }
      })
    },
    //点击某个商品跳转到商品详情页面
    toDetailsIndex(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id,
          categoryId:this.categoryId,
          categoryName:this.categoryName
        }
      })
    },
    //点击三级分类跳转到某三级分类列表页面
    toThreeClassList(id,name){
      this.$router.push({
        path:'/threeClassList',
        query:{
          id:id,
          categoryId:this.categoryId,
          categoryName:this.categoryName,
          threeCategoryName:name
        }
      })
    },
    //得到子组件改变的CategoryId值
    // getCategoryId(id){
    //   this.categoryId = id;
    //   console.log(this.categoryId)
    // },
    //获取搜索关键字
    getSearchKey(){
      this.$http.post("home/querySearchName", {})
      .then(res => {
        if(res.data.resultdesc == '成功'){
          // console.log(res)
          var searchKey = res.data.object;
          document.getElementById('search-input').setAttribute('placeholder',searchKey);
        }
      });
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
        path:'/class',
        query:{
          id:id,
          categoryName:name
        }
      });
    },
    /**
      * [选择不同的分类]
      * @作者     王柳
      * @日期     2018-04-11
      * @param  {[type]}   index [description]
      * @return {[type]}         [description]
      */
    selectChange(index,id,name,e){
      this.indexId = index;
      this.categoryId = id;
      this.categoryName = name;
      this.setCookie('categoryId',id);
      this.setCookie('categoryName',name);
      this.toSingalClass(this.categoryId,this.categoryName);
    },
    getActivePos() {
       let currentItemHeigth= this.$refs.sliderNavUl.children[this.indexId].offsetHeight;
       let children = this.$refs.sliderNavUl.children;
       for(let i = 0 ; i < children.length ; i ++) {
          if(this.indexId >= i) {
            this.$refs.sliderNav.scrollTop = children[this.indexId].offsetTop + 3*currentItemHeigth - this.minHeight;
            break;
          }
       } 
    },
     /**
     * [获取分类数据]
     * @作者     王柳
     * @日期     2018-03-15
     * @return {[type]}   [description]
     */
    getClassData() {
      this.loading(true);
      this.$http.post("/category/queryCategListByProduct", {
        params:{
          categoryLevel:1
        }
      })
      .then(res => {
        if(res.data.resultdesc == '成功'){
          this.loading(false);
          
          var classData = [];
          classData = res.data.object.list;
          classData.forEach((item,index) => {
              if(item.categoryImgUrl == '' || item.categoryImgUrl == null){
                 item.categoryImgUrl = './static/images/morentupian.png';
              }
              this.$set(this.ClassNavData,index,item);
          });

          //默认获取第一个分类的数据
          if(this.categoryId == ''){
            this.categoryId = this.ClassNavData[0].id;
            this.categoryName = this.ClassNavData[0].categoryName;
            this.getTwoClassData();
          }
          // console.log(this.ClassNavData)
          //循环this.ClassData,匹配分类名称是否与当前分类名称相同，相同得到选中的indexId
          this.ClassNavData.forEach((item,index) => {
            if(item.categoryName == this.categoryName){
              this.indexId = index;
              this.headImg = this.ClassNavData[this.indexId].categoryImgUrl;
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
    getTwoClassData() {
      this.loading(true);
      var params = {
        params:{
         parentId:this.categoryId
        } 
      }
      this.$http.post("/category/queryProductCategoryList",params)
      .then(res => {
        // console.log(res)
        if(res.data.resultdesc == '成功'){
          this.loading(false);
          var TwoClassData = res.data.object.list;
          var newTwoClassData = [];
          TwoClassData.forEach((item,index) => {
            if(item.categorylist.length > 0){//判断是否存在三级分类，如果存在就显示三级分类，如果不存在就显示二级分类的商品
              newTwoClassData.push(item);
            }else{//如果二级分类有商品就显示，如果没有商品就不显示
              if(item.productCategoryList.length > 0){
                newTwoClassData.push(item);
              }
            }
          });
          this.TwoClassData = newTwoClassData;
          // console.log(this.TwoClassData)
          
          this.TwoClassData.forEach((item,index) => {
            if(item.categorylist.length > 0){
              item.categorylist.forEach((citem,cindex) => {
                if(citem.categoryImgUrl == '' || citem.categoryImgUrl == null){
                  citem.categoryImgUrl = './static/images/morentupian.png';
                }
              });
            }else{
              if(item.productCategoryList.length > 0){
                item.productCategoryList.forEach((citem,cindex) => {
                  if(citem.coverImgUrl == '' || citem.coverImgUrl == null){
                    citem.coverImgUrl = './static/images/morentupian.png';
                  }
                });
              }
            }
          });
          // console.log(this.TwoClassData)
        }
      });
    },
	},
  mounted(){
    // console.log(this.categoryName)
    this.setCookie('typeIndex',9);
    this.setCookie('searchIndex',2);
    this.getSearchKey();
    this.getClassData();
    if(this.categoryId != ''){
      this.getTwoClassData();
    }
  },
  watch:{
    'indexId':function(val) {
      this.pageNum = 1;
    },
  }
}
</script>

<style lang="less" scoped>
.class-main{
  width: 100%;
  height: 100%;
  .class-content-all{
    width: 100%;
    height: 100%;
    padding-top: .88rem;
    padding-bottom: 1.0rem;
    box-sizing: border-box;
    .class-slider-nav{
      height: 100%;
      overflow: hidden;
      width: 1.9rem;
      border-right: .01rem solid #f5f5f5;
      background-color: #fff;
      color: #333;
      font-size: .26rem;
      float: left;
      box-sizing: border-box;
      .slider-nav{
         height: 100%;
         overflow-y: scroll;
          z-index: 99;
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
    .slider-nav::-webkit-scrollbar{ 
      width: 0; 
      height: 0;   
      background-color: #fff;  
    }


    .class-all{
      height: 100%;
      overflow: hidden;
      width: 5.6rem;
      background-color: #fff;
      color: #fff;
      float: left;
      box-sizing: border-box;
       .class-content{
         height: 100%;
         overflow-y: scroll;
         z-index: 99;
        /* margin-left: 1.9rem; */
        .class-content-img{
          height: 1.8rem;
          width: 5.3rem;
          margin:.16rem 0 0 .16rem;
        }
        .class-content-header{
          width: 5.6rem;
          margin: 0 auto;
          height: .37rem;
          padding: .36rem 0 0 0;
          font-size: .34rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          h3{
            height: .36rem;
            margin: 0 0 0 .16rem;
            color: #333;
            font-weight: 600;
            font-size: .26rem;
          }
          .class-content-header-more{
            margin-right: .16rem;
            span{
              font-size: .24rem;
              color: #888;
            }
            img{
              width: .22rem;
              height: .22rem;
            }
          }
        }
        
        .class-content-list{
          box-sizing: border-box;
          height: auto;
          width: 5.44rem;
          margin: .16rem 0 0 .16rem;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .class-content-item{
            width: 1.6rem;
            height: 2.3rem;
            margin-bottom: .24rem;
            margin-right: .2rem;
            box-sizing: border-box;
            .cover {
              height: 1.6rem;
              width: 1.6rem;
              margin-bottom: .08rem;
            }
            .list-item-title{
              font-size: .22rem;
              color: #666;
              text-align: center;
              height: .62rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        } 
      }
      .search-no-result{
        box-sizing: border-box;
        width: 5.6rem;
        background-color: #fff;
        color: #fff;
        float: left;
        margin: 2.93rem 0 0 0;
        img{
          width: 4.15rem;
          height: 2.46rem;
          margin: 0 0 .56rem 0.9rem;
        }
        p{
          color: #333;
          font-size: .26rem;
          text-align: center;
        }
      }
    }
  }
}

</style>


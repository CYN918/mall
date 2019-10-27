<template>
  <div class="search-list-main">
    <!-- 头部 -->
    <div class="detail-head" style="background-color:#fff !important">
      <div class="head-all">
        <div class="head-left fl" @click="toBackPre()">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>{{threeCategoryName ? threeCategoryName.length > 14 ? threeCategoryName.slice(0,14) + '...' : threeCategoryName : ''}}</p>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list" v-if="searchResultData.length > 0">
      <ul class="list-ul">
        <li class="list-item fl" v-for="(item,index) in searchResultData" @click="toDetailsIndex(item.productId ? item.productId : item.id)">
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
      searchResultData:[],//搜索结果数据
      categoryName:this.$route.query.categoryName,//分类名称
      categoryId:this.$route.query.id,//分类Id
      threeCategoryName:this.$route.query.threeCategoryName,//三级分类名称
      loadingMore:true,
      pageSize:10,
      pageNum:1,
      totalPageNum:0,//总页数
      totalCount:0,//总条数
    }
  },
  methods:{
    //返回分类页面
    toBackPre(){
      this.$router.push({
        path:'/class',
        query:{
          id:this.getCookie('categoryId'),
          categoryName:this.getCookie('categoryName')
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
          categoryName:this.categoryName,
          threeCategoryName:this.threeCategoryName
        }
      })
    },
    /**
     * [获取三级分类数据]
     * @作者     王柳
     * @日期     2018-04-04
     * @return {[type]}   [description]
     */
    getSearchResultData() {
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
      .then((res) => {
        if(res.data.resultdesc == '成功'){
          this.loading(false);
          if(this.pageNum == 1){
            this.searchResultData = res.data.object.list;
            this.searchResultData.forEach((item,index) => {
              if(item.coverImgUrl == '' || item.coverImgUrl == null){
                item.coverImgUrl = './static/images/zhanweitu@2x.png';
              }
            });
            this.totalCount = res.data.object.total;
             
            var a_size = this.totalCount % this.pageSize;
            var pageSize = parseInt(this.totalCount / this.pageSize);
           
            console.log(a_size,pageSize)
            if(a_size != 0){
              this.totalPageNum = pageSize + 1;
            }else{
              this.totalPageNum = pageSize;
            }
          }else{
            var searchResultData = [];
            searchResultData = res.data.object.list;
            searchResultData.forEach((item,index) => {
              if(item){
                this.searchResultData.push(item);
              }
            });
          }
        }else{
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
   
  },
  mounted(){
    this.setCookie('typeIndex',10);
    this.getSearchResultData();

    let _this = this;
    
    document.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(document.body.scrollHeight - scrollTop <= window.innerHeight) {
          //滚动到最底部，判断是否需要加载更多
          _this.loadingMore = true;
          if(_this.pageNum < _this.totalPageNum){
              _this.pageNum += 1;
              _this.getSearchResultData();
          }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    document.onscroll = null;
    next();
  },
}
</script>


<style lang="less" scoped>
.search-list-main{
  .search-index-box{
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    border-bottom: .01rem solid #eeedf1;
    input{
      background-color: #f5f5f5;
      height: .48rem;
      width: 6.22rem;
      margin:0 .22rem;
      -webkit-border-radius: .24rem;
      border-radius: .24rem;
      position: relative;
      text-indent: .64rem;
    }
    .searchImg{
      width: .25rem;
      height: .25rem;
      position: absolute;
      left: .45rem;
      top: .32rem;
    }
    .deleteImg{
      width: .24rem;
      height: .24rem;
      position: absolute;
      right: 1.26rem;
      top: .33rem;
    }
    span{
      font-size: .28rem;
      color: #666;
    }
  }

  .list{
    padding-top: .88rem;
  }
  .search-no-result{
    margin: 2.93rem 0 0 0;
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
<template>
	<div class="search-index-main">
		<div class="search-index-box">
      <form class="search_serve" action="javascript:return true;" >
         <input 
         type="search" 
         name="search" 
         placeholder="搜索"  
         v-model="searchKey" 
         oninput="if(value.length>28)value=value.slice(0,28);" @keypress="toSearchList($event,searchKey)" id="searchInput"
         >
      </form>
      <img src="./../../assets/images/shousuo-icon@2x.png" height="25" width="25" alt=""  class="searchImg" @click="h5_SearchList(searchKey)">
      <img src="./../../assets/images/clear@2x.png" height="24" width="24" alt="" @click="deleteSearchKey" class="deleteImg" v-show="searchKey != ''">
      <span @click="toBackPre()">取消</span>
    </div>
    <!-- 搜索结果 -->
    <div class="search-index-content">
      <h3>历史搜索</h3>
      <div v-if="historySearchList.length > 0">
        <ul class="search-index-list" :style="{height:(winHeight/100) + 2.0 +'rem',overflow:'scroll'}">
         
          <li class="list-item" v-for="(item,index) in historySearchList" @click="SearchList(item)">
            <!-- {{item ? item.length > 22 ? item.slice(0,22) + '...' : item : ''}} -->
            {{item}}
          </li>
        </ul>
      </div>
      
      <div class="search-index-list" v-else>
        <p class="list-item">暂无搜索记录</p>
      </div>
      <div class="delete-his-btn" @click="clearHistorySearch" v-show="haveHisData">
        <img src="./../../assets/images/delete@2x.png" height="38" width="40">
        <button>清空历史记录</button>
      </div>
    </div>
	</div>
</template>

<script>
import { MessageBox} from 'mint-ui';
import $ from 'jquery';
export default{
	data(){
		return {
      searchKey:'',//搜索关键字
      historySearchList:[],//搜索历史数据
      winHeight:window.innerHeight,
      haveHisData:false,//判断是否存在搜索历史
      categoryId:this.$route.query.categoryId,//分类Id
      categoryName:this.$route.query.categoryName,//分类名称
		}
	},
	methods:{
    toBackPre(){
      if(this.getCookie('searchIndex') == 1){
        this.toPath('/');
      }else if(this.getCookie('searchIndex') == 2){
        this.$router.push({
          path:'/class',
          query:{
            id:this.categoryId,
            categoryName:this.categoryName
          }
        });
      }
    },
    /** [删除搜索关键字] */
    deleteSearchKey(){
      this.searchKey = '';
    },
    //获取搜索关键字
    getSearchKey(){
      this.$http.post("home/querySearchName", {})
      .then(res => {
        if(res.data.resultdesc == '成功'){
          // console.log(res)
          var searchKey = res.data.object;
          document.getElementById('searchInput').setAttribute('placeholder',searchKey);
        }
      });
    },
    /**
     * [跳转到搜索列表页面]
     * @作者     王柳
     * @日期     2018-04-10
     * @return {[type]}   [description]
     */
    toSearchList(e,searchKey){
      var keycode = e.keyCode;
      if(keycode == 13){
        if(searchKey == ''){
          MessageBox.alert('搜索关键字不能为空');
        }else{
          //将搜索关键词保存到本地
          if(localStorage.historySearchList && localStorage.historySearchList !== '') {
             localStorage.setItem('historySearchList',searchKey + ',' + localStorage.historySearchList);
          }else {
             // 此时没有搜索历史
             localStorage.setItem('historySearchList', searchKey);
          }
          this.getSearchKeyData();
          this.searchKey = searchKey;
          this.detailsPath('/searchList',this.searchKey);
          this.setCookie('searchKey',this.searchKey);
        }
      }
    },
    //点击搜索记录列表搜索
    SearchList(searchKey){
      this.searchKey = searchKey;
      this.detailsPath('/searchList',this.searchKey);
      this.setCookie('searchKey',this.searchKey);
    },
    //电脑端点击搜索
    h5_SearchList(searchKey){
      if(searchKey == ''){
        MessageBox.alert('搜索关键字不能为空');
      }else{
        //将搜索关键词保存到本地
        if(localStorage.historySearchList && localStorage.historySearchList !== '') {
           localStorage.setItem('historySearchList',searchKey + ',' + localStorage.historySearchList);
        }else {
           // 此时没有搜索历史
           localStorage.setItem('historySearchList', searchKey);
        }
        this.getSearchKeyData();
        this.searchKey = searchKey;
        this.detailsPath('/searchList',this.searchKey);
        this.setCookie('searchKey',this.searchKey);
      }
    },
    /**
     * [saveSearchKeyData 获取搜索历史数据]
     * @作者     王柳
     * @日期     2018-04-10
     * @return {[type]}   [description]
     */
    getSearchKeyData(){
      let searchList = localStorage.historySearchList ? localStorage.historySearchList : '';
      // console.log(searchList)
       if(searchList != ''){
         this.haveHisData = true;
         let arr = searchList.split(',');
         let newArr = Array.from(new Set(arr));
         let historySearchList = newArr;
         // console.log(historySearchList)
         if(historySearchList.length > 20){
            this.historySearchList = this.historySearchList.slice(0,20);
         }else{
            this.historySearchList = historySearchList;
         }
       }else{
         this.haveHisData = false;
       }
    },
    /**
     * [clearHistorySearch 清空历史记录]
     * @作者     王柳
     * @日期     2018-04-10
     * @return   {[type]}   [description]
     */
    clearHistorySearch() {
        // this.$http.post("/History/Clear", {
        //     objectType:101,
        //     actionType:2,
        //   })
        // .then((res) => {
        //   if (res.data.Success) {
        //       this.historySearchList = [];
        //       this.isHistorySearchShow = false;
        //   }else{
        //      this.$message.error(res.data.Description)
        //   }
        // })
      MessageBox.confirm('是否清空全部历史搜索记录?')
      .then(()=>{
        localStorage.removeItem('historySearchList');
        this.historySearchList = [];
        this.getSearchKeyData();
      }).catch(() => {});
    },
    /**
     * [设置删除按钮的样式]
     * @作者 王柳
     * @日期 2018-04-11
     */
    setDeleteBtnCss(){
      var deleteBtn = document.getElementsByClassName('delete-his-btn');
      // var inputTextBox = document.getElementById('delete-his-btn');
      
      // console.log(document.documentElement.clientWidth, document.body.clientWidth)
      if(this.historySearchList.length < 9 && this.historySearchList.length != 0){
        deleteBtn[0].style.cssText = "position:fixed;bottom:1.0rem;left:2.43rem;";
        $('body').height($('body')[0].clientHeight);
      }else if(this.historySearchList.length > 9){
        deleteBtn[0].style.cssText = "position:relative";
      }else if(this.historySearchList.length == 0){
        deleteBtn[0].style.cssText = "display:none";
      }
    },
    /**
     * [设置输入框得到/失去焦点时，删除按钮的样式]
     * @作者 王柳
     * @日期 2018-04-13
     */
    setFocusDeleteCss(){
      var deleteBtn = document.getElementsByClassName('delete-his-btn');
      $('#searchInput').on('focus',function(){
          deleteBtn[0].style.cssText = "position:relative;bottom:-3.0rem;";  
      }).on('blur',function(){  
          deleteBtn[0].style.cssText = "position:absolute;bottom:1.0rem;left:2.43rem;"; 
          $('body').height($('body')[0].clientHeight);
      });
    },
	},
  created(){

  },
  mounted(){
    this.getSearchKey();
    this.getSearchKeyData();
    
    // this.setFocusDeleteCss();
  },
  updated(){
    $('body').height($('body')[0].clientHeight);
    // this.setDeleteBtnCss();
  }
}
</script>


<style lang="less" scoped>
.search-index-main{
  width: 100%;
  overflow: hidden;
  .search-index-box{
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    border-bottom: .01rem solid #eeedf1;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    .search_serve{
      display: inline;
      width: 6.12rem;
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

  .search-index-content{
    padding-top: .88rem;
    width: 7.02rem;
    margin: 0 auto;
    overflow: hidden;
    h3{
      font-size: .3rem;
      color: #333;
      height: .9rem;
      line-height: .9rem;
    }
    .search-index-list{
      /* height: 9.0rem;
      overflow-y: scroll; */
      color: #666;
      font-size: .3rem;
      .list-item{
        display: flex;
        align-items: center;
        height: 1.0rem;
        /* line-height: 1.0rem; */
        border-bottom: .01rem solid #eeedf1;
        width:100%;
      }
    }
    .delete-his-btn{
      width: 2.64rem;
      height: .56rem;
      margin: 0 auto;
      margin-top: .2rem;
      margin-bottom: 1.2rem;
      position: relative;
      /* bottom: 1.2rem; */
      button{
        width: 100%;
        height: 100%;
        text-align: right;
        font-size: .28rem;
        box-shadow: 0 0 0 .02rem #666;
        border-radius: .28rem;
      }
      img{
        position: absolute;
        left: 0.28rem;
        bottom: 0.09rem;
        width: .4rem;
        height: .38rem;
      }
    }
  }
}

</style>
<template>
  <div class="index-main">
    <!-- 头部 -->
    <div class="main-head" :style="{background:'url(./static/images/banner.png)',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
      <div class="icon icon-serve fr">
        <img src="./../assets/images/ic_service@2x.png"  alt="" @click="toServicePath" >
      </div>
      <div class="icon icon-set fr">
        <img src="./../assets/images/ic_shezhi@2x.png"  alt=""  @click="toPath('/systemSetting')">
      </div>
      <div class="user clear">
        <img src="./../assets/images/ic_head@2x.png" alt="" v-if="godId == ''">
        <img src="./../assets/images/ic_head_moren@2x.png" alt="" v-else>
        
        <span class="login-btn" @click="toPath('/login')" v-if="godId == ''">请注册/登录</span>
        <span class="phone" v-if="phone != ''">{{hidePhone(phone)}}</span>
        <span class="integral"  v-if="phone != ''" @click="toPath('/integral')">积分：{{Integral}}</span>
      </div>
    </div>
    <!-- 订单 -->
    <div class="orders">
      <p>全部订单<a  class="fr" @click="detailsPath('/orderIndex',-1)">查看全部订单<img src="./../assets/images/右箭头.png"  alt="" ></a></p>
      <ul>
      	<li>
      		<a  @click="detailsPath('/orderIndex',0)">
            <img src="../assets/images/ic_payment_a@2x.png"/>
      		  <span>待付款</span>
          </a>
      	</li>
      	<li>
          <a  @click="detailsPath('/orderIndex',2)">
            <img src="../assets/images/ic_delivery@2x.png"/>
            <span>待发货</span>
          </a>
      	</li>
      	<li>
          <a  @click="detailsPath('/orderIndex',3)">
            <img src="../assets/images/ic_goods@2x.png"/>
            <span>待收货</span>
          </a> 
      	</li>
      	<li>
        	<a  @click="detailsPath('/orderIndex',4)">
            <img src="../assets/images/ic_complete@2x.png"/>
            <span>已完成</span>
          </a>
      	</li>
      </ul>
    </div>
    <!-- 我的券包 -->
    <!-- <div class="sale">
      <div class="sale-all" @click="detailsPath('/discount',0)">
        <div class="sale-descri fl">
          <span class="sale-descri-text">我的卡券包</span>
        </div>
        <div class="sale-img fr">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
      </div>
    </div> -->
     <!-- 为你推荐 -->
    <div class="command">
      <div class="command-all">
        <div class="command-head">
          <span class="text">为你推荐</span>
          <div class="line">
            <img src="../assets/images/ic_xian@2x.png"/>
          </div>
        </div>
        <div class="list">
          <ul class="list-ul">
            <li class="list-item fl" v-for="(item,index) in productList" @click="detailsPath('/detail',item.productId)">
              <div class="cover" :style="{background:'url('+item.coverImgUrl+')',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}"></div>
              <!-- <div class="cover">
                <img :src="item.coverImgUrl != ''? item.coverImgUrl : './static/images/morentupian.png'" alt="" class="cover-image">
              </div> -->
              <p class="list-item-title">
               {{item.productName}}
              </p>
               <span class="price">&#165;<span>&nbsp;{{formatPrice(item.price,2)}}</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  	<!-- 底部导航 -->
    <Footer :navindex="navindex" :shoppingCarCount="shoppingCarCount"></Footer>
  </div>
</template>
<script>
import Footer from "./common/footer.vue";
export default {
  data() {
    return {
      navindex: 3,
      godId:'',
      phone:'',
      productList:[],
      shoppingCarCount:'',
      Integral: 0
    };
  },
  methods: {
    //跳转到客户服务
    toServicePath(){
      this.toPath('/customService');
      this.delCookie('typeIndexService');
    },
    getRecommendProduct() {
      this.loading(true);
      this.$http.post("/product/queryProductTuiJianList")
        .then(res => {
          if(res.data.resultdesc == '成功'){
            this.loading(false);
            this.productList = res.data.object.list;
            this.productList.forEach((item,index) => {
              if(item.coverImgUrl == '' || item.coverImgUrl == null){
                item.coverImgUrl = './static/images/zhanweitu@2x.png';
              }
            });
          }
      });
    },
    //获取用户信息
    getUserMessage(){
      var params = {
        params:{
          godId:this.getCookie('godId'),
        }
      };
      this.getData('post','/user/query',params,(res) => {
          //结果
        // console.log(res)
        var result = res.data.result;
        if(result == "000000") {
          this.phone = res.data.object.phone;
          this.godId = res.data.object.godId;
        } else {
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
    getIntegral(){
      let godid = this.getCookie('godId');
      this.$http.get('/integral/getIntegral?godid='+godid).then(res => {
        let result = res.data.result;
        if(result == "000000") {
          this.Integral = res.data.object.integral.integralsum;
        } else {
          MessageBox.alert(res.data.resultdesc);
        }
      });
    }
  },
  mounted() {
    this.setCookie('typeIndex',6);
    this.getUserMessage();
    this.getRecommendProduct();
    this.getIntegral();
  },
  components: {
    Footer
  }
};
</script>

<style lang="less" scoped>
.index-main {
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 1rem;
  background: #f5f5f5;
  .main-head {
    box-sizing: border-box;
    height: 2.9rem;
    padding: 0.16rem 0.24rem 0;
    background: url(./../../static/images/1.png) center bottom no-repeat;
    background-size: cover;
    .icon {
      display: block;
      width: 0.48rem;
    }
    .icon-set {
      margin-right: 0.4rem;
    }
    .user {
      clear: both;
      padding-top: 0.46rem;
      line-height: 1.2rem;
      img {
        display: inline-block;
        width: 1.2rem;
        margin-right: 0.18rem;
        vertical-align: middle;
      }
      .login-btn {
        display: inline-block;
        box-sizing: border-box;
        width: 2.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border: 0.01rem solid #ffffff;
        border-radius: 0.3rem;
        text-align: center;
        font-size: 0.3rem;
        color: #ffffff;
        vertical-align: middle;
        box-shadow: 0 0 0 .01rem #fff;
      }
      .phone {
        font-size: 0.36rem;
        color: #ffffff;
        vertical-align: middle;
      }
      .integral{
        font-size: 0.36rem;
        color: #ffffff;
        vertical-align: middle;
        float: right;
      }
    }
  }
  .orders {
    padding: 0 0.24rem;
    background: #ffffff;
    p {
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      color: #333333;
      a {
        color: #aeaead;
        font-size: 0.24rem;
        img {
          display: inline-block;
          width: 0.24rem;
          vertical-align: middle;
        }
      }
    }
    ul {
      display: flex;
      height: 1.4rem;
      box-sizing: border-box;
      border-top: 0.01rem solid #EEEFF3;
      padding-top: 0.29rem;
      li {
        flex: 1;
        text-align: center;
        img {
          display: block;
          width: 0.48rem;
          height: auto;
          margin: 0 auto;
        }
        span {
          line-height: 0.34rem;
          font-size: 0.24rem;
          columns: #666666;
        }
      }
    }
  }
}

.sale {
  height: 1rem;
  width: 100%;
  border-top: .01rem solid #f5f5f5;
  font-size: 0.28rem;
  background-color: #fff;
  .sale-all {
    padding: 0 0.24rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    color: #333;
    .sale-descri {
      vertical-align: middle;
      .sale-descri-text{
        margin-right:.24rem;
        font-size:.3rem;
        color:#333;
      }
      .sale-descri-btn{
        height: .32rem;
        line-height:.3rem;
        border:.01rem solid #ff1051;
        color:#ff1051;
        border-radius:.16rem;
        font-size:.22rem;
      }
      .shenghao{
        margin-left: .1rem;
      }
    }
    .sale-img {
      height: 0.28rem;
      width: 0.28rem;
      vertical-align: middle;
    }
  }
}


.command {
  height: auto;
  width: 100%;
  .command-all {
    /* width: 7.36rem; */
    width: 100%;
    margin: 0 auto;
    .command-head {
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      background: #fff;
      border-top: .15rem solid #f5f5f5;
      border-bottom: .01rem solid #f5f5f5;
      .text {
        position: relative;
        z-index: 2;
        display: inline-block;
        padding: 0 0.26rem;
        font-size: 0.26rem;
        color: #333;
        
      }
      .line {
        position: absolute;
        z-index: 0;
        left: 0;
        top: 44%;
        transform: translateY(-50%);
        width: 100%;
        /* border: 0.01rem solid #dddddd; */
        img{
          width: 2.3rem;
          height: .07rem;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>


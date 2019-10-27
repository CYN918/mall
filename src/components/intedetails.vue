<template>
  <div class="fill-order-main">
    <!-- 头部 -->
    <div class="fill-head">
      <div class="head-all">
        <div class="head-left fl" @click="toBackPre()">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>积分明细</p>
        </div>
      </div>
    </div>
    <div class="intedata">
      <div class="inte-top" :style="{background:'url(./static/images/intedetails.png)',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'top center'}">
        <span>当前积分</span>
        <em>{{Integral}}</em>
      </div>
      <div class="inte-title">
          <div class="text-left">购买商品</div>
          <div class="text-right">积分值</div>
      </div>
      <ul>
        <!-- <li v-for="item in resdata" :key="item.id">
          <div class="inte-left text-left">
            <span>{{item.umtauschenname}}</span>
            <span class="time">{{item.laufzeit}}</span>
          </div>
          <div class="inte-right text-right">
            <span class="spanbig active">+{{item.integralsum}}</span>
          </div>
        </li> -->
        <li v-for="data in list" :key='data.id'>
          <div class="inte-left text-left">
            <span>{{data.warefname}}</span>
            <span class="time">{{data.laufzeit.slice(0,10)}}</span>
          </div>
          <div class="inte-right text-right">
            <span class="spanbig" :class="data.integralsum.slice(0,1) == '-' ? '' : 'active' "><em v-text="data.integralsum.slice(0,1) == '-' ? '' : '+'"></em>{{data.integralsum}}</span>
          </div>
        </li>
        <!-- <li>
          <div class="inte-left text-left">
            <span>哈密瓜</span>
            <span class="time">2018-8-10 12:58:07</span>
          </div>
          <div class="inte-right text-right">
            <span class="spanbig active">+500.00</span>
          </div>
        </li> -->
      </ul>
    </div>
    <!-- <div class="inte">
      <h2>常见问题：</h2>
      <ul>
        <li>1、积分活动</li>
        <li>2、积分活动</li>
        <li>3、积分活动</li>
      </ul>
    </div> -->
    <div class="nodata" v-if='nodata'>
        <img src="./../assets/images/defaultpage_1@2x.png" alt="">
        <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
      resdata: '',
      list:'',
      Integral: 0,
      nodata: false
    }
  },
  methods:{
    toBackPre(){
      this.toPath('/integral');
    },
    getIntegral(){
      let godid = this.getCookie('godId');
      this.$http.get('/integral/getIntegral?godid='+godid).then(res => {
      //this.getData('get','/integral/getIntegral?godid='+godid,(res) => {
        let result = res.data.result;
        if(result == "000000") {
          this.Integral = res.data.object.integral.integralsum;
        } else {
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
    getdata(){
      let godid = this.getCookie('godId');
      this.$http.get('/integral/getIntegralByGodid?godid='+godid).then(res => {
      //this.getData('get','/integral/getIntegralByGodid?godid='+godid,(res) => {
        let result = res.data.result;
        if(result == "000000") {
          //this.resdata = res.data.object.integralExchanges;
          this.list = res.data.object.integralSetupthe;
          if(this.list == ''){
            this.nodata = true;
          }
        } else {
          MessageBox.alert(res.data.resultdesc);
        }
      });
    }
  },
  created(){
    this.getdata();
    this.getIntegral();
  }
}
</script>

<style lang="less" scoped>
.fill-order-main{
  padding-bottom: 1.0rem;
	.fill-head {
    background-color: #fff !important;
   border-bottom: .01rem solid #EEEFF3;
    box-sizing: border-box;
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    padding: 0 0.24rem;
    text-align: center;
   position: fixed !important;
   top: 0 !important;
   left: 0 !important;
   z-index: 99;
    .head-all {
      height: .88rem;
      .head-left {
        display: inline-block;
        width: 0.44rem;
        line-height: 0.88rem;
        img {
          transform: rotate(180deg) translateX(0.06rem);
          vertical-align: middle;
        }
      }
      .head-title {
        display: inline-block;
        line-height: 0.88rem;
        text-align: center;
        font-size: .36rem;
        width: 5.9rem;
        overflow:hidden; 
        white-space: nowrap;
        text-overflow:ellipsis;
        word-break:break-all;
        position: relative;
        p {
          text-align: center;
        }
        a{
          position: absolute;
          right: 0;
          top: 0.02rem;
          font-size: 0.26rem;
        }
      }
    }
  }
  .nodata{
    margin-top: 0.4rem;
    text-align: center;
    img{
      width: 50%;
    }
    p{
      font-size: 0.2rem;
    }
  }
  .intedata{
    width: 100%;
    border-top: .01rem solid #ddd;
    padding-top: .88rem;
    .inte-top{
      height: 2rem;
      width: 100%;
      overflow: hidden;
      background-size: 100% 100%;
      color: #fff;
      text-align: center;
      margin-bottom: 0.5rem;
      span{
        padding-top: 0.6rem;
        display: block;
        font-size: 0.24rem;
        line-height: 0.4rem;
      }
      em{
        display: block;
        font-style: normal;
        font-size: 0.68rem;
        line-height: 0.8rem;
      }
    }
    .inte-title{
      padding: 0 5%;
      overflow: hidden;
      line-height: 0.5rem;
      div{
        width: 50%;
        float: left;
        font-weight: 700;
        font-size: 0.3rem;
      }
      
    }
    .text-left{
      text-align: left;
      width: 60%;
    }
    .text-right{
      text-align: right;
      width: 40%;
    }
    ul{
      padding: 0 5%;
      li{
        overflow: hidden;
        color: #787578;
        // height: 0.68rem;
        padding-bottom: 0.2rem;
        margin-top: 0.2rem;
        border-bottom: 1px solid #E9E9E9;
        div{
          float: left;
          font-size: 0.26rem;
          line-height: 0.34rem;
          em{
            font-style: normal;
          }
          span{
            display: block;
          }
          span.spanbig{
            font-size: 0.4rem;
            line-height: 0.68rem;
          }
          span.active{
            color: #3168ED;
          }
        }
      }
    }
  }
  .inte{
    padding:0 5%;
    font-size: 0.28rem;
    color: #6D6D6D;
    margin-top: 1rem;
    line-height: 0.4rem;
    h2{
      font-weight: normal;
      font-size: 0.28rem;
      padding-left: 0.4rem;
      background: url("./../assets/images/ic_problem@2x.png") no-repeat left center;
      background-size: 0.32rem 0.32rem;
    }
    ul{
      padding-left: 0.45rem;
    }
  }
}
</style>


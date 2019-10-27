<template>
  <div class="fill-order-main">
    <!-- 头部 -->
    <div class="fill-head">
      <div class="head-all">
        <div class="head-left fl" @click="toBackPre()">
          <img src="./../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>积分兑换</p>
          <router-link to='/intedetails'>积分明细</router-link>
        </div>
      </div>
    </div>
    <div class="integral">
      <div :style="{background:'url(./static/images/integral.png)',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'top center'}">
        <span>积分余额</span>
        <em>{{Integral}}</em>
      </div>
      <button @click="integral()">微码兑积分</button>
    </div>
    <div class="inte">
      <h2 :style="{background:'url(./static/images/ic_problem@2x.png)',backgroundSize:'0.32rem 0.32rem',backgroundRepeat:'no-repeat',backgroundPosition:'left center'}">积分活动规则：</h2>
      <ul>
        <li>1、微码在有效期内均可兑换成商城积分；</li>
        <li>2、每1积分等价{{proportion*1}}元人民币，可购物商城内任何支持积分支付的商品；</li>
        <li>3、每个用户最多可兑换3次；</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { MessageBox ,Toast} from 'mint-ui';
export default {
  data () {
    return {
      Integral:0,
      times:0,
      proportion: 1
    }
  },
  methods:{
    toBackPre(){
      this.toPath('/mine');
    },
    getIntegral(){
      let godid = this.getCookie('godId');
      this.$http.get('/integral/getIntegral?godid='+godid).then(res => {
      //this.getData('get','/integral/getIntegral?godid='+godid,(res) => {
        let result = res.data.result;
        if(result == "000000") {
          this.Integral = res.data.object.integral.integralsum;
          this.times = res.data.object.times;
          this.proportion = res.data.object.integralSetupthes.proportion;
          this.setCookie('proportion',res.data.object.integralSetupthes.proportion);
        } else {
          MessageBox.alert(res.data.resultdesc);
        }
      });
    },
    integral(){
      if(this.times == 3 || this.times > 3){
        Toast('每个账号只能兑换三次哦!');
      }else{
        MessageBox.prompt('请输入微码').then(({ value, action }) => {
          if(action == 'confirm'){
            let godid = this.getCookie('godId');
            this.$http.get('/integral/updateIntegral?godid='+godid+'&name=商城兑换&microcodeCode='+value).then(res => {
            //this.getData('get','/integral/updateIntegral?godid='+godid+'&name=商城兑换&microcodeCode='+value,(res) => {
              let result = res.data.result;
              if(result == "000000") {
                this.getIntegral();
              }
              Toast(res.data.resultdesc);
            });
          }
        });
      }
    }
  },
  created(){
    this.getIntegral();
  }
}
</script>

<style lang="less">
.mint-msgbox-input input{
    padding: 5px 0;
  }
  .mint-msgbox-input{
    padding-top: 0;
  }
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
  .integral{
    width: 100%;
    border-top: .01rem solid #ddd;
    padding-top: .88rem;
    text-align: center;
    div{
      height: 3.52rem;
      width: 100%;
      overflow: hidden;
      background-size: 100% 100%;
      margin-bottom: 1rem;
      color: #fff;
      line-height: 0.5rem;
      span{
        padding-top: 1rem;
        display: block;
        font-size: 0.24rem;
      }
      em{
        display: block;
        font-size: 0.48rem;
      }
    }
    button{
      width: 60%;
      height: 0.8rem;
      color: white;
      background-color: #009EFE;
      border-radius: 0.36rem;
      font-size: 0.3rem;
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
      background-size: 0.32rem 0.32rem;
    }
    ul{
      padding-left: 0.45rem;
    }
  }
}
</style>


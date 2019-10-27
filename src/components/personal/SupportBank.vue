
<template>
  <div class="index-main">
    <!-- 头部 -->
    <div class="detail-head">
      <div class="head-all">
        <div class="head-left fl" @click="toPath('/bankCardBinding')">
          <img src="./../../assets/images/右箭头.png"  alt="" >
        </div>
        <div class="head-title">
          <p>支持银行卡</p>
        </div>
      </div>
    </div>
    <!--注册-->
    <div class="bankList">
    	<ul>
    		<li v-for="(item,index) in bankList">
    			<div class="bankInfo">
    				<div class="bankLt fl">
              <img :src="item.bankLogo"  alt="" >   
            </div>
    				<div class="bankRt fl">
    					<label>{{item.bankname}}</label>
    					<p>
                <span>单笔：{{item.everytimelimit}}，</span>
                <span>每日：{{item.daylimit}}，</span>  
                <span>每月：{{item.monthlimit}}</span>       
              </p>
    				</div>
    			</div>
    		</li>
    	</ul>
    </div>
    
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import bankList1 from '../../assets/js/bankList.js';

export default {
  data () {
    return {
        bankList:[]
    }
  },
  methods:{
  	getBankList(){
  		this.$http.post('/bankLimit/query').then((res) => {
			//结果
			var result = res.data.result;
			if(result == "000000") {
				let bankListArr = res.data.object;

        //这里本地匹配银行的图标
        bankListArr.forEach((item,index)=>{
            bankList1.forEach((citem,cindex)=>{
                if(item.bankname === citem.bankname) {
                    this.bankList.push(Object.assign(item,citem))
                }
            })
        })

        console.log(this.bankList);

			} else {
				MessageBox.confirm(res.data.resultdesc);
			}
		});
  	}
  },
  mounted(){
  	this.getBankList();
  }
}
</script>

<style lang="less" scoped>
.detail-head{
	border-bottom: 0.01rem solid #d7d7d7;
}
.index-main{
	.bankList{
    padding-top: .88rem;
		li{
			padding:.16rem;
      .bankInfo{
        height: 1.2rem;
        width: 100%;
        word-break:break-all;
        /* overflow: hidden; */
        border-bottom: .01rem solid #eee;
        .bankLt{
          margin-right: 0.1rem;
          width: .8rem;
          height: .8rem;
        }
        .bankRt{
          width: 6.0rem;
          word-break:break-all;
          label{
            font-size: .32rem;
            color: #666;
          }
          p{
            font-size: .26rem;
            margin-top: .1rem;
            color: #666;
            word-break:break-word;
          }
        }
      }
      
		}
	}
}
</style>


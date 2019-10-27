<template>
	<div class="index-main">
		<!-- 头部 -->
	    <div class="detail-head">
	      <div class="head-all">
	        <div class="head-left fl" @click="toBackPre()">
	          <img src="./../../assets/images/右箭头.png"  alt="" >
	        </div>
	        <div class="head-title">
	          <p>新建地址</p>
	        </div>
	      </div>
	    </div>
	    
	    <!--添加收货地址-->
	    <div class="addAddress" :style="{height:(winHeight/100) + 4.0 +'rem',overflow:'scroll'}">
	    	<div class="addAddressTop">
	    		<div class="infoGroup">
	    			<label>收货人</label>
	    			<div class="infoInput">
	    				<input type="text" placeholder="请输入收货人姓名" v-model="recipient" oninput="if(value.length>32)value=value.slice(0,32);"/>
	    			</div>
            <!-- value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,''); -->
	    		</div>
	    		<div class="infoGroup">
	    			<label>手机号码</label>
	    			<div class="infoInput">
	    				<input type="number" placeholder="请输入手机号码" v-model="phone" :maxlength="11" oninput="if(value.length>11)value=value.slice(0,11);this.value=this.value.replace(/[^0-9]+/,'');"/>
	    			</div>
	    		</div>
	    		<div class="infoGroup">
	    			<label>所在省市区</label>
	    			<div class="infoInput trigger" id="trigger">
	    				<input type="text" placeholder="请选择所在省市区" readonly="readonly" />
	    			</div>
            <img src="../../../static/images/箭头@2x.png" />
	    		</div>
	    	</div>
	    	<div class="addAddressCenter">
	    		<label>详细地址</label>
	    		<textarea placeholder="请输入收货人详细地址" v-model="address" oninput="if(value.length>128)value=value.slice(0,128);"></textarea>
	    	</div>
	    	<div class="addAddressFoot">
	    		<label>设为常用地址</label>
	    		<div class="defaultBtn fr">
	    			<mt-switch v-model="isDefault"></mt-switch>
	    		</div>
	    	</div>
	    </div>

	    <div class="addAddressBottom">
        <button @click="saveAddress()">保存</button>
      </div>
	</div>
</template>

<script>
import { Popup } from "mint-ui";
import { Switch } from "mint-ui";
import { Picker } from "mint-ui";
import { MessageBox } from "mint-ui";
import MobileSelect from "mobile-select";
export default {
  data() {
    return {
      recipient: "",
      phone: "",
      address: "",
      isDefault: true,
      popupVisible: false,
      province: "",
      city: "",
      district: "",
      winHeight:window.innerHeight,
    };
  },
  methods: {
    toBackPre(){
      if(this.getCookie('addressType') == 2){
        this.toPath('/mine');
      }else if(this.getCookie('addressType') == 1){
        this.toPath('/fillOrder');
      }
    },
    saveAddress() {
      var params = {
        params:{
          godId: this.getCookie("godId"),
          phone: this.phone,
          province: this.province,
          city: this.city,
          district: this.district,
          address: this.address,
          isDefault: this.isDefault == true ? 1 : 0,
          recipient: this.recipient
        }
      };
      if(this.trim(this.recipient) == ''){
        MessageBox.alert("请输入收货人信息");
      }else if(this.phone == ''){
        MessageBox.alert("请输入收货人手机号码");
      }else if(this.validatePhoneAddress(this.phone)){
        if(this.province == ''){
          MessageBox.alert("请选择收货人省市区");
        }else if(this.trim(this.address) == ''){
          MessageBox.alert("请输入收货人详细地址");
        }else{
          this.getData('post','/userAddress/insert',params,(res) => {
            // console.log(res.data.object)
            if(res.data.resultdesc == '成功'){
               if (this.isDefault == true) {
                this.setCookie("isAddress", 1);
              }
              this.toPath("/addressList");
            }else{
              MessageBox.alert(res.data.resultdesc);
            }
          });
        }
      }
    }
  },
  mounted() {
    
    var mobileSelect = new MobileSelect({
      trigger: "#trigger",
      wheels: [oaddr],
      position:[0,0,0],
      callback: (indexArr, data) => {
        this.province = data[0].value;
        this.city = data[1].value;
        this.district = data[2].value;
      }
    });
    // console.log(data)
  }
};
</script>

<style lang="less" scoped>
.index-main {
  .addAddress {
    padding-top: .88rem;
    // min-height: calc(100vh - 2.9rem);
    background: #fff;
    .addAddressTop {
      /* margin-bottom: 0.14rem; */
    }
    .addAddressCenter {
      margin-bottom: 0.14rem;
      background: #ffffff;
      padding: 0.24rem;
      height: 2rem;
      border-top:.15rem solid #eeeff3;
      label {
        display: block;
        margin-bottom: 0.24rem;
        font-size: 0.3rem;
        color: #333333;
      }
      textarea {
        font-size: 0.3rem;
        color: #666666;
        display: block;
        font-family: "Helvetica";
        width: 100%;
        height: 1.2rem;
      }
    }
    .addAddressFoot {
      background: #ffffff;
      padding: 0.24rem;
      border-top:.15rem solid #eeeff3;
      border-bottom: .01rem solid #eeeff3;
      label {
        padding-right: 0.24rem;
        vertical-align: middle;
        font-size: 0.3rem;
        color: #333333;
        line-height: 0.54rem;
      }
      .defaultBtn {
        display: inline-block;
        width: 0.88rem;
        height: 0.54rem;
        vertical-align: middle;
      }
    }
    .infoGroup {
      min-height: 1rem;
      padding: 0 0.24rem;
      background: #ffffff;
      border-bottom: 0.01rem solid #eeeff3;
      position: relative;
      label {
        min-width: 1.6rem;
        max-width: 1.8rem;
        line-height: 1rem;
        padding-right: 0.24rem;
        display: inline-block;
        vertical-align: middle;
        font-size: 0.3rem;
        color: #333333;
      }
      .infoInput {
        display: inline-block;
        input {
          font-size: 0.3rem;
          color: #666666;
          line-height: 1rem;
        }
        .cityPopup {
          width: 7.5rem;
        }
      }
      img {
        width: 0.14rem;
        height: 0.2rem;
        position: absolute;
        right: 0.28rem;
        top: 50%;
        margin-top: -0.1rem;
      }
    }
    .trigger {
      width: 5.0rem;
      overflow-y: hidden;
      line-height: 1rem;
      font-size: 0.3rem;
      vertical-align: middle;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      -webkit-user-select: none;
      -moz-user-focus: none;
      -moz-user-select: none;
      color: #666666;
    }
  }

  .addAddressBottom {
    width: 6.8rem;
    background: #ff0f4f;
    margin-left:.35rem;
    border-radius: .44rem;
    height: .88rem;
    position: relative;
    left: 0;
    bottom: 0;
    z-index: 5;
    button {
      color: #ffffff;
      font-size: 0.32rem;
      line-height: .88rem;
      width: 100%;
      border-radius: .44rem;
      text-align: center;
      button[disabled="disabled"] {
        background: #ffdddb;
      }
    }
  }
}
</style>
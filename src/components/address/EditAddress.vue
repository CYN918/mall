<template>
	<div class="index-main">
		<!-- 头部 -->
		<div class="detail-head">
			<div class="head-all">
				<div class="head-left fl" @click="toPath('/addressList')">
					<img src="./../../assets/images/右箭头.png" alt="">
				</div>
				<div class="head-title">
					<p>编辑地址</p>
				</div>
			</div>
		</div>

		<!--添加收货地址-->
		<div class="addAddress" :style="{height:(winHeight/100) + 4.0 +'rem',overflow:'scroll'}">
			<div class="addAddressTop">
				<div class="infoGroup">
					<label>收货人</label>
					<div class="infoInput">
						<input type="text" v-model="addressInfo.recipient" placeholder="请输入收货人姓名" oninput="if(value.length>32)value=value.slice(0,32);"/>
					</div>
				</div>
				<div class="infoGroup">
					<label>手机号码</label>
					<div class="infoInput">
						<input type="number" placeholder="请输入收货人手机号码" v-model="addressInfo.phone" maxlength="11" oninput="if(value.length>11)value=value.slice(0,11);this.value=this.value.replace(/[^0-9]+/,'');"/>
					</div>
				</div>
				<div class="infoGroup">
					<label>所在省市区</label>
					<div class="infoInput trigger" id="trigger">
						<input type="text" placeholder="请选择所在省市区" readonly="readonly" v-model="country"/>
					</div>
					<img src="../../../static/images/箭头@2x.png" />
				</div>
				<div class="addAddressCenter">
					<label>详细地址</label>
					<textarea placeholder="请输入收货人详细地址" v-model="addressInfo.address" oninput="if(value.length>128)value=value.slice(0,128);"></textarea>
				</div>
				<div class="addAddressFoot">
					<label>设为常用地址</label>
					<div class="defaultBtn fr">
						<mt-switch v-model="isDefault"  @change="turn"></mt-switch>
					</div>
				</div>
			</div>
		</div>

		<div class="addAddressBottom">
			<button @click="editAddressInfo">保存</button>
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
        isDefault:false,
				addressInfo: {
					recipient:'',
					phone:'',
					address:''
				},
				popupVisible: false,
				country: "",
				province: "",
				city: "",
				district: "",
				currPosition: [0, 0, 0],
				winHeight:window.innerHeight,
			};
		},
		methods: {
      turn(){
        console.log(this.isDefault);
      },
			initAddressInfo(addressId) {
				var params = {
	        params:{
	         godId: this.getCookie('godId'),
	         id: addressId
	        } 
	      }
	      this.getData('post','/userAddress/queryById',params,(res) => {
	        // console.log(res.data.object)
	        if(res.data.resultdesc == '成功'){
	          this.addressInfo = res.data.object;
	          this.isDefault = res.data.object.isDefault == 1 ? true: false;
						this.province = res.data.object.province;
						this.city = res.data.object.city;
						this.district = res.data.object.district;
						this.country =
							this.province + " " + this.city + " " + this.district;
	        }else{
	          MessageBox.alert(res.data.resultdesc);
	        }

	        for(var i = 0; i < oaddr.data.length; i++) {
						if(this.province == oaddr.data[i].value) {
							this.currPosition[0] = i;
							for(var j = 0; j < oaddr.data[i].childs.length; j++) {
								if(this.city == oaddr.data[i].childs[j].value) {
									this.currPosition[1] = j;
									if(oaddr.data[i].childs[j].childs) {
										for(
											var k = 0; k < oaddr.data[i].childs[j].childs.length; k++
										) {
											if(
												this.district == oaddr.data[i].childs[j].childs[k].value
											) {
												this.currPosition[2] = k;
												break;
											}
										}
									} else {
										break;
									}
								}
							}
						}
					}
	      });
			},
			editAddressInfo() {
				var params = {
					params:{
						id: this.$route.query.addressId,
						godId: this.getCookie('godId'),
						recipient: this.addressInfo.recipient,
						phone: this.addressInfo.phone,
						province: this.province,
						city: this.city,
						district: this.district,
						address: this.addressInfo.address,
						isDefault: this.isDefault == true ? 1 : 0
					}
				};
				

				if(this.trim(this.addressInfo.recipient) == ''){
	        MessageBox.alert("请输入收货人信息");
	      }else if(this.addressInfo.phone == ''){
	        MessageBox.alert("请输入收货人手机号码");
	      }else if(this.validatePhoneAddress(this.addressInfo.phone)){
	      	if(this.addressInfo.province == ''){
		        MessageBox.alert("请选择收货人省市区");
		      }else if(this.trim(this.addressInfo.address) == ''){
		        MessageBox.alert("请输入收货人详细地址");
		      }else{
			      this.getData('post','/userAddress/update',params,(res) => {
		          // console.log(res.data.object)
		          if(res.data.resultdesc == '成功'){
		              MessageBox.alert("保存成功");
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
			this.initAddressInfo(this.$route.query.addressId);
			this.$nextTick(() => {
					var mobileSelect = new MobileSelect({
					trigger: "#trigger",
					wheels: [oaddr],
					position: this.currPosition,
					callback: (indexArr, data) => {
						// console.log(this.count++)
						this.province = data[0].value;
						this.city = data[1].value;
						this.district = data[2].value;
					}
				});
			})
		},
		// watch:{
		// 	'addressInfo.recipient':function(val,oldVal){
		// 		if(val != oldVal){
		// 			localStorage.setItem('addressId',this.$route.query.addressId);
		// 		}else{
		// 			localStorage.removeItem('addressId');
		// 		}
		// 	},
		// 	'addressInfo.phone':function(val,oldVal){
		// 		if(val != oldVal){
		// 			localStorage.setItem('addressId',this.$route.query.addressId);
		// 		}else{
		// 			localStorage.removeItem('addressId');
		// 		}
		// 	},
		// 	'addressInfo.address':function(val,oldVal){
		// 		if(val != oldVal){
		// 			localStorage.setItem('addressId',this.$route.query.addressId);
		// 		}else{
		// 			localStorage.removeItem('addressId');
		// 		}
		// 	},
		// 	'province':function(val,oldVal){
		// 		if(val != oldVal){
		// 			localStorage.setItem('addressId',this.$route.query.addressId);
		// 		}else{
		// 			localStorage.removeItem('addressId');
		// 		}
		// 	},
		// 	'city':function(val,oldVal){
		// 		if(val != oldVal){
		// 			localStorage.setItem('addressId',this.$route.query.addressId);
		// 		}else{
		// 			localStorage.removeItem('addressId');
		// 		}
		// 	},
		// 	'district':function(val,oldVal){
		// 		if(val != oldVal){
		// 			localStorage.setItem('addressId',this.$route.query.addressId);
		// 		}else{
		// 			localStorage.removeItem('addressId');
		// 		}
		// 	},
		// 	'isDefault':function(val,oldVal){
		// 		if(val != oldVal){
		// 			localStorage.removeItem('addressId');
		// 		}else{
		// 			localStorage.removeItem('addressId');
		// 		}
		// 	},
		// }
	};
</script>

<style lang="less" scoped>
	.index-main {
		.addAddress {
			padding-top: .88rem;
			/* min-height: calc(100vh - 0.9rem); */
			background: #fff;
			overflow: hidden;
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
				.trigger {
					position: relative;
					z-index: 1;
					width: 5.09rem;
					box-sizing: border-box;
					padding-right: 0.2rem;
					line-height: 0.42rem;
					padding: 0.29rem 0.2rem 0.29rem 0;
					font-size: 0.3rem;
					vertical-align: middle;
					-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
					-webkit-user-select: none;
					-moz-user-focus: none;
					-moz-user-select: none;
					color: #666666;
				}
				.infoInput {
					display: inline-block;
					width: 68%;
					/* overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap; */
					input {
						font-size: 0.3rem;
						color: #666666;
						line-height: 1rem;
						width: 100%;
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
				.cityPopup {
					width: 7.5rem;
				}
			}
			/* .addAddressBottom {
				width: 100%;
				height: 1rem;
				position: fixed;
				left: 0;
				bottom: 0;
				z-index: 5;
				button {
					background: #ff1051;
					color: #ffffff;
					font-size: 0.34rem;
					line-height: 1rem;
					width: 100%;
					text-align: center;
				}
				button[disabled="disabled"] {
					background: #ffdddb;
				}
			} */
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
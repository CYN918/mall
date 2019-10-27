<template>
	<div class="index-main">
		<!-- 头部 -->
	    <div class="address-head">
	      <div class="head-all">
	        <div class="head-left fl" @click="toBackaddress">
	          <img src="./../../assets/images/右箭头.png"  alt="" >
	        </div>
	        <div class="head-title">
	          <p>收货地址</p>
	        </div>
	      </div>
	    </div>
	    
	    <!--添加收货地址-->
	    <div class="addressListCon">
	    	<div class="addressList">
	    		<ul>
	    			<li :class="item.isDefault == 1 ? 'item active' : 'item'" v-for="(item,index) in addressList">
	    				<mt-cell-swipe
							  :right="[
							    {
							      content: '删除',
							      style: { background: '#ff1051', color: '#fff' },
							      handler: () => delAddress(item.id)
							    }
							  ]">
						  	<div class="container">
		    					<div class="wrap">
		    						<div class="inner addressInfo">
				    					<div class="addressInfoLt">
				    						<img src="../../../static/images/choose@2x.png" />
				    					</div>
				    					<div class="addressInfoCon">
				    						<div class="addressInfoTop">
				    							<p @click="getOneAddressContent(item.id)">
				    								<!-- <label v-text="item.recipient"></label> -->
				    								<label>{{item.recipient?item.recipient.length>7?item.recipient.slice(0,7)+"...":item.recipient:''}}</label>
				    								<span v-text="item.phone"></span>
				    							</p>
				    							<a href="javascript:;">
				    								<img src="../../../static/images/编辑 .png" @click="editAddress(item.id)"/>
				    							</a>
				    						</div>
				    						<!-- <p class="addressText">{{item.province +" "+ item.city +" "+ item.district  +" "+ item.address}}</p> -->
				    						<p class="addressText">{{item.addressAll ? item.addressAll.length > 24 ? item.addressAll.slice(0,24)+'...' : item.addressAll : ''}}</p>
				    					</div>
				    				</div>
		    					</div>
			    			</div>
							 </mt-cell-swipe>
	    			</li>
	    		</ul>
	    	</div>
	    	<div class="addressListBottom">
	    		<button @click="toPath('/addAddress')">新建地址</button>
	    	</div>
	    </div>
	    
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
    	ckDefault:true,
    	addressList:[],
    	addressAll:'',//拼接的地址
    	addressId:'',
    }
  },
  methods:{
  	//点击某个地址，获取地址内容
  	getOneAddressContent(id){
  		this.addressId = id;
  		this.setCookie('addressId',this.addressId);
  		if(this.getCookie('addressType') == 2){
  			return;
  		}else{
  			// localStorage.removeItem('addressId');
  			this.$router.push({
	  			path:'/fillOrder',
	  			query:{
	  				id:this.addressId
	  			}
	  		})
  		}
  	},
  	//根据addressType的值，返回不同的页面
  	toBackaddress(){
  		if(this.getCookie('addressType') == 1){
  			this.$router.push({
	  			path:'/fillOrder',
	  		});
  		}else{
  			this.toPath('/systemSetting');
  		}
  	},
  	initAddress(){
   		var params = {
   			params:{
   				godId:this.getCookie("godId")
   			}
		  };
			this.getData('post','/userAddress/queryListByGodId',params,(res) => {
		      // console.log(res)
		      if(res.data.resultdesc == '成功'){
		        this.addressList = res.data.object;
		        if(this.addressList.length > 0){
		        	this.addressList.forEach((item,index) => {
			        	var addressAll = item.province +" "+ item.city +" "+ item.district  +" "+ item.address;
			        	item = Object.assign({},item,{
	                addressAll:addressAll
	              });
	              this.$set(this.addressList,index,item);
			        });
		        }else{
		        	this.setCookie('addressId','');
		        }
		      }else{
		        MessageBox.alert(res.data.resultdesc);
		      }
		  });
   },
   	editAddress(addressId){
   		this.$router.push({
   			path:'/editAddress',
   			query:{
   				addressId:addressId
   			}
   		});
   },
   delAddress(addressId){
   	  var params = {
				params:{
					godId:this.getCookie("godId"),
				  id:addressId
				}
			};
			if(addressId == this.getCookie('addressId')){
				this.delCookie('addressId');
			}
   		// MessageBox.confirm('确定删除该地址？')
   		// .then(action => {
				this.getData('post','/userAddress/delete',params,(res) => {
			      // console.log(res)
			      if(res.data.resultdesc == '成功'){
			        this.initAddress();
			      }else{
			        MessageBox.alert(res.data.resultdesc);
			      }
			  });
		 // });
   	}
  },
  mounted(){
  	this.initAddress();
  	this.pushHistory();
  
  },
}
</script>

<style lang="less" scoped>
.index-main{
	.address-head {
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
	      p {
	        text-align: center;
	      }
	    }
	    /* .head-client {
	      width: 0.44rem;
	      line-height: 0.88rem;
	      img {
	        vertical-align: middle;
	      }
	    }
	    .head-manager {
	      height: 0.42rem;
	      width: 0.66rem;
	      font-size: .3rem;
	      span{
	      	line-height:0.42rem;
	      }
	    } */
	  }
	}
	.addressListCon{
		padding-top: .88rem;
		.addressList{
			padding-bottom: 1.0rem;
			li{
				border-bottom: 0.5px solid #EEEFF3;
				/*padding:0.30rem 0.24rem;*/
				.addressInfo{
					position:relative;
					display: inline-block;
    				width: 100%;
    				min-height:1rem;
					img{
						width:0.36rem;
						height:0.36rem;
					}
					.addressInfoLt{
						display: none;
						position: absolute;
						left:0;
						top:50%;
						margin-top:-0.18rem;
					}
					.addressInfoCon{
						width:calc(100% - 0.60rem);
						padding-left: 0.60rem;
						.addressInfoTop{
							position:relative;
							margin-bottom:0.12rem;
							p{
								display: inline-block;
								label{
									font-size: 0.36rem;
									color: #666666;
								}
								span{
									font-size: 0.36rem;
									color: #666666;
									margin-left:0.20rem;
								}
							}
							img{
								float: right;
							}
						}
						p{
							font-size:0.26rem;
							color: #AEAEAD;
							margin-top: .2rem;
						}
					}
				}
			}
			li.active{
				.addressInfoLt{
					display: inline-block;
				}
			}
		}
		.addressListBottom{
			width: 6.8rem;
	    background: #ff0f4f;
	    margin-left:.35rem;
	    border-radius: .44rem;
	    height: .88rem;
	    position: fixed;
	    left: 0;
	    bottom: .6rem;
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
}
</style>
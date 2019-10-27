/*
  这里面定义所有action，也就是store的dispatch方法，用于处理接收组件传入的请求
  所有的流程控制、逻辑处理、异步操作都放在这里面进行
  通过commit提交给mutations，通过type作为两者相连的唯一通道
 */
import * as types from './types.js';
import Vue from 'vue';
import axios from '../http.js'
import { MessageBox } from 'mint-ui';
Vue.prototype.$http = axios;


export default {
	// //这是可以传参数的action
	// add:({commit},index)=>{
	//    index1 = index || 1;
 //       commit(types.ADD,index);
	// },
	// //这是有流程控制的action
	// decrement:({commit,state})=>{
 //       if(state.mutations.count > 0) {
 //          commit(types.DECREMENT);
 //       }
	// },

	// //控制页面的宽高及侧边栏宽度
	// setWindow:({commit},{winWidth,winHeight})=>{
	// 	 commit(types.SETWINDOW,winWidth,winHeight);
	// },

    /**
     * [description]
     * @param  {[type]} options.commit [提交对象]
     * @param  {[type]} options.state  [仓库状态]
     * @param  {[bool]} needUpdate     [是否需要更新购物车数量]
     * @param  {[bool]} ishidden     [是否隐藏购物车数量]
     * @return {[type]}                [description]
     * ,ishidden
     */
    setShoppingCount:({commit,state},needUpdate)=>{
       // if(state.mutations.shoppingCarCount > 0 && !needUpdate) return;
       if(Vue.prototype.getCookie('godId') == '' || Vue.prototype.getCookie('godId') == undefined){
         commit(types.SETSHOPPINGCARCOUNT,0);
       }else{
          //重新请求购物车数量
        var params = {};
        params = {
          params:{
            godId:Vue.prototype.getCookie('godId'),
          } 
        }
        Vue.prototype.getData('post','/shopping/queryCount',params,(res) => {
          // console.log(res.data.object)
          if (res.data.resultdesc == '成功') {
            commit(types.SETSHOPPINGCARCOUNT,res.data.object);
          }else {
            commit(types.SETSHOPPINGCARCOUNT,0);
            // MessageBox.alert(res.data.resultdesc);
          }
        });
      }   
	  },

    setPayData:({commit,state},newPayData) => {
      commit(types.SETPAYDATA,newPayData);
    }
	



}
/*
  这里面只用于对state的操作，不允许进行逻辑、流程、异步等操作
 */

import {
      SETSHOPPINGCARCOUNT,
      SETPAYDATA
       } from './types.js';

import state from './state.js';


const mutations = {
    // [ADD]:(state,index)=>{
    //   state.count += index;
    // },

    [SETSHOPPINGCARCOUNT]:(state,shoppingCarCount)=>{
      state.shoppingCarCount = shoppingCarCount;
    },
    [SETPAYDATA]:(state,payInfo) => {
      state.payInfo = payInfo;
    }
}



export default {
	mutations,
	state,
}

//这里需要将mutations和state一起暴露给index.js
//如果是将state独立出来的，可以另外处理
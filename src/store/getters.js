/*
  这里面定义所有页面需要的展示数据，具体的内容根据具体组件要求来定义
 */
export default {
   //对应vuex.vue组件中的getter
   shoppingCarCount:(state)=>{
     return state.mutations.shoppingCarCount;
   },
   payInfo:(state) => {
   	 return state.mutations.payInfo;
   }
}
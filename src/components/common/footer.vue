<template>
  <div>
    <footer class="footer">
        <ul class="footer-ul">
          <li class="footer-item fl" v-for="(item,index) in footerData" @click="isActive(item.path,index)">
            <img :src="navindex == index ? item.active : item.src" alt="">
            <p :class="navindex == index ? 'isActive' : ''">{{item.title}}</p>
          </li>
          <button class="Shopping-count" v-show="shoppingCarCount != 0">
            {{shoppingCarCount > 99 ? 99+'+' : shoppingCarCount}}
          </button>
        </ul>
    </footer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
   props: ['navindex'],
   computed: mapGetters([
    'shoppingCarCount',
   ]),
   data () {
    return {
			//底部基本数据
			footerData:[{
				src:'./static/images/shouye-icon@2x.png',
				active:'./static/images/shouye-icon-on@2x.png',
				title:'首页',
				isActive:true,
				path:'/'
			},{
        src:'./static/images/ic_classification_a@2x.png',
        active:'./static/images/ic_classification_b@2x.png',
        title:'分类',
        isActive:false,
        path:'/class'
      },{
				src:'./static/images/gouwuche-icon@2x.png',
				active:'./static/images/gouwuche-icon-on@2x.png',
				title:'购物车',
				isActive:false,
				path:'/shoppingCar'
			},{
				src:'./static/images/wode-icon@2x.png',
				active:'./static/images/wode-icon-on@2x.png',
				title:'我的',
				isActive:false,
				path:'/mine'
			}],
    }
  },
  methods:{
    isActive(path,index){
      // if(path == '/shoppingCar'){
      //   this.setCookie('typeIndex',2);
      //   this.toPath(path);
      // }else{
        this.toPath(path);
      // }
    },
	},
  mounted(){
    if(this.navindex == 2) this.$store.dispatch('setShoppingCount',true);
  }
}
</script>

<style lang="less" scoped>
.footer{
      width: 100%;
      height: 1.0rem;
      background-color: white;
      position: fixed;
      bottom: 0;
      left: 0;
      box-shadow: 0 0 .06rem #f1f1f1;
      .footer-ul{
        position: relative;
        margin: 0 auto;
        padding-top: 0.14rem;
        .Shopping-count {
            display: block;
            padding: 0.01rem;
            position: absolute;
            font-size: 0.18rem;
            text-align: center;
            right: 2.3rem;
            top: 0.06rem;
            width: 0.46rem;
            height: 0.26rem;
            line-height: .26rem;
            border-radius: 0.18rem;
            background-color: #ff1051;
            color: white;
          }
        .footer-item{
           height: 100%;
           width: 25%;
           text-align: center;
           img{
            display:block;
            width: 0.40rem;
            height: .40rem;
            margin:0 auto;
           }
           p{
            font-size: 0.28rem;
            color: #888;
           }
           .isActive{
            color: #ff1051;
           }
        }
        
      }
    }
</style>


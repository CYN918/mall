//一期路由
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/Detail'
import ShoppingCar from '@/components/ShoppingCar'
import Mine from '@/components/Mine'
import FillOrder from '@/components/FillOrder'
import OrderPay from '@/components/order/OrderPay'
import PaySuccess from '@/components/order/PaySuccess'
import OrderIndex from '@/components/order/OrderIndex'
import OrderDetail from '@/components/order/OrderDetail'
import SubmitPay from '@/components/common/submitPay'

import Integral from '@/components/Integral'
import Intedetails from '@/components/intedetails'

import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import ForgetPass from '@/components/login/ForgetPass'
import ResetPass from '@/components/login/ResetPass'
import UpdatePass from '@/components/personal/UpdatePass'

import SystemSetting from '@/components/personal/SystemSetting'
import AccountInfo from '@/components/personal/AccountInfo'
import RealName from '@/components/personal/RealName'
import BankCardBinding from '@/components/personal/BankCardBinding'
import SupportBank from '@/components/personal/SupportBank'

import AddressList from '@/components/address/AddressList'
import AddAddress from '@/components/address/AddAddress'
import EditAddress from '@/components/address/EditAddress'

import CustomService from '@/components/common/customService'
import ServiceOnlineContent from '@/components/personal/ServiceOnlineContent'
import Problem from '@/components/common/Problem'
import AboutUs from '@/components/common/AboutUs'
import UserAgreement from '@/components/common/userAgreement'
import AuthoryAgreement from '@/components/common/authoryAgreement'

//二期路由
import SearchIndex from '@/components/common/searchIndex'
import SearchList from '@/components/list/searchList'
import ClassList from '@/components/list/classList'
import Class from '@/components/Class'
import ThreeClass from '@/components/list/threeClassList'

//三期路由
import Discount from '@/components/personal/discount'
import CheckLogistics from '@/components/order/checkLogistics'
import CheckSubpackage from '@/components/order/checkSubpackage'

// 活动页面
import MayEighteen from '@/components/activity/MayEighteen'
import GuideIndex from '@/components/activity/guideIndex'
import VersionUpdate from '@/components/activity/versionUpdate'

Vue.use(Router)
const router =  new Router({
  routes: [
    //一期路由
    {
      path: '/',name: '首页',component: Index,
    },{
      path: '/detail',name: '商品详情',component: Detail
    },{
      path: '/shoppingCar',name: '购物车',component: ShoppingCar
    },{
      path: '/mine',name: '我的',component: Mine
    },
    // 订单
    {
      path: '/orderPay',name: '订单支付',component: OrderPay
    },{
      path: '/paySuccess',name: '支付成功',component: PaySuccess
    },{
      path: '/orderIndex',name: '全部订单',component: OrderIndex
    },{
      path: '/orderDetail',name: '订单详情',component: OrderDetail
    },{
      path: '/fillOrder',name: '填写订单',component: FillOrder
    },{
      path: '/submitPay',name: '提交支付',component: SubmitPay
    },
    // 登录
    {
      path: '/login',name: '登录',component: Login
    },{
      path: '/register',name: '注册',component: Register
    },{
      path: '/forgetPass',name: '忘记密码',component: ForgetPass
    },{
      path: '/resetPass',name: '重置密码',component: ResetPass
    },{
      path: '/updatePass',name: '修改密码',component: UpdatePass
    },
    //系统设置
    {
     	path: '/systemSetting',name: '系统设置',component: SystemSetting,
    },{
     	path: '/accountInfo',name: '账户信息',component: AccountInfo
    },{
     	path: '/realName',name: '实名认证',component: RealName
    },{
     	path: '/bankCardBinding',name: '绑定银行卡',component: BankCardBinding
    },{
     	path: '/supportBank',name: '支持银行',component: SupportBank
    },
    //积分
    {
      path: '/integral', name: '积分兑换', component : Integral
    },
    {
      path:'/intedetails', name: '积分明细', component: Intedetails
    },
    //收货地址
    {
    	path: '/addressList',name: '地址列表',component: AddressList
    },{
     	path: '/addAddress',name: '添加地址',component: AddAddress
    },{
     	path: '/editAddress',name: '修改地址',component: EditAddress
    },
    //客服中心
    {
      path: '/customService',name: '联系客服',component: CustomService
    },{
      path: '/problem',name: '帮助中心',component: Problem
    },{
      path: '/serviceOnlineContent',name: '在线客服',component: ServiceOnlineContent
    },{
      path: '/aboutUs',name: '关于我们',component: AboutUs
    },{
      path: '/userAgreement',name: '用户协议',component: UserAgreement
    },{
      path: '/authoryAgreement',name: '授权协议',component: AuthoryAgreement
    },
    //二期路由
    {
      path: '/searchIndex',name: '全局搜索',component: SearchIndex
    },{
      path: '/searchList',name: '搜索列表',component: SearchList
    },{
      path: '/classList',name: '分类列表',component: ClassList
    },{
      path: '/class',name: '分类',component: Class
    },{
      path: '/threeClassList',name: '三级分类',component: ThreeClass
    },
    //三期路由
    {
      path: '/discount',name: '优惠券',component: Discount 
    },{
      path: '/checkLogistics',name: '物流跟踪',component: CheckLogistics
    },{
      path: '/checkSubpackage',name: '多包裹物流跟踪',component: CheckSubpackage
    },
    // 活动页面
    {
      path: '/guideIndex',name: '新手引导页',component: GuideIndex
    },{
      path: '/MayEighteen',name: '518活动',component: MayEighteen
    },{
      path: '/versionUpdate',name: '版本升级',component: VersionUpdate
    },

  ],
  //每次切换自动切换到目标位置，可自行打印参数
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

//拦截路由
router.beforeEach((to, from, next) => {
   let filterPath = ['/integral','/intedetails','/systemSetting','/orderIndex','/fillOrder','/orderPay','/paySuccess','/orderDetail','/accountInfo','/realName','/bankCardBinding','/updatePass','/addressList','/addAddress','/editAddress'];


   //处理首页滚动
   if(to.path !== '/') document.body.onscroll = null;


   if(filterPath.indexOf(to.path) !== -1) {
      if(Vue.prototype.getCookie('godId')) {
        next();
      }else {
        next('/login');
      }
   }else {
      next();
   }
   
   Vue.prototype.loading(false);



}); 


export default router;
/**
 * 统一配置axios
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
import axios from 'axios'
import qs from 'qs'
import router from './router/index'
import { MessageBox} from 'mint-ui';
// import * as types from './store/types'

// axios 配置
axios.defaults.timeout = 50000;
var domain = 'http://192.168.0.105:81'
var apiUrl = domain + '/hxwj-newwkj-controller';
//var apiUrl = '/hxwj-newwkj-controller';

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.tokenid = 'application/json;charset=UTF-8';
// axios.defaults.withCredentials = true //axios跨域携带cookie的配置

axios.interceptors.request.use(
  config => {
    // console.log(config)
    if(config.method === 'post'){
      // config.data = qs.stringify(Object.assign({},config.data));
      config.data =JSON.stringify(config.data);
    }else if(config.method === 'get'){
      //config.params = Object.assign({},config.params,systemParams);
      config.data =JSON.stringify(config.data);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
/**
 * @DateTime  2017-05-08T09:19:43+0800
 * 拦截器也可以判定返回的response成功时的状态码进行拦截
 */
axios.interceptors.response.use(
  res => {
    // console.log(router)
    if (res.data.result == '10000') { //连接超时
        if(router.currentRoute.path == '/shoppingCar' || router.currentRoute.path == '/mine' || router.currentRoute.path == '/detail' || router.currentRoute.path == '/' || router.currentRoute.path == '/login' || router.currentRoute.path == '/class' || router.currentRoute.path == '/classList'){
          return res;
        }else{
          MessageBox.alert(res.data.resultdesc)
          .then(() => {
            router.push('/login');
          })
        }
    }else{ //请求成功
      return res;
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400: err.message = '请求错误(400)' ; break;
        case 401: err.message = '未授权，请重新登录(401)'; break;
        case 403: err.message = '拒绝访问(403)'; break;
        case 404: err.message = '请求出错(404)'; break;
        case 408: err.message = '请求超时(408)'; break;
        case 500: err.message = '服务器错误(500)'; break;
        case 501: err.message = '服务未实现(501)'; break;
        case 502: err.message = '网络错误(502)'; break;
        case 503: err.message = '服务不可用(503)'; break;
        case 504: err.message = '网络超时(504)'; break;
        case 505: err.message = 'HTTP版本不受支持(505)'; break;
        default: err.message = `连接出错(${err.response.status})!`;
      }
    }
    return Promise.reject(error);
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    // return Promise.reject(error.response.data)
  });

export default axios;

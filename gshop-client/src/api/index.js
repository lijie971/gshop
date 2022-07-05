//包含n个接口请求函数的模块
import ajax from './ajax.js'


const BASE_URL = '/api'
const mockBaseUrl = '/mock'

//根据经纬度获取位置详情   GET请求
export const reqAddress = (geohash) => {
    //发请求:axios发请求返回的是Promise对象
    return ajax(`${BASE_URL}/position/${geohash}`)
}

//获取食品分类列表   GET请求
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')

//根据经纬度获取商铺列表   GET请求
export const reqShopList = (longitude, latitude) => ajax(BASE_URL + '/shops', { longitude, latitude })


//根据经纬度和关键字搜索商铺列表      http://localhost:4000/search_shops  GET请求
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', { geohash, keyword })


//用户名密码登陆     http://localhost:4000/login_pwd  POST请求
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, "POST")


//发送短信验证码    http://localhost:4000/sendcode    GET请求
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })


//手机号验证码登陆    http://localhost:4000/login_sms    POST请求
export const reqSmsLogin = ({ phone, code }) => ajax(BASE_URL + '/login_sms', { phone, code }, "POST")

//根据会话获取用户信息    http://localhost:4000/userinfo    GET请求
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')


//用户登出    http://localhost:4000/logout     GET请求
export const reqLogout = () => ajax(BASE_URL + '/logout')


/**
* 获取商家信息
*/
export const reqShopInfo = () => ajax(mockBaseUrl + '/info')
/**
* 获取商家评价数组
*/
export const reqShopRatings = () => ajax(mockBaseUrl + '/ratings')
/**
* 获取商家商品数组
*/
export const reqShopGoods = () => ajax(mockBaseUrl + '/goods')
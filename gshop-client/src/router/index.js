//该文件专门用于创建整个应用的路由器

import VueRouter from 'vue-router'

import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'

// import Shop from '../pages/Shop/Shop.vue'  //普通写法

//路由懒加载(只有执行此函数时，才加载组件)
const Shop = () => {
    return import('@/pages/Shop/Shop.vue')
}

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
//重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//创建一个路由器
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/msite',
            component: MSite,
            meta: {
                show: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                show: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                show: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                show: true
            }
        },
        {
            path: '/shop',
            component: Shop,
            children: [
                {
                    path: '/shop/goods',
                    component: ShopGoods,
                },
                {
                    path: '/shop/ratings',
                    component: ShopRatings,
                },
                {
                    path: '/shop/info',
                    component: ShopInfo,
                },
                //重定向
                {
                    path: '',
                    redirect: '/shop/goods'
                }
            ]
        },
        //重定向
        {
            path: '*',
            redirect: '/msite'
        }
    ]
})

export default router;
import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types.js'

import {
    reqAddress,
    reqFoodCategorys,
    reqShopList,
    reqUserInfo,
    reqLogout,
    reqShopInfo,
    reqShopRatings,
    reqShopGoods,
    reqSearchShop
} from '@/api'

export default {
    //异步获取地址
    async getAddress({ commit, state }) {
        //发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        //提交到mutation
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, { address })
        }
    },

    //异步获取食品分类列表
    async getCategorys({ commit }) {
        //发送异步ajax请求
        const result = await reqFoodCategorys()
        //提交到mutation
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },

    //异步获取商家列表
    async getShops({ commit, state }) {
        //发送异步ajax请求
        //解构赋值
        const { longitude, latitude } = state
        const result = await reqShopList(longitude, latitude)
        //提交到mutation
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    //同步记录用户信息
    recordUser({ commit }, userInfo) {
        //提交到mutation
        commit(RECEIVE_USER_INFO, { userInfo })
    },

    //异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USER_INFO, { userInfo })
        }
    },

    //异步登出
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    // 异步获取商家信息
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
        }
    },
    // 异步获取商家评价列表
    async getShopRatings({ commit }, callback) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            //数据更新了,通知一下组件
            callback && callback()
        }
    },
    // 异步获取商家商品列表
    async getShopGoods({ commit }, callback) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            //数据更新了,通知一下组件
            callback && callback()
        }
    },
    //同步更新food中的count值
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, { food })
        } else {
            commit(DECREMENT_FOOD_COUNT, { food })
        }
    },
    //同步清空购物车
    clearCart({ commit }) {
        commit(CLEAR_CART)
    },
    //搜索
    async searchShops({ commit, state }, keyword) {
        //发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShop(geohash, keyword)
        if (result.code === 0) {
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS, { searchShops })
        }
    },
}
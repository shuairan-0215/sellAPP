import Vue from "vue"
import Vuex from "vuex"
import { getGoods } from "../api/apis"//引入接口
Vue.use(Vuex)

// 创建一个store仓库
export default new Vuex.Store({
    // 状态：要交互的状态存放
    state: {
        goodsList: [], //商品列表
    },
    // 同步
    mutations: {
        getgoodslist(state, str) {
            state.goodsList = str.data
        },
        // 改变商品数量
        changeNum(state, obj) {
            for (let data of state.goodsList) {
                for (let foods of data.foods) {
                    if (foods.name === obj.name) {
                        foods.num += obj.num
                        return
                    }
                }
            }
        },
        // 清空购物车
        clearCar(state) {
            for (let data of state.goodsList) {
                for (let foods of data.foods) {
                    foods.num = 0
                }
            }
        }

    },
    // 异步
    actions: {
        // 获取商品列表
        async getgoodslist({ commit }) {
            let res = await getGoods()
            commit({
                type: "getgoodslist",
                data: res.data.data
            })
        }
    },
    // 计算属性
    getters: {

        // 计算购物车
        getShopcarList(state) {
            let arr = []
            for (let data of state.goodsList) {
                for (let foods of data.foods) {
                    if (foods.num > 0) {
                        arr.push(foods)
                    }
                }
            }
            return arr
        },


    }
})




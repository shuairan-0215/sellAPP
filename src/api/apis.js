import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:3000/"

//获取商家信息
export var getSeller = () => {
    return axios.get('api/seller')
}

//获取商品列表
export var getGoods = () => {
    return axios.get('/api/goods')
}

//获取评价列表
export var getevaluate = () => {
    return axios.get('api/ratings')
}


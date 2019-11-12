<template>
  <div class="index">
    <div class="top">
      <div class="marchantInfo">
        <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt />
        <div>
          <h2>{{ marchantForm.name }}</h2>
          <p>{{ marchantForm.description }}/{{ marchantForm.deliveryTime }}分钟送达</p>
          <p class="str">{{ supportsStr }}</p>
        </div>
      </div>
      <p class="num">5个</p>
    </div>
    <!-- 导航路由跳转  -->
    <div class="top-nav">
      <span :class="{selected: currentview == '/'}" @click="clicknav('/')">商品</span>
      <span :class="{selected: currentview == '/evaluate'}" @click="clicknav('/evaluate')">评价</span>
      <span :class="{selected: currentview == '/marchant'}" @click="clicknav('/marchant')">商家</span>
    </div>
    <div class="content">
      <router-view />
    </div>
    <!-- 购物车 -->
    <div class="shopcar">
      <!-- 滑动的盒子 -->
      <transition name="slide-fade">
        <div class="slide-box" v-show="show">
          <Shopcar></Shopcar>
        </div>
      </transition>

      <!-- 固定的盒子 -->
      <div class="fixed-box" @click="handleslideBox">
        <div>
          <img :src="changeshopIcon" />
          <label>￥：{{getTotalprice}} 元</label>
        </div>
        <p>配送价格:20元</p>
        <div class="post" v-show="getTotalnum != 0">去结算</div>
        <button class="shopnum" v-show="getTotalnum != 0">{{ getTotalnum }}</button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入接口
import { getSeller } from "../api/apis";

// 引入购物车组件
import Shopcar from "./Shopcar";

export default {
  components: {
    Shopcar
  },
  data() {
    return {
      marchantForm: {}, //商家数据
      currentview: "/", // 当前页面路由
      show: false // 滑动盒子的显示隐藏
    };
  },
  methods: {
    clicknav(path) {
      this.currentview = path;
      this.$router.push(path);
    },
    // 操作滑动盒子
    handleslideBox() {
      this.show = !this.show;
    }
  },
  created() {
    // 路由
    this.currentview = location.hash.replace("#", "");

    // 接收到响应的数据 渲染到页面
    getSeller().then(res => {
      let obj = res.data.data;

      this.marchantForm = obj;
    });
  },
  computed: {
    // 活动促销数组
    supportsStr() {
      //如果此属性不存在，则返回空串，防止报错
      if (!this.marchantForm.supports) return "";

      let str = ``;

      for (let obj of this.marchantForm.supports) {
        str += obj.description + " / ";
      }
      return str;
    },
    // 购物车图标
    changeshopIcon() {
      // 如果购物车有数据  返回亮色的图标
      if (this.$store.getters.getShopcarList.length > 0) {
        return require("../assets/img/icon_shopcar-orange.png");
      } else {
        return require("../assets/img/icon_shopcar.png");
      }
    },
    // 计算总价格
    getTotalprice() {
      let price = 0;

      for (let obj of this.$store.getters.getShopcarList) {
        price += obj.num * obj.price;
      }
      return price;
    },
    // 计算总数量
    getTotalnum() {
      let num = 0;

      for (let obj of this.$store.getters.getShopcarList) {
        num += obj.num;
      }
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    color: #fff;
    background-color: #473930;
    padding: 20px;
    .marchantInfo {
      display: flex;
      img {
        width: 100px;
        height: 100px;
      }
      div {
        margin-left: 20px;
      }
    }
    .str {
      width: 180px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .top-nav {
    display: flex;
    justify-content: space-around;
    line-height: 50px;
    border-bottom: 2px solid #f4f5f7;
  }
  .selected {
    color: #00a0dc;
  }
  .content {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  .shopcar {
    .slide-box {
      width: 100%;
      position: fixed;
      bottom: 60px;
      background-color: rgb(163, 162, 161);
    }
    .fixed-box {
      height: 60px;
      width: 100%;
      background-color: #131d26;
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      img {
        width: 30px;
        height: 30px;
        margin-left: 15px;
        align-items: center;
      }
      label {
        color: #fff;
        font-size: 20px;
        margin-left: 20px;
        line-height: 60px;
      }
      .post {
        width: 100px;
        line-height: 60px;
        background-color: #00a0dc;
        position: fixed;
        right: 0;
        color: #fff;
        text-align: center;
        font-size: 18px;
      }
      .shopnum {
        width: 15px;
        height: 15px;
        border: none;
        border-radius: 50%;
        background-color: red;
        color: #fff;
        line-height: 15px;
        font-size: 10px;
        text-align: center;
        position: fixed;
        bottom: 35px;
        left: 45px;
      }
      p {
        // margin-left: 90px;
      }
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(200px);
    opacity: 0;
  }
}
</style>
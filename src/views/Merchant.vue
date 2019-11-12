<template>
  <div class="merchant">
    <!-- 商家基本信息 -->
    <div class="top1">
      <div>
        <p>{{ shopList.name }}</p>
        <p>
          <Rate disabled :value="shopList.score" />
          <span>({{ shopList.ratingCount }})</span>
          <span>月售{{ shopList.sellCount}}单</span>
        </p>
      </div>
      <p class="like">已收藏</p>
    </div>
    <!-- 配送时间及价格 -->
    <div class="top2">
      <div>
        起送价
        <p>{{ shopList.minPrice }} 元</p>
      </div>
      <div class="shop">
        商家配送
        <p>{{ shopList.deliveryPrice }} 元</p>
      </div>
      <div>
        平均配送时间
        <p>{{ shopList.deliveryTime }} 分钟</p>
      </div>
    </div>
    <!-- 公告和活动 -->
    <div class="notice">
      <h3>公告与活动</h3>
      <p class="text">{{ shopList.bulletin }}</p>

      <div v-for="(item,index) in shopList.supports" :key="index">
        <img src="../assets/img/jain.png" alt />
        <p>{{ item.description }}</p>
      </div>
    </div>
    <!-- 商家实景 -->
    <div class="scenery">
      <h3>商家实景</h3>
      <div id="imgs">
        <!-- <ul class="content"> -->
        <img :src="item" alt v-for="(item,index) in shopList.pics" :key="index" />
        <!-- </ul> -->
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="info" >
      <h3>商家信息</h3>
      <p v-for="(item,index) in shopList.infos" :key="index">{{ item }}</p>

    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";

import BSCroll from "better-scroll";
export default {
  data() {
    return {
      shopList: {}, //商家信息列表
      valueDisabled: 3
    };
  },
  created() {
    getSeller().then(res => {
      this.shopList = res.data.data;
    });

    // let img = new BSCroll("#imgs");
  }
};
</script>

<style lang="less" scoped>
.merchant {
  width: 100%;
  .top1,
  .top2 {
    width: 100%;
    border-bottom: 1px solid #cecccc;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .top2 {
    div {
      flex: 1;
      padding: 0 10px;
      text-align: center;
      p {
        font-size: 20px;
      }
    }
    .shop {
      border-left: 1px solid #cecccc;
      border-right: 1px solid #cecccc;
    }
  }
  .notice {
    padding: 10px 20px;
    .text {
      color: red;
      border-bottom: 1px solid #cecccc;
      padding: 10px;
    }
    div {
      margin: 10px 0;
      padding: 0 10px;
      display: flex;
      img {
        width: 15px;
        height: 15px;
        align-self: center;
        margin-right: 20px;
      }
    }
  }
  .scenery {
    border-bottom: 1px solid #cecccc;
    border-top: 1px solid #cecccc;
    padding: 10px 20px;
    #imgs {
      width: 100%;
      display: flex;
      justify-content: space-around;
      overflow: scroll;
      flex-wrap: nowrap;
      img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
  }
  .info {
    border-bottom: 1px solid #cecccc;
    border-top: 1px solid #cecccc;
    padding: 10px 20px;
    h3{
      margin: 10px 0;
    }
    p {
      border-bottom: 1px solid #cecccc;
      border-top: 1px solid #cecccc;
      padding:10px 0;
    }
  }
}
</style>
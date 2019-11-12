<template>
  <div class="shop">
    <div class="title">
      <h2>购物车</h2>
      <span @click="clearShopcar">清空购物车</span>
    </div>
    <div class="shopcar" v-for="(item,index) in getshop" :key="index">
      <label>{{ item.name }}</label>

      <div>
        <!-- 当前商品小计 -->
        <label class="price">￥：{{ item.num * item.price }}</label>
        <button @click="clickChangNum(-1,item.name)">-</button>
        <label>{{ item.num }}</label>
        <button @click="clickChangNum(+1,item.name)">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  computed: {
    getshop() {
      return this.$store.getters.getShopcarList;
    }
  },
  methods: {
    // 改变- + 数据
    clickChangNum(num, name) {
      this.$store.commit({
        type: "changeNum",
        num,
        name
      });
    },
    // 清空购物车
    clearShopcar() {
      this.$store.commit({
        type:"clearCar"
      })
      
    }
  }
};
</script>

<style lang="less" scoped>
.shop {
  .title {
    width: 100%;
    background-color: #fff;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    color: #00a0dc;
    span {
      line-height: 30px;
    }
  }
  .shopcar {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
    .price {
      color: #fff;
      margin-right: 20px;
    }
    button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #00a0dc;
      border: none;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 20px;
      margin-left: 5px;
    }
  }
}
</style>
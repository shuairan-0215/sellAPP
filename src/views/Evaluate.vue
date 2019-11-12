<template>
  <div class="evaluate">
    <!-- 综合评分 -->
    <div class="grade">
      <div class="grade-right">
        <h1>{{ shopinfo.serviceScore}}</h1>
        <p>综合评分</p>
        <span>高于周边商家30%</span>
      </div>
      <div class="grade-left">
        <p>
          商家评分
          <span>
            <Rate disabled :value="shopinfo.score" />
            {{ shopinfo.score }}
          </span>
        </p>
        <p>
          食品评分
          <span>
            <Rate disabled :value="shopinfo.foodScore" />
            {{ shopinfo.foodScore }}
          </span>
        </p>
        <p>送达时间 {{ shopinfo.deliveryTime }}分钟</p>
      </div>
    </div>
    <!-- 评价详情 -->
    <div class="details">
      <div class="btn">
        <Button type="info" size="small" @click="checkAll">全部({{ evaluateList.length }})</Button>
        <Button type="info" size="small" @click="checkSatisfaction">满意({{satisfaction }})</Button>
        <Button
          type="info"
          size="small"
          @click="checkYawp "
        >不满意({{ evaluateList.length - satisfaction }})</Button>
      </div>
      <p class="check">
        <span>
          <Icon type="md-checkmark-circle" />只看有内容的评价
        </span>
      </p>
      <div class="particulars" v-for="(item,index) in newList" :key="index">
        <img :src="item.avatar" alt />
        <div class="text">
          <p class="time">
            <span>{{ item.username }}</span>
            <span>{{ item.rateTime| filterTime }}</span>
          </p>
          <p class="star">
            <Rate disabled :value="item.score" />
            {{ item.deliveryTime }}分钟送达
          </p>
          <p>{{ item.text }}</p>
          <!-- 推荐 -->
          <div class="recomm">
            <span v-for="(items,i) in item.recommend" :key="i">{{ items }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入评价接口
import { getevaluate } from "../api/apis";
// 引入商家信息
import { getSeller } from "../api/apis";

// 引入moment
import moment from "moment";
import { constants } from "crypto";

export default {
  data() {
    return {
      evaluateList: [], //获取评价列表
      newList: [],
      shopinfo: [],
      commend: []
    };
  },
  created() {
    //接收到响应的数据 渲染到页面
    getevaluate().then(res => {
      this.evaluateList = res.data.data;
      this.newList = res.data.data;
    });

    // 商家信息
    getSeller().then(res => {
      this.shopinfo = res.data.data;
    });
  },
  methods: {
    // 所有
    checkAll() {
      getevaluate().then(res => {
        this.newList = res.data.data;
      });
    },
    // 满意
    checkSatisfaction() {
      let str = [];
      for (let obj of this.evaluateList) {
        if (obj.score == 5) {
          str.push(obj);
        }
      }
      this.newList = str;
    },
    // 不满意
    checkYawp() {
      let strs = [];
      for (let obj of this.evaluateList) {
        if (obj.score !== 5) {
          strs.push(obj);
        }
      }
      this.newList = strs;
    }
  },
  filters: {
    // 过滤时间
    filterTime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  computed: {
    // 计算满意的评论
    satisfaction() {
      let num = 0;
      for (let obj of this.evaluateList) {
        if (obj.score == 5) {
          num++;
        }
      }
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
.evaluate {
  width: 100%;
  height: 100%;
  .grade {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    text-align: center;
    line-height: 30px;
    border-bottom: 1px solid #cecccc;
    .grade-right {
      border-right: 1px solid #cecccc;
      padding: 3px;
      h1 {
        color: #fe9900;
      }
      span {
        color: #d5d6da;
      }
    }
    .grade-left {
      padding: 5px;
      font-size: 14px;
      span {
        color: #fe9900;
      }
    }
  }
  .details {
    .btn {
      padding: 10px 0;
      border-bottom: 1px solid #cecccc;
      button {
        margin: 10px;
      }
    }
    .check {
      border-bottom: 1px solid #cecccc;
      span {
        display: inline-block;
        margin: 20px;
      }
    }
    .particulars {
      display: flex;
      padding: 15px;
      border-bottom: 1px solid #cecccc;
      .text {
        width: 100%;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .time {
        display: flex;
        justify-content: space-around;
      }
    }
    .recomm {
      margin: 8px 0;
      span {
        border: 1px solid #808080;
        margin: 0 10px 15px 0;
      }
    }
  }
}
</style>
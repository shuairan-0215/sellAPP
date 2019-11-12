<template>
  <div class="goods-list">
    <!-- 商品导航 -->
    <div class="left" id="left">
      <ul class="content">
        <ul>
          <li
            v-for="(item,index) in goodsList"
            :key="index"
            @click="clicknav(index)"
            :class="{curbackColor:curitemName == index}"
          >{{ item.name }}</li>
        </ul>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="rightlist" id="rightlist">
      <ul class="content">
        <div class="goods" v-for="(item,index) in goodsList" :key="index" :id="index">
          <!-- 商品分类 -->
          <p class="title">{{ item.name }}</p>
          <div class="goods-box" v-for="(detail,indexs) in item.foods" :key="indexs">
            <!-- 商品信息 -->
            <!-- 右边信息 -->
            <div class="right">
              <img :src="detail.image" alt />
              <div>
                <h4>{{ detail.name }}</h4>
                <p class="text">{{ detail.description }}</p>
                <p>月售{{ detail.sellCount }}份 好评率{{ detail.rating }}%</p>
                <p>
                  <span>￥{{ detail.price }}</span>
                </p>
              </div>
            </div>
            <!-- 加减按钮 -->
            <div class="button">
              <button v-show="detail.num > 0" type="add-button" @click="clickChangNum(-1,detail.name)">-</button>
              <label v-show="detail.num > 0">{{ detail.num }}</label>
              <button type="add-button" @click="clickChangNum(+1,detail.name)">+</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { log } from "util";

// 引入滚动插件
import BScroll from "better-scroll";
import { prototype } from "events";



export default {
  data() {
    return {
      curitemName: 0 //当前的 id
    };
  },
  created() {
    this.$store.dispatch("getgoodslist");
  },
  mounted() {
    let left = new BScroll("#left", {
      click: true //允许点击
    });
    this.rightbox = new BScroll("#rightlist", {
      click: true, //允许点击
      probeType: 3 //监听页面滚动
    });
    this.rightbox.on("scroll", ({ y }) => {
      let _y = Math.abs(y);

      for (let obj of this.getDIvHeight) {
        if (_y >= obj.min && _y < obj.max) {
          this.curitemName = obj.index;
          break;
        }
      }
    });
  },
  computed: {
    // 获取盒子的高度
    getDIvHeight(i) {
      // div盒子的高度
      let arr = [];

      // 当前div盒子总高度
      let total = 0;

      this.goodsList.forEach((item, i) => {
        let divheight = document.getElementById(i).offsetHeight;

        arr.push({ min: total, max: total + divheight, index: i });

        total += divheight;
      });

      return arr;
    },
    goodsList() {
      return this.$store.state.goodsList;
    }
  },
  methods: {
    clicknav(i) {
      this.curitemName = i;
      this.rightbox.scrollToElement(document.getElementById(i), 600);
    },
    // 改变- + 数据
    clickChangNum( num,name ){
      this.$store.commit({
        type:"changeNum",
        num,
        name
      })
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  width: 100%;
  .left {
    width: 90px;
    height: 100%;
    background-color: #f4f5f7;
    overflow: scroll;
    ul {
      height: 100%;
      li {
        text-align: center;
        padding: 15px 4px;
        font-size: 14px;
      }
    }
    .curbackColor {
      background-color: #fff;
        color: #00a0dc;
    }
  }
  .rightlist {
    flex: 1;
    height: 100%;
    overflow: scroll;
    .goods {
      .title {
        background-color: #f4f5f7;
        line-height: 30px;
      }
      .goods-box {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #cecccc;
        justify-content: space-between;
        .right {
          margin-left: 15px;
          display: flex;
          width: 150px;
          img {
            width: 60px;
            height: 60px;
          }
          .text {
            width: 150px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          p {
            span {
              color: red;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
        .button {
          margin-top: 65px;
          // display: flex;
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
    }
  }
}
</style>
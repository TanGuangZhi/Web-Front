<!--
 * @Author: TanGuangZhi
 * @Date: 2022-03-07 17:07:53 Mon
 * @LastEditTime: 2022-03-07 19:44:00 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <view class="details-view">
    <view class="order-top">
      <view class="order-remind">
        <view>下单成功，坐等开吃</view>
        <view>菜品已在制作中</view>
      </view>
    </view>
    <view class="food-list">
      <view class="foot-back">
        <block v-for="(item, index) in goods_data" :key="index">
          <view class="foot-til">
            <text>第{{ goods_data.length - index }}次下单</text>
            <text>下单成功，坐等开吃</text>
          </view>
          <block
            v-for="(item_goods, index_goods) in item.goods_list"
            :key="index_goods"
          >
            <view class="foot-deta">
              <view>
                <image :src="item_goods.image[0].url" mode="aspectFill"></image>
              </view>
              <view class="foot-name">
                <text>{{ item_goods.name }}</text>
                <text v-show="item_goods.good_specs != ''">
                  {{ item_goods.good_specs }}
                </text>
                <text>{{ item_goods.quantity }}{{ item_goods.unit }}</text>
              </view>
              <view class="foot-total">¥{{ item_goods.total_price }}</view>
            </view>
          </block>
          <!-- 展示更多 -->
          <view class="expand-more" v-show="item.max > 3" @click="open(index)">
            <text>展开全部</text>
            <image src="/static/tab/zhankai.svg"></image>
          </view>
        </block>
        <!-- 总计 -->
        <view class="total-view">
          <view>共{{ overall }}份</view>
          <view class="total-price">
            <text>总计</text>
            <text>¥{{ other_data.sett_amount }}</text>
          </view>
        </view>
      </view>
      <!-- 订单号 -->
      <view class="foot-back order-number">
        <text>订单编号：{{ other_data.order_no }}</text>
        <text>下单时间：{{ other_data.order_time }}</text>
        <text>桌台名称：{{ other_data.table_number }}</text>
      </view>
      <view style="height: 300rpx"></view>
    </view>
    <!-- 加菜 -->
    <view class="add-a-dish" v-if="close_dish">
      <view @click="pay()">支付</view>
      <view @click="add_dish()">加菜</view>
    </view>
  </view>
</template>

<script>
//价格补0
const Price = require("e-commerce_price");
export default {
  data() {
    return {
      Price,
      overall: 1, //总共多少份
      other_data: {
        order_no: "1209307hfe19202",
        order_time: "2021-11-9 20:22",
        table_number: "001",
        sett_amount: 13,
      },
      comp_data: [],
      goods_data: [
        {
          goods_list: [
            {
              quantity: 2,
              unit: "盘",
              good_specs: "微辣",
              total_price: 13,
              image: [
                {
                  url: "https://img0.baidu.com/it/u=1663321105,919021246&fm=26&fmt=auto",
                },
              ],
            },
          ],
        },
      ],
      close_dish: true,
    };
  },
  methods: {
    open(index) {
      this.$set(
        this.goods_data[index],
        "goods_list",
        this.comp_data[index].goods_list
      );
      this.$set(this.goods_data[index], "max", 0);
    },
    add_dish() {
      wx.reLaunch({
        url: "/pages/home-page/page",
      });
    },
    //支付
    pay() {
      uni.showModal({
        title: "提示",
        content: "确认支付",
        success: (res) => {
          if (res.confirm) {
            uni.reLaunch({
              url: "../my-order/my-order",
            });
          }
        },
      });
    },
  },
  onLoad(option) {
    var id = option.id;
    var status = option.status;
    if (id != undefined && status != undefined) {
      console.log("undefined");
      this.get_menuother(id);
      if (status == "success") {
        this.close_dish = false;
      }
    } else {
      console.log("yes");
    }
  },
};
</script>

<style>
page {
  background-color: #f4f4f4;
}

.details-view {
  position: relative;
}

.order-top {
  background: linear-gradient(
    to bottom,
    #f7d45f,
    #f7d562,
    #f8d561,
    #f9db76,
    #f9de80
  );
  height: 300rpx;
}

.order-remind view:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  padding-bottom: 20rpx;
}

.order-remind {
  height: 200rpx;
  padding: 50rpx 0 0 50rpx;
}

.food-list {
  position: absolute;
  top: 200rpx;
  left: 20rpx;
  right: 20rpx;
}

.foot-back {
  background-color: #fefefe;
  border-radius: 10rpx;
  padding: 0 20rpx;
  margin-bottom: 30rpx;
}

.foot-til {
  height: 100rpx;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.foot-deta image {
  display: block;
  width: 130rpx;
  height: 130rpx;
  border-radius: 10rpx;
}

.foot-deta {
  display: flex;
  justify-content: space-between;
  height: 130rpx;
  margin: 40rpx 0;
}

.foot-name {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20rpx;
  font-size: 30rpx;
}

.foot-name text:nth-child(1) {
  font-size: 31rpx !important;
  font-weight: bold;
}

.foot-name text:nth-child(2) {
  color: #666666;
}

.foot-total {
  font-weight: bold;
}

/* 展开更多 */
.expand-more image {
  width: 25rpx;
  height: 25rpx;
  display: block;
  padding-left: 10rpx;
}

.expand-more {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  font-size: 25rpx;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f1f1f2;
}

/* 总计 */
.total-price {
  display: flex;
  align-items: center;
  color: #333333;
  padding-left: 40rpx;
}

.total-price text:nth-child(2) {
  font-size: 35rpx;
  font-weight: bold;
  padding-left: 30rpx;
}

.total-view {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30rpx 0;
}

.total-view view:nth-child(1) {
  color: #999999;
}

/* 订单号 */
.order-number text {
  display: block;
  padding: 15rpx 0;
  font-size: 28rpx;
  color: #999999;
}

/* 加菜 */
.add-a-dish {
  background-color: #fefefe;
  height: 120rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
  padding: 0 20rpx;
  z-index: 9;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.add-a-dish view {
  background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a);
  width: 200rpx;
  height: 75rpx;
  line-height: 75rpx;
  text-align: center;
  border-radius: 50rpx;
  font-weight: bold;
  margin-left: 10rpx;
}
</style>

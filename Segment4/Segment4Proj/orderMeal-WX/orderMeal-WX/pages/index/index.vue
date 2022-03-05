<!--
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug　　
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 -->

<template>
  <view>
    <!-- header -->
    <view class="top-view">
      <view class="top-view-flex">
        <!-- icon -->
        <image
          src="/static/tab/fenxiang.svg"
          mode="widthFix"
          class="top-search"
        ></image>
        <image
          src="/static/tab/dingdan.svg"
          mode="widthFix"
          @click="my_order()"
        ></image>
      </view>
    </view>

    <!-- main -->
    <view class="order-view">
      <view class="commodity">
        <!-- aside nav -->
        <view class="order-left">
          <scroll-view
            scroll-y="true"
            class="scroll-Hei"
            :scroll-with-animation="true"
            :enhanced="true"
            :show-scrollbar="false"
          >
            <block v-for="(foodType, index) in foodTypeList" :key="index">
              <view
                class="itemize-text"
                :class="{ active: index == trigger }"
                @click="foodTypeClick(index, foodType._id)"
              >
                <text>{{ foodType._id }}</text>
                <text v-if="choosedMealNum[foodType._id]">
                  {{ choosedMealNum[foodType._id] }}
                </text>
              </view>
            </block>
          </scroll-view>
        </view>

        <!-- show goods -->
        <view class="order-right">
          <scroll-view
            scroll-y="true"
            class="scroll-Hei"
            :scroll-with-animation="true"
            :enhanced="true"
            :show-scrollbar="false"
            :scroll-into-view="scroll_into"
            @scroll="scroLl"
          >
            <view
              class="classif-goods"
              v-for="(food, foodIndex) in foodList"
              :key="foodIndex"
            >
              <view class="goods-image">
                <image
                  :src="'http://localhost:3999/' + food.foodImg"
                  mode="aspectFill"
                ></image>
              </view>
              <view class="goods-Price">
                <view class="goods-name">
                  <text class="Bold">{{ food.foodName }}</text>
                  <text class="Thinning">
                    {{ food.foodType }}
                  </text>
                </view>
                <view class="unit-price">
                  <text class="Thinning">口味: {{ food.foodTag }}</text>
                </view>
              </view>
              <!-- 无规格 -->
              <view class="quantity" v-if="!food.att_hide">
                <view>
                  <image
                    v-if="food.foodQuantity > 0"
                    src="/static/tab/jianhao.png"
                    mode="widthFix"
                    @click.stop="reduce(foodIndex, food)"
                  ></image>
                </view>
                <view>
                  <text v-if="food.foodQuantity > 0">
                    {{ food.foodQuantity }}
                  </text>
                </view>
                <view>
                  <image
                    src="/static/tab/jia.png"
                    mode="widthFix"
                    @click.stop="addToShoppingCar(foodIndex, food)"
                  ></image>
                </view>
              </view>
            </view>
            <view style="height: 400rpx"></view>
          </scroll-view>
        </view>
      </view>

      <!-- footer -->
      <view
        class="order-bottom"
        @click="showShoppingCar()"
        :style="{ 'padding-bottom': Modelmes ? '68rpx' : '' }"
      >
        <!-- shopping car -->
        <view class="Shopping" style="width: 115rpx">
          <view class="Shopping-left">
            <image src="/static/tab/gouwuche.png" mode="widthFix"></image>
          </view>
          <view class="Shopping-number" v-if="total_quantity > 0">
            {{ total_quantity }}
          </view>
        </view>
        <view class="Shopping-title" v-if="total_quantity > 0">
          已点{{ total_quantity }}份菜品
        </view>
        <view
          class="place-order"
          @click.stop="total_quantity == 0 ? false : true && placean_order()"
        >
          <button plain="true" open-type="getUserInfo">选好了</button>
        </view>
      </view>
    </view>

    <!-- show shopping car component -->
    <ShoppingCar
      v-if="isShowShoppingCar"
      :shoppingCarList="shoppingCarList"
    ></ShoppingCar>
    <!-- 引入单个商品弹出 -->
    <Details v-if="popupitem" :pro_details="pro_details"></Details>
    <!-- 骨架屏 -->
    <Home v-if="exist"></Home>
  </view>
</template>

<script>
const app = getApp();
const { Modelmes } = app.globalData;

// 小程序端一次性只返回20条数据；云函数段100条；外部nodejs，java返回10条
// 引入购物车子组件
import ShoppingCar from "./components/shopping-cart.vue";
// 引入单个商品弹出
import Details from "./components/goods-details.vue";
// 订单编号
import { Code } from "../../config/order.js";
// 计算当天的销售额
import { analysis } from "../../config/Date_analysis.js";

export default {
  components: {
    ShoppingCar,
    Details,
  },
  data() {
    return {
      exist: true,
      Modelmes,
      trigger: 0, //类目选中的值
      heightset: [], //存储右边每一个分类菜品的高度
      tophei: 0, //滚动时距离顶部的高度
      scroll_into: "",
      isShowShoppingCar: false, // hide shopping car component
      shoppingCarList: [], // the data that give to shopping car component
      popupitem: false, //单个商品弹出框隐藏
      pro_details: {}, //单个商品弹出框里的数据
      tmplIds: "vyGKdrSGBzESZiILr4aD8cxwSOox6W6xrUfDInWx9aQ", //模板id
      foodList: [],
      foodTypeList: [],
      choosedMealNum: { 荤菜: 0, 素菜: 0 }, // 为了显示左侧选择的总数量
    };
  },
  methods: {
    // ## main
    // 1. query food type
    async queryFoodType() {
      this.foodTypeList = await this.$api.food.queryFoodTypeApi();
      this.queryFood(this.foodTypeList[0]._id);
      //   console.log(this.foodTypeList);
    },

    // 1.1.  query food
    async queryFood(foodType) {
      let queryCondition = {};
      queryCondition.foodType = foodType;
      //   console.log(queryCondition);
      this.foodList = await this.$api.food.queryFoodApi(queryCondition);
      //   console.log("this.foodList:", this.foodList);
    },

    // 2. add to shopping car
    addToShoppingCar(foodIndex, food) {
      let nowFood = this.foodList[foodIndex];
      nowFood.foodQuantity = nowFood.foodQuantity ?? 0;
      nowFood.foodQuantity += 1;
      this.choosedMealNum[food.foodType] += 1;
      this.shoppingCarList.push(nowFood);
    },

    // 2-FD. reduce shopping car
    reduce(foodIndex, food) {
      let nowFood = this.foodList[foodIndex];
      nowFood.foodQuantity -= 1;
      this.choosedMealNum[food.foodType] -= 1;
      this.shoppingCarList.push(nowFood);
    },

    // 2-oth1. show shopping car
    showShoppingCar(value = true) {
      this.isShowShoppingCar = value;
    },

    // ## other
    // oth1. 点击类目加上背景色
    foodTypeClick(index, foodType) {
      this.trigger = index;
      this.queryFood(foodType);
    },

    // oth2. 右边菜品滚动时触发
    scroLl(event) {
      // console.log(event.detail.scrollTop)
      let scrollTop = event.detail.scrollTop;
      if (scrollTop >= this.tophei) {
        //上拉
        // 当前分类商品的高度小于滚动高度时跳转下一个分类
        if (scrollTop >= this.heightset[this.trigger]) {
          this.trigger += 1;
        }
      } else {
        //下拉
        // 当前分类商品的高度大于滚动高度时跳转下一个分类
        if (scrollTop < this.heightset[this.trigger - 1]) {
          this.trigger -= 1;
        }
      }
      this.tophei = scrollTop;
    },
  },
  onLoad() {
    // 获取用餐人数
    // this.number_people = wx.getStorageSync("number_of_diners");
    // this.queryFood();
    this.queryFoodType();
  },

  computed: {
    // 计算购物车的菜品总数
    // total_quantity() {
    //   // var
    //   // let
    //   // const
    //   let quantity = 0;
    //   this.shopping_card.forEach((item) => {
    //     quantity += item.quantity;
    //   });
    //   return quantity;
    // },
  },
};
</script>

<style scoped>
.top-view {
  background: linear-gradient(
    to bottom,
    #f7d45f,
    #f7d562,
    #f8d561,
    #f9db76,
    #f9de80
  );
  height: 120rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.top-view image {
  display: block;
  width: 35rpx;
  height: 35rpx;
}

.top-view-flex {
  display: flex;
  align-items: center;
}

.top-search {
  padding-right: 50rpx;
}

/* 点餐界面 */
.order-view {
  margin-top: 120rpx;
}

.commodity {
  display: flex;
  position: fixed;
  top: 120rpx;
  left: 0;
  right: 0;
}

.order-left {
  background-color: #fafafa;
  width: 150rpx;
  overflow-y: auto;
}

.itemize-text {
  font-size: 27rpx;
  padding: 30rpx 10rpx;
  display: flex;
  align-items: center;
  color: #797979;
}

.itemize-text text:nth-child(1) {
  flex: 1;
}

.itemize-text text:nth-child(2) {
  background-color: #eb5941;
  border-radius: 50%;
  font-size: 20rpx;
  color: #ffffff;
  width: 30rpx;
  height: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rpx;
}

.scroll-Hei {
  height: 100vh;
  /* white-space: nowrap; */
}

.order-right {
  background-color: #ffffff;
  flex: 1;
  overflow-y: auto;
}

.classif {
  font-size: 27rpx;
  padding: 30rpx 20rpx;
  color: #797979;
}

/* 分类商品 */
.classif-goods {
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx;
  height: 150rpx;
  font-size: 30rpx;
  margin-bottom: 45rpx;
}

.goods-image image {
  display: block;
  width: 150rpx;
  height: 150rpx;
  border-radius: 10rpx;
}

.goods-Price {
  flex: 1;
  position: relative;
  padding: 0 20rpx;
}

.goods-Price text {
  display: block;
}

.goods-name {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
}

.goods-name text:nth-child(1) {
  padding-bottom: 9rpx;
}

.unit-price {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: baseline;
}

.Bold {
  font-weight: bold;
}

.Symbol {
  font-size: 20rpx;
}

.Thinning {
  font-size: 25rpx;
  color: #cccccc;
}

.quantity image {
  width: 50rpx;
  height: 50rpx;
}

.quantity view {
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  line-height: 50rpx;
}

.quantity {
  display: flex;
  align-items: center;
  align-self: flex-end;
  width: 200rpx;
  justify-content: space-between;
}

/* 规格 */
.specs-view {
  height: 50rpx;
  width: 100rpx !important;
  border-radius: 50rpx;
  font-size: 25rpx;
  justify-content: center !important;
  position: relative;
  background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a);
}

.specs-view text:nth-child(2) {
  position: absolute;
  right: -10rpx;
  top: -17rpx;
  background-color: #eb5941;
  border-radius: 50%;
  font-size: 20rpx;
  color: #ffffff;
  width: 30rpx;
  height: 30rpx;
  text-align: center;
  line-height: 30rpx;
}

.order-bottom {
  background-color: #fefefe;
  height: 120rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  z-index: 9;
}

.Shopping image {
  width: 75rpx;
  height: 75rpx;
  display: block;
}

.Shopping-left {
  width: 75rpx;
  height: 75rpx;
}

.Shopping {
  display: flex;
  align-items: center;
  /* height: 120rpx; */
}

.Shopping-number {
  align-self: flex-start;
  background: #eb5941;
  color: #ffff;
  width: 40rpx;
  border-radius: 50rpx;
  text-align: center;
  font-size: 20rpx;
  /* margin-top: 15rpx; */
}

.Shopping-title {
  flex: 1;
  padding: 0 25rpx;
  color: #999999;
  /* height: 120rpx;
	line-height: 120rpx; */
}

.place-order button {
  border: none;
  background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a);
  width: 200rpx;
  height: 75rpx;
  line-height: 75rpx;
  border-radius: 50rpx;
  font-weight: bold;
  z-index: 9;
}

/* 点击分类列表加上背景色 */
.active {
  background-color: #ffffff;
  color: #000000 !important;
}
</style>

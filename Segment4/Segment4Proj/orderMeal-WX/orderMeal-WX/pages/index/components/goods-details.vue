<template>
<!-- 单个商品弹出 -->
<view class="details-back">
	<view class="goods-details coup-anim">
		<view class="goods-image">
			<image :src="new_data.res_data.itemgood.image[0].url" mode="aspectFill"></image>
			<image src="/static/tab/guanbi.png" mode="widthFix" @click="cLose()"></image>
		</view>
		<view class="details-padd">
			<view class="details-name">{{new_data.res_data.itemgood.name}}</view>
			<view class="details-Thinning">已售 {{new_data.res_data.itemgood.monthlysale}}</view>
			<view class="describe">
				<view class="details-unit-price">
					<text>¥</text>
					<text>{{new_data.res_data.itemgood.unitprice}}</text>
					<text>/{{new_data.res_data.itemgood.unit}}</text>
				</view>
				<view class="details-quantity">
					<view><image v-if="new_data.res_data.itemgood.quantity > 0" src="/static/tab/jianhao.png" @click="reduce(new_data.res_data)"></image></view>
					<view><text v-if="new_data.res_data.itemgood.quantity > 0">{{new_data.res_data.itemgood.quantity}}</text></view>
					<view><image src="/static/tab/jia.png" @click="plus(new_data.res_data)"></image></view>
				</view>
			</view>
		</view>
		<!-- 有规格 -->
		<view class="details-padd specs-goods" v-if="new_data.res_data.itemgood.att_hide">
			<text class="specs-goods-text">{{new_data.res_data.itemgood.att_name}}</text>
			<view class="specs-goods-flex">
				<block v-for="(item,index) in new_data.res_data.itemgood.specs" :key="index">
				<text @click="menubtn(item.attribute,item.unitprice,new_data.res_data)" :class="{'attr-back' : index == new_data.res_index}">{{item.attribute}}</text>
				</block>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
	</view>
</view>
</template>

<script>
export default{
	props:{pro_details:Object},
	data() {
		return {
			num: -1
		}
	},
	methods:{
		// 关闭弹窗
		cLose(){
			this.$parent.popup_item(false)
		},
		// 选中规格
		menubtn(attribute,unitprice,res_data){
			this.$set(this.pro_details.itemgood,'unitprice',unitprice)
			this.$set(this.pro_details.itemgood,'good_specs',attribute)
			let {index,good_index,cid,itemgood} = res_data
			this.$parent.plus(index,good_index,cid,itemgood,'002')
		},
		
		// -
		reduce(pro_details){
			this.pubLic(pro_details,'RE')
		},
		// +
		plus(pro_details){
			this.pubLic(pro_details,'PL')
		},
		// 加减公用
		pubLic(pro_details,value){
			let {index,good_index,cid,itemgood} = pro_details
			if(itemgood.good_specs == '' && itemgood.att_hide){
				wx.showToast({
					title: '请选择' + itemgood.att_name,
					icon: 'none',
					duration: 1000
				})
				return false
			}
			if(value == 'RE'){
				this.$parent.reduce(index,good_index,cid,itemgood)
			}else{
				this.$parent.plus(index,good_index,cid,itemgood)
			}
		}
	},
	computed:{
		new_data(){
			let data = this.pro_details.itemgood
			let itemindex = data.specs.findIndex(item => item.attribute == data.good_specs)
			return{res_data:this.pro_details,res_index:itemindex}
		}
	}
}
</script>

<style scoped>
@import '../../../style/shadow.css';
.goods-details{height: 900rpx;}
.goods-image{
	width: 100%;
	height: 450rpx;
	position: relative;
}
.goods-image image:nth-child(1){
	display: block;
	width: 100%;
	height: 450rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
}
.goods-image image:nth-child(2){
	display: block;
	width: 50rpx;
	height: 50rpx;
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	border-radius: 50%;
}
.details-padd{
	padding: 20rpx 20rpx 0 20rpx;
}
.describe{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.details-quantity image{
	width: 50rpx;
	height: 50rpx;
	display: block;
}
.details-quantity{
	display: flex;
	align-items: center;
	width: 200rpx;
	justify-content: space-between;
}
.details-name{
	font-size: 35rpx;
	font-weight: bold;
}
.details-Thinning{
	font-size: 30rpx;
	color: #a4a4a4;
	padding: 20rpx 0;
}
.details-unit-price{
	font-size: 30rpx;
	color: #ec702d;
	display: flex;
	align-items: baseline;
}
.details-unit-price text:nth-child(2){
	font-size: 35rpx;
}
.details-unit-price text:nth-child(3){
	color: #999999 !important;
}
/* 规格 */
.specs-goods{
	font-size: 30rpx;
}
.specs-goods-text{
	font-weight: bold;
}
.specs-goods-flex{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.specs-goods-flex text{
	background: #f7f8fa;
	border-radius: 6rpx;
	font-size: 27rpx;
	color: #292c33;
	text-align: center;
	padding: 10rpx 50rpx;
	margin: 20rpx 20rpx 0 0;
}
.attr-back{
	background-color: #f8da81 !important;
}
</style>

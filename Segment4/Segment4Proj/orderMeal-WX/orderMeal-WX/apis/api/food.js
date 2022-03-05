/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-04 14:47:22 Fri
 * @LastEditTime: 2022-03-04 20:18:02 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import { requestApi } from "../requestApi.js";
export default {
	queryBannerApi() {
		return requestApi({
			url: "food/queryBanner",
			method: "GET"
		});
	},
	queryNowFoodApi() {
		return requestApi({
			url: "food/queryHotFood",
			method: "GET"
		});
	},
	queryFoodApi(data) {
		return requestApi({
			url: "food/queryFood",
			method: "GET",
			data
		});
	},
	queryFoodTypeApi() {
		return requestApi({
			url: "food/queryFoodType",
			method: "GET"
		});
	},
	queryFoodByTypeIdApi(typeId) {
		return requestApi({
			url: "food/queryFoodByTypeId",
			data: { typeId },
			method: "GET"
		})
	},
	queryFoodDetailsApi(_id) {
		return requestApi({
			url: "food/queryFoodDetails",
			data: { _id },
			method: "GET"
		})
	}
}

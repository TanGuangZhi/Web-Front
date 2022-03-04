import {BASE_URL} from "./baseURL.js";
export function requestApi(params){
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:"加载中"
		});
		params.url=BASE_URL+params.url;
		uni.request({
			...params,
			success:({data})=>{
				resolve(data);
			},
			complete(){
				uni.hideLoading();
			}
		});
	});
}

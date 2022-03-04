import {requestApi} from "../requestApi.js";
export default{
	queryBannerApi(){
		return requestApi({
			url:"film/queryBanner",
			method:"GET"
		});
	},
	queryNowFilmApi(){
		return requestApi({
			url:"film/queryHotFilm",
			method:"GET"
		});
	},
	queryFutureFilmApi(){
		return requestApi({
			url:"film/queryAfterFilm",
			method:"GET"	
		});
	},
	queryFilmByTypeIdApi(typeId){
		return requestApi({
			url:"film/queryFilmByTypeId",
			data:{typeId},
			method:"GET"
		})
	},
	queryFilmDetailsApi(_id){
		return requestApi({
			url:"film/queryFilmDetails",
			data:{_id},
			method:"GET"
		})
	}
}
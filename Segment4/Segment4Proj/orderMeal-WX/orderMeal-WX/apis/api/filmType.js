import {requestApi} from "../requestApi.js";
export default{
	queryFilmTypeApi(){
		return requestApi({
			url:"film/queryType",
			method:"GET"
		});
	}
}
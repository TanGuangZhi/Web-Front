// 模拟后端数据(DB)
let mockMovieList=[];
let movieStr=localStorage.getItem("movieList");
if(movieStr!=null){
    mockMovieList=JSON.parse(movieStr);
}else{
    let movieData=Mock.mock({
        "movieList|10-15": [
            {
                "id|+1": 1,
                "movieName": /(蜗牛|犀牛)\d(pro|plus)/,
                "moviePrice": /[1-9]{3,5}\.[8-9]{1,2}/,
                "movieType": /(手机|平板|功能机)/,
                "movieImg": /\.\/img\/film\/([1-9])\.jpg/,   // \/ 等价于"/"   \. 等于"."
                "movieStatus":"right"
            }
        ]
    });
    mockMovieList=movieData.movieList;
    localStorage.setItem("movieList",JSON.stringify(mockMovieList));
}



// 查询商品方法
Mock.mock("/movie/queryMovie", "get", function (obj) {
    return mockMovieList.filter(value=>value.movieStatus=="right");
});

// 添加商品方法
Mock.mock("/movie/addMovie", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    mockMovieList.push(jsonObj);
    localStorage.setItem("movieList",JSON.stringify(mockMovieList));
    return {
        "status": "200",
        "message": "添加成功",
        "list": mockMovieList
    };
});

// 删除商品方法
Mock.mock("/movie/deleteMovie", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    mockMovieList[jsonObj.index].movieStatus = "deleted";
    localStorage.setItem("movieList",JSON.stringify(mockMovieList));
    return {
        "status": "200",
        "message": "删除成功",
        "list": mockMovieList
    };
});

// 批量删除商品方法
Mock.mock("/movie/deleteMovieBatch", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = unescape(decodeURI(obj.body));//index=0
    let delArr =  requestData.split("=")[1];
    delArr= delArr.split(",");
    let delLength = 0; // 消除删除一个数后对后续删除造成的影响
    delArr.forEach(element => {
        mockMovieList[element].movieStatus = "deleted";
    });
    localStorage.setItem("movieList",JSON.stringify(mockMovieList));
    return {
        "status": "200",
        "message": "批量删除成功",
        "list": mockMovieList
    };
});

// 修改商品方法
Mock.mock("/movie/updateMovie", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    mockMovieList[jsonObj.index].movieName = jsonObj.movieName;
    mockMovieList[jsonObj.index].moviePrice = jsonObj.moviePrice;
    mockMovieList[jsonObj.index].movieType = jsonObj.movieType;
    mockMovieList[jsonObj.index].movieImg = jsonObj.movieImg;
    localStorage.setItem("movieList",JSON.stringify(mockMovieList));
    return {
        "status": "200",
        "message": "修改成功",
        "list": mockMovieList
    };
});


Mock.mock("/user/addUser", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);
    mockData.userList.push(jsonObj);
    return 1;
})


//index=0&userName=张三&userPass=123456===>变成一个json对象{"index":"0","userName":"张三","userPass":"123456"}
//index=0==> {"index":"0"}

function converter(str) {
    let fieldArray = str.split("&");
    let res = `{`;
    for (let field of fieldArray) {
        res += `"${field.split("=")[0]}":"${field.split("=")[1]}",`;
    }
    //删除最后一个逗号...
    res = res.substring(0, res.length - 1);
    res += `}`;
    return JSON.parse(res);
}
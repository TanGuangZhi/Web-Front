// 模拟后端数据(DB)
let mockgoodsList = [];
let goodsStr = localStorage.getItem("goodsList");
if (goodsStr != null) {
    mockgoodsList = JSON.parse(goodsStr);
} else {
    let goodsData = Mock.mock({
        "goodsList|20-30": [
            {
                "id|+1": 1,
                "goodsName": /(蜗牛|犀牛)\d(pro|plus)/,
                "goodsPrice": /[1-9]{3,5}\.[8-9]{1,2}/,
                "goodsColor": /(太空黑|琉璃彩|土豪金)/,
                "goodsMemory": /(64|256|512|1T)/,
                "goodsType": /(手机|平板|笔记本|智能穿戴)/,
                "goodsImg": /\.\/img\/banner([15])\.png/,   // \/ 等价于"/"   \. 等于"."
                "goodsDetailInfo": /(1|2|3)/,
                "goodsComment|3-6":[{
                    commenter:"@cname",
                    content:"@csentence(10,25)",
                    date:"@date"
                }],
                "goodsStatus": "right"
            }
        ]
    });
    mockgoodsList = goodsData.goodsList;
    localStorage.setItem("goodsList", JSON.stringify(mockgoodsList));
    localStorage.setItem("shoppingCartList", JSON.stringify(mockgoodsList));
}

// 查询评论方法
Mock.mock("/comment/queryComment", "post", function (obj) {
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    console.log(1)
    return mockgoodsList[jsonObj.id].goodsComment;
});

// 查询商品方法
Mock.mock("/goods/querygoods", "get", function (obj) {
    return mockgoodsList.filter(value => value.goodsStatus == "right");
});

// 添加商品方法
Mock.mock("/goods/addgoods", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    mockgoodsList.push(jsonObj);
    localStorage.setItem("goodsList", JSON.stringify(mockgoodsList));
    return {
        "status": "200",
        "message": "添加成功",
        "list": mockgoodsList
    };
});

// 删除商品方法
Mock.mock("/goods/deletegoods", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    mockgoodsList[jsonObj.index].goodsStatus = "deleted";
    localStorage.setItem("goodsList", JSON.stringify(mockgoodsList));
    return {
        "status": "200",
        "message": "删除成功",
        "list": mockgoodsList
    };
});

// 批量删除商品方法
Mock.mock("/goods/deletegoodsBatch", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = unescape(decodeURI(obj.body));//index=0
    let delArr = requestData.split("=")[1];
    delArr = delArr.split(",");
    let delLength = 0; // 消除删除一个数后对后续删除造成的影响
    delArr.forEach(element => {
        mockgoodsList[element].goodsStatus = "deleted";
    });
    localStorage.setItem("goodsList", JSON.stringify(mockgoodsList));
    return {
        "status": "200",
        "message": "批量删除成功",
        "list": mockgoodsList
    };
});

// 修改商品方法
Mock.mock("/goods/updategoods", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    mockgoodsList[jsonObj.index].goodsName = jsonObj.goodsName;
    mockgoodsList[jsonObj.index].goodsPrice = jsonObj.goodsPrice;
    mockgoodsList[jsonObj.index].goodsType = jsonObj.goodsType;
    mockgoodsList[jsonObj.index].goodsImg = jsonObj.goodsImg;
    localStorage.setItem("goodsList", JSON.stringify(mockgoodsList));
    return {
        "status": "200",
        "message": "修改成功",
        "list": mockgoodsList
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
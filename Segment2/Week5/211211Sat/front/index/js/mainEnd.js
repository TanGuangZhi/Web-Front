let nowAllInfoList;

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
                "goodsName": /(菠萝|苹果|锤子|大米)\d(pro|plus)/,
                "goodsPrice": /[1-9]{3,5}\.[8-9]{1,2}/,
                "goodsColor": /(太空黑|琉璃彩|土豪金)/,
                "goodsMemory": /(64|256|512|1T)/,
                "goodsType": /(手机|平板|笔记本|智能穿戴)/,
                "goodsImg": /\.\/img\/banner([1-5])\.png/,   // \/ 等价于"/"   \. 等于"."
                "goodsDetailInfo": /(1|2|3)/,
                "goodsComment|3-6": [{
                    commenter: "@cname",
                    content: "@csentence(10,25)",
                    date: "@date"
                }],
                "goodsStatus": "right"
            }
        ]
    });
    mockgoodsList = goodsData.goodsList;
    localStorage.setItem("goodsList", JSON.stringify(mockgoodsList));
    localStorage.setItem("goodsListLength", JSON.stringify(mockgoodsList.length));
    localStorage.setItem("shoppingCartList", JSON.stringify(mockgoodsList));
}

// 查询商品方法
Mock.mock("/goods/querygoods", "post", function (obj) {
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    allGoodsInfoList = goodsList;
    localStorage.setItem("allGoodsInfoList", JSON.stringify(allGoodsInfoList));
    allGoodsInfoList = allGoodsInfoList.filter(value => value.goodsStatus == "right");

    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);//{"index":"0"}
    let limitGoodsName, limitGoodsType;
    try {
        // 条件查询开始
        limitGoodsName = jsonObj["limit[goodsName]"] ?? JSON.parse(localStorage.getItem("limitGoodsName"));
        limitGoodsType = jsonObj["limit[goodsType]"] ?? JSON.parse(localStorage.getItem("limitGoodsType"));
        // 持久化限制条件,防止界面刷新导致分页查询时limit条件更改
        localStorage.setItem("limitGoodsName", JSON.stringify(limitGoodsName));
        localStorage.setItem("limitGoodsType", JSON.stringify(limitGoodsType));

        let goodsSearchedByRulesArr = [];
        goodsList.forEach(element => {
            // 使用indexof实现名字模糊查询
            let nameTemp = element.goodsName.indexOf(limitGoodsName) != -1 || !limitGoodsName;
            // 此处逻辑:如果已有数组中类型等于界面输入,OK
            // 或者界面输入的是空字符串,代表查询全部,则也OK
            let typeTemp = element.goodsType == limitGoodsType || !limitGoodsType;
            // let statusTemp = element.checkStatus == checkStatus || !checkStatus;
            if (nameTemp && typeTemp) {
                goodsSearchedByRulesArr.push(element);
            }

        });
        nowAllInfoList = goodsSearchedByRulesArr;
        // localStorage.setItem("nowAllInfoList", JSON.stringify(nowAllInfoList));

    } catch (error) {

    }

    let temp = parseInt(jsonObj.nowPage);//接收传递过来的页码
    if (temp < 0) {//说明点了上一页或者下一页
        if (temp == -3 && nowPage > 1) {//说明点了上一页,并且当前页数不是第一页
            nowPage--;
        }

        if (temp == -2 && nowPage < Math.ceil(nowAllInfoList.length / pageCount)) {//点了下一页，并且当前不是最后一页
            nowPage++;
        }
    } else {//说明点了 数字页码
        nowPage = temp;
    }

    let list = [];
    let returnList = {};
    //防止取出最后一页的时候出现数组越界问题endIndex 一定会<=nowAllInfoList.length
    let endIndex = nowPage * pageCount <= nowAllInfoList.length ? nowPage * pageCount : nowAllInfoList.length;
    for (let i = (nowPage - 1) * pageCount; i < endIndex; i++) {
        list.push(nowAllInfoList[i]);
    }
    returnList.nowPage = nowPage;
    returnList.list = list;
    return returnList;
});

//动态商品生成数字页码
let nowPage = 1;//当前显示的页数
let pageCount = 9;//一页显示的最大数据条数
Mock.mock("/goods/queryGoodsPage", "get", function (obj) {
    if(!nowAllInfoList) return;
    return Math.ceil(nowAllInfoList.length / pageCount);
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


// ============================模拟后端评论数据(DB)
let mockCommentList = [];
let commentStr = localStorage.getItem("commentList");
if (commentStr != null) {
    mockCommentList = JSON.parse(commentStr);
} else {
    let commentData = Mock.mock({
        "commentList|20-30": [
            {
                "goodsId|+1": 1,
                "comment|3-6": [{
                    "userId": /[1-9]/,
                    commenter: "@cname",
                    content: "@csentence(10,25)",
                    date: "@date"
                }],
            }
        ]
    });
    mockCommentList = commentData.commentList;
    localStorage.setItem("commentList", JSON.stringify(mockCommentList));
}

// 查询评论方法
Mock.mock("/comment/queryComment", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);
    let goodsId = jsonObj.id;
    for (let index = 0; index < mockCommentList.length; index++) {
        const element = mockCommentList[index];
        if (element.goodsId == goodsId) {
            return element;
        }
    }
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
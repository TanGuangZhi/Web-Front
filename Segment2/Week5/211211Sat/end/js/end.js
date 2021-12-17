let userInfoList, adminInfoList, allInfoList,nowAllInfoList;
// 查询用户
let nowPage = 1;//当前显示的页数
let pageCount = 10;//一页显示的最大数据条数
Mock.mock("/end/queryUser", "post", function (obj) {
    userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
    adminInfoList = JSON.parse(localStorage.getItem("adminInfoList"));
    allInfoList = userInfoList.concat(adminInfoList);
    localStorage.setItem("allInfoList", JSON.stringify(allInfoList));
    allInfoList = allInfoList.filter(value => value.userStatus == "right");


    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);//{"index":"0"}
    let limitUserName, limitUserType;
    try {
        // 条件查询开始
        limitUserName = jsonObj["limit[userName]"] ?? JSON.parse(localStorage.getItem("limitUserName"));
        limitUserType = jsonObj["limit[userType]"] ?? JSON.parse(localStorage.getItem("limitUserType"));
        localStorage.setItem("limitUserName", JSON.stringify(limitUserName));
        localStorage.setItem("limitUserType", JSON.stringify(limitUserType));

        let userSearchedByRulesArr = [];
        allInfoList.forEach(element => {
            // 使用indexof实现名字模糊查询
            let nameTemp = element.userName.indexOf(limitUserName) != -1 || !limitUserName;
            // 此处逻辑:如果已有数组中类型等于界面输入,OK
            // 或者界面输入的是空字符串,代表查询全部,则也OK
            let typeTemp = element.userType == limitUserType || !limitUserType;
            // let statusTemp = element.checkStatus == checkStatus || !checkStatus;
            if (nameTemp && typeTemp) {
                userSearchedByRulesArr.push(element);
            }
        });
        nowAllInfoList = userSearchedByRulesArr;
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
})

//动态生成数字页码
/**
 *  goodsList.length  总的数据条数  101
 *  pageCount :一页显示的总数据量   25
 *   Math.ceil(pageList.length/pageCount) :总页数
 * */
Mock.mock("/end/queryPage", "get", function (obj) {
    return Math.ceil(nowAllInfoList.length / pageCount);
});



// 删除用户方法
Mock.mock("/end/deleteUser", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    userInfoList[jsonObj.index].userStatus = "deleted";
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    return {
        "status": "200",
        "message": "删除成功",
        "list": userInfoList
    };
});

// 批量删除商品方法
Mock.mock("/end/deleteUserBatch", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = unescape(decodeURI(obj.body));//index=0
    let delArr = requestData.split("=")[1];
    delArr = delArr.split(",");
    let delLength = 0; // 消除删除一个数后对后续删除造成的影响
    delArr.forEach(element => {
        userInfoList[element].userStatus = "deleted";
    });
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    return {
        "status": "200",
        "message": "批量删除成功",
        "list": userInfoList
    };
});

// 添加用户方法
Mock.mock("/end/addUser", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    userInfoList.push(jsonObj);
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    localStorage.setItem("userInfoLastId", JSON.stringify(userInfoList.length));
    return {
        "status": "200",
        "message": "添加成功",
        "list": userInfoList
    };
});

// 修改用户方法
Mock.mock("/end/updateUser", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    // 根据id找到index
    userInfoList.forEach(element => {
        if (element.userId == jsonObj.userId) {
            element.userName = jsonObj.userName;
            element.userType = jsonObj.userType;
            element.userImg = jsonObj.userImg;
        }
    });

    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    return {
        "status": "200",
        "message": "修改成功",
        "list": userInfoList
    };
});


// 模拟后端商品数据(DB)
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
    localStorage.setItem("goodsListLength", JSON.stringify(mockgoodsList.length));
    localStorage.setItem("shoppingCartList", JSON.stringify(mockgoodsList));
}

// 查询商品方法
Mock.mock("/end/goods/querygoods", "post", function (obj) {
    mockgoodsList = mockgoodsList.filter(value => value.goodsStatus == "right");

    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);//{"index":"0"}
    let limitUserName, limitUserType;
    try {
        // 条件查询开始
        limitUserName = jsonObj["limit[userName]"] ?? JSON.parse(localStorage.getItem("limitGoodsName1"));
        limitUserType = jsonObj["limit[userType]"] ?? JSON.parse(localStorage.getItem("limitGoodsType1"));
        localStorage.setItem("limitGoodsName1", JSON.stringify(limitUserName));
        localStorage.setItem("limitGoodsType1", JSON.stringify(limitUserType));

        let userSearchedByRulesArr = [];
        mockgoodsList.forEach(element => {
            // 使用indexof实现名字模糊查询
            let nameTemp = element.goodsName.indexOf(limitUserName) != -1 || !limitUserName;
            // 此处逻辑:如果已有数组中类型等于界面输入,OK
            // 或者界面输入的是空字符串,代表查询全部,则也OK
            let typeTemp = element.goodsType == limitUserType || !limitUserType;
            // let statusTemp = element.checkStatus == checkStatus || !checkStatus;
            if (nameTemp && typeTemp) {
                userSearchedByRulesArr.push(element);
            }
        });
        nowmockgoodsList = userSearchedByRulesArr;
        // localStorage.setItem("nowmockgoodsList", JSON.stringify(nowmockgoodsList));

    } catch (error) {

    }

    let temp = parseInt(jsonObj.nowPage);//接收传递过来的页码
    if (temp < 0) {//说明点了上一页或者下一页
        if (temp == -3 && nowPage > 1) {//说明点了上一页,并且当前页数不是第一页
            nowPage--;
        }

        if (temp == -2 && nowPage < Math.ceil(nowmockgoodsList.length / pageCount)) {//点了下一页，并且当前不是最后一页
            nowPage++;
        }
    } else {//说明点了 数字页码
        nowPage = temp;
    }

    let list = [];
    let returnList = {};
    //防止取出最后一页的时候出现数组越界问题endIndex 一定会<=nowmockgoodsList.length
    let endIndex = nowPage * pageCount <= nowmockgoodsList.length ? nowPage * pageCount : nowmockgoodsList.length;
    for (let i = (nowPage - 1) * pageCount; i < endIndex; i++) {
        list.push(nowmockgoodsList[i]);
    }
    returnList.nowPage = nowPage;
    returnList.list = list;
    return returnList;
});

//动态生成数字页码
/**
 *  goodsList.length  总的数据条数  101
 *  pageCount :一页显示的总数据量   25
 *   Math.ceil(pageList.length/pageCount) :总页数
 * */
 Mock.mock("/end/goods/queryPage", "get", function (obj) {
    return Math.ceil(nowmockgoodsList.length / pageCount);
});

// 添加商品方法
Mock.mock("/end/goods/addgoods", "post", function (obj) {
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
Mock.mock("/end/goods/deletegoods", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}

    for (let index = 0; index < mockgoodsList.length; index++) {
        const element = mockgoodsList[index];
        if (element.id == jsonObj.goodsId) {
            mockgoodsList[index].goodsStatus = "deleted";
        }
    }
    localStorage.setItem("goodsList",JSON.stringify(mockgoodsList));
    return {
        "status": "200",
        "message": "删除成功",
        "list": mockgoodsList
    };
});

// 批量删除商品方法
Mock.mock("/end/goods/deleteGoodsBatch", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = unescape(decodeURI(obj.body));//index=0
    let delArr =  requestData.split("=")[1];
    delArr= delArr.split(",");
    delArr.forEach(element2 => {
        for (let index = 0; index < mockgoodsList.length; index++) {
            const element = mockgoodsList[index];
            if (element.id == element2) {
                mockgoodsList[index].goodsStatus = "deleted";
            }
        }
    });
    localStorage.setItem("goodsList",JSON.stringify(mockgoodsList));
    return {
        "status": "200",
        "message": "批量删除成功",
        "list": mockgoodsList
    };
});

// 修改商品方法
Mock.mock("/end/goods/updateUser", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    for (let index = 0; index < mockgoodsList.length; index++) {
        const element = mockgoodsList[index];
        if (element.id == jsonObj.id) {
            mockgoodsList[index].goodsName = jsonObj.goodsName;
            mockgoodsList[index].goodsPrice = jsonObj.goodsPrice;
            mockgoodsList[index].goodsType = jsonObj.goodsType;
            mockgoodsList[index].goodsImg = jsonObj.goodsImg;
        }
        
    }
   
    localStorage.setItem("goodsList",JSON.stringify(mockgoodsList));
    return {
        "status": "200",
        "message": "修改成功",
        "list": mockgoodsList
    };
});


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
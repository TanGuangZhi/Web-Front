let stu = [
    {
        stuId: "5001",
        stuName: "张三",
        stuPass: "1234",
        stuPhone: "12580",
        stuScore: 87,
        stuAge: 17,
        status: "right"
    },
    {
        stuId: "5002",
        stuName: "张三丰",
        stuPass: "1234",
        stuPhone: "12581",
        stuScore: 87,
        stuAge: 20,
        status: "right"
    },
    {
        stuId: "5003",
        stuName: "ios",
        stuPass: "1234",
        stuPhone: "12582",
        stuScore: 67,
        stuAge: 18,
        status: "right"
    },
    {
        stuId: "5004",
        stuName: "张无忌",
        stuPass: "1234",
        stuPhone: "12583",
        stuScore: 77,
        stuAge: 19,
        status: "right"
    },
    {
        stuId: "5005",
        stuName: "张学友",
        stuPass: "1234",
        stuPhone: "12584",
        stuScore: 57,
        stuAge: 23,
        status: "right"
    },
    {
        stuId: "5006",
        stuName: "marry",
        stuPass: "1234",
        stuPhone: "12585",
        stuScore: 87,
        stuAge: 16,
        status: "right"
    }
];
Mock.mock("/end/stu/query", "post", function (obj) {
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    stu = stu.filter(item => item.status == "right" && item.stuName.includes(jsonObj.stuName));
    return stu.sort((a, b) => a[jsonObj.sortCondition] - b[jsonObj.sortCondition]);
});

Mock.mock("/end/stu/add", "post", function (obj) {
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    //The name cannot be repeated 
    if (stu.some(item => item.stuName == jsonObj.stuName)) {
        return "";
    }

    stu.push(jsonObj);
    return "";
});

Mock.mock("/end/stu/del", "post", function (obj) {
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}

    stu.map(item => {
        if (item.stuId == jsonObj.stuId) {
            item.status = "deleted";
        }
    });
    return "";
});

Mock.mock("/end/stu/change", "post", function (obj) {
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}

    stu.map(item => {
        if (item.stuId == jsonObj.stuId) {
            item.stuName = jsonObj.stuName;
        }
    })
    return "";
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
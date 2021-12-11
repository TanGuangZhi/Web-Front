// 模拟后端数据(DB)
let studentInfoList = [];
let stuStr = localStorage.getItem("studentInfoList");
if (stuStr != null) {
    studentInfoList = JSON.parse(stuStr);
} else {
    //模拟后端用户数据(DB)
    let mockStuData = Mock.mock({
        "studentInfoList|20":[{
            "id|+1":1,
            "stuName":"@cname()",
            "stuPass":"1234",
            "stuTime":/201[5-9]-([1-9]|1[0-2])-([1-9]|[1-2][0-8])/,
            "stuImg|+1":/images\/([0-9]|1[0-2])\.jpg/,
            "salary|10000-40000":1,
            "stuLesson":/(java|python|web)/,
            "stuStatus":"right"
        }]
    });
    studentInfoList = mockStuData.studentInfoList;
    localStorage.setItem("stuId",studentInfoList.length.toString());//实现电影id自增(利用缓存);
    localStorage.setItem("studentInfoList", JSON.stringify(studentInfoList));
}

// 查询用户
Mock.mock("/end/queryStuInfo", "get", function (obj) {
    return studentInfoList;
})

Mock.mock("/end/delStuInfo", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    studentInfoList[jsonObj.index].stuStatus = "deleted";
    localStorage.setItem("studentInfoList", JSON.stringify(studentInfoList));
    return "删除成功";
})

// 添加
Mock.mock("/end/addStuInfo", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    jsonObj.id=parseInt(localStorage.getItem("stuId"))+1;
    jsonObj.stuImg = jsonObj.stuImg.replaceAll("%2F","/");
    studentInfoList.push(jsonObj);
    localStorage.setItem("stuId",studentInfoList.length.toString());//实现电影id自增(利用缓存);
    localStorage.setItem("studentInfoList", JSON.stringify(studentInfoList));
    return "添加成功";
})

// 修改
Mock.mock("/end/updStuInfo", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
    studentInfoList.forEach(element => {
        if (element.id==jsonObj.id) {
            element.stuName = jsonObj.stuName;
            element.stuTime = jsonObj.stuTime;
            element.salary = jsonObj.salary;
            element.stuLesson = jsonObj.stuLesson;
            element.stuImg = jsonObj.stuImg.replaceAll("%2F","/");
        }
    });
    // console.log(`${jsonObj}`);
    // studentInfoList.push(jsonObj);
    localStorage.setItem("studentInfoList", JSON.stringify(studentInfoList));
    return "修改成功";
})



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
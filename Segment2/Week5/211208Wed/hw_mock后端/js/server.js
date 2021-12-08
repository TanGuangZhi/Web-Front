//模拟后端数据
let data=Mock.mock({
    "userList|20-30":[
        {
            "id|+1":1,
            "userName":/[a-z]{2,4}/,
            "userPass":"123456",
            "userPhone":/1[3-9]\d{9}/,
            "email":/[1-9]\d{4,10}@qq\.com/,
            "address":"@city(true)",
            "birthDay":"@Date()",
            "userImg":/images\/user\/([0-9]|1[0-2])\.jpg/   // \/ 等价于"/"   \. 等于"."
        }
    ]
});
//1.使用mock模拟后端服务器 (提供接口地址，以及数据，以及访问的方式get/post)
//1.模拟查询的接口数据  (obj 是客户端传过来的数据)
//2.return 是后端响应给客户端（前端）的数据
Mock.mock("/user/queryUser","get",function(obj){
    return {
        "status":"200",
        "message":"请求成功",
        "list":data.userList
    }
});

//1.模拟删除的后端
//obj是一个json对象其中body属性 存储了ajax data属性传递过来的数据
Mock.mock("/user/deleteUser","post",function (obj){
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData=decodeURI(obj.body);//index=0
    let jsonObj=converter(requestData);//{"index":"0"}
    data.userList.splice(jsonObj.index,1);
    return 1;
});

Mock.mock("/user/addUser","post",function (obj) {
    let requestData=decodeURI(obj.body);
    let jsonObj=converter(requestData);
    data.userList.push(jsonObj);
    return 1;
})


//index=0&userName=张三&userPass=123456===>变成一个json对象{"index":"0","userName":"张三","userPass":"123456"}
//index=0==> {"index":"0"}

function converter(str) {
    let fieldArray=str.split("&");
    let res=`{`;
    for(let field of fieldArray){
        res+=`"${field.split("=")[0]}":"${field.split("=")[1]}",`;
    }
    //删除最后一个逗号...
    res=res.substring(0,res.length-1);
    res+=`}`;
    return JSON.parse(res);
}
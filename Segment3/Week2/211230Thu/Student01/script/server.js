let stuData = Mock.mock({
    "list|20-30": [{
        "id|+1": 1,
        "stuName": "@cname",
        "stuPass": /[0-9]{6}/,
        "stuPhone": /1[3-9]\d{9}/,
        "address": "@city(true)",
        "stuScore|40-100": 40
    }]
});
let stuList = stuData.list;

//1.模拟后端查询的操作
Mock.mock("/stu/queryStu", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let stu = converter(requestData);
    let newArr = [...stuList];
    newArr = newArr.filter((item) => {
        // multi condition query
        return item.stuName.includes(stu.stuName ?? "") &&
            item.stuPhone.includes(stu.stuPhone ?? "");
    });

    // sort
    if (stu.sortType != 0) {
        newArr = newArr.sort((a, b) => {
            return (a.stuScore - b.stuScore) * stu.sortType;
        })
    } else {
        newArr = newArr.sort((a, b) => {
            return a.id - b.id;
        })
    }

    return newArr;
});

//2.模拟后端的删除操作
Mock.mock("/stu/deleteStu", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let stu = converter(requestData);
    let delArr = [];
    if (requestData.includes("[]")) {
        delArr = requestData.match(/(\d+)/g);
    } else {
        delArr.push(stu.id);
    }
    stuList = stuList.filter((item) => {
        return !delArr.includes(item.id + "");
    });
    return 1;
});

let count = stuList.length;

//3.模拟后端的添加操作
Mock.mock("/stu/addStu", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let stu = converter(requestData);
    // for remove repeated word
    let temp = [];
    temp.push(stu.province, stu.city, stu.district);
    stu.address = [...new Set(temp)].join("");
    stu.id = ++count;//实现id自增
    stuList.push(stu);
    return 1;
});

// 4. change data
Mock.mock("/stu/changeStu", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let stu = converter(requestData);
    stuList = stuList.map((item) => {
        if (item.id == stu.id) {
            // if user not choose address then don't change address
            if (!stu.province) {
                stu.address = item.address;
            } else {
                // for remove repeated word
                let temp = [];
                temp.push(stu.province, stu.city, stu.district);
                stu.address = [...new Set(temp)].join(" ");
            }
            return stu;
        }
        return item;
    })
    return 1;
});

// ## 2. user 
let userData = Mock.mock({
    "list|5": [{
        "id|+1": 1,
        "userName|+1": ["jack", "rouse", "charles", "tina", "tom"],
        "userPass": "123456",
        "userPhone": /1[3-9]\d{9}/
    }]
});
let userList = userData.list;
let userMap = new Map();//key:存储用户名  value存储整个用户对象
for (let user of userList) {
    userMap.set(user.userName, user);
}


Mock.mock("/user/queryUserInfo", "post", function (obj) {
    // the back should only return the userName,for safe ,should't return user pass or other info
    let requestData = decodeURI(obj.body);
    let user = converter(requestData);
    let userName = user.userName;
    return userList.some((item) => item.userName == userName);
});

Mock.mock("/user/login2", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let user = converter(requestData);
    let userName = user.userName;
    let userPass = user.userPass;
    let queryUser = userMap.get(userName);//根据key获得对象
    if (queryUser != undefined) {//用户名存在
        if (queryUser.userPass == userPass) {
            return 1;
        }
    }
    return 0;
});

let userCount = userList.length;
Mock.mock("/user/regUser", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let user = converter(requestData);
    user.id = ++userCount;
    userList.push(user);
    return 1;
});



Mock.mock("/user/login1", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let user = converter(requestData);
    let userName = user.userName;
    let userPass = user.userPass;
    let queryUser = userList.filter(item => {
        return item.userName == userName;
    });
    if (queryUser.length != 0) {//用户名存在
        if (queryUser[0].userPass == userPass) {
            return 1;
        }
    }
    return 0;
});


function converter(data) {
    let dataArr = data.split("&");
    let str = `{`
    for (let d of dataArr) {
        str += `"${d.split('=')[0]}":"${d.split('=')[1]}",`;
    }
    str = str.substring(0, str.length - 1);
    str += `}`;
    return JSON.parse(str);
}

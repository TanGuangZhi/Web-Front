/*
 * @Author: TanGuangZhi
 * @Date: 2021-12-31 14:04:08 Fri
 * @LastEditTime: 2022-01-04 14:57:40 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */

let filmData = Mock.mock({
    "list|20-30": [{
        "id|+1": 1001,//id自增
        "filmName": "@name",
        "filmPrice|40-100.2": 40,
        "filmType|+1": ["喜剧", "武侠", "动漫", "战争", "动画", "名著"],
        "filmMoney|10000-100000": 10000,
        "filmScore|1-9": 1
    }]
});
let filmList = filmData.list;

let userData = Mock.mock({
    "list|5": [{
        "id|+1": 1,
        "userName|+1": ["jack", "rouse", "charles", "tina", "tom"],
        "userPass": "123456",
        "userPhone": /1[3-9]\d{9}/
    }]
});
let userList = userData.list;

// ## data  
let pageNumber = 1;
let pageCount = 10;
// 1. query
Mock.mock("/film/queryFilm", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let film = converter(requestData);
    let newArr = [...filmList];
    newArr = newArr.filter((item) => {
        // multi condition query
        return item.filmName.includes(film.filmName ?? "") &&
            (item.id + "").includes(film.id ?? "");
    });

    // pagination
    // newArr = newArr.slice((pageNumber - 1) * pageCount, pageNumber * pageCount);
    newArr = newArr.filter((item, index) => {
        return index >= (pageNumber - 1) * pageCount && index <= pageNumber * pageCount;
    });

    // all page num
    let allPageNum = Math.ceil(newArr.length / pageCount);

    // sort
    if (film.sortType != 0) {
        newArr = newArr.sort((a, b) => {
            return (a.filmMoney - b.filmMoney) * film.sortType;
        })
    } else {
        newArr = newArr.sort((a, b) => {
            return a.id - b.id;
        })
    }

    return { newArr, allPageNum };
});

// 2.del 
Mock.mock("/film/deleteFilm", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let film = converter(requestData);
    let delArr = [];
    if (requestData.includes("[]")) {
        delArr = requestData.match(/(\d+)/g);
    } else {
        delArr.push(film.id);
    }
    filmList = filmList.filter((item) => {
        return !delArr.includes(item.id + "");
    });
    return 1;
});


let count = filmList.length;
// 3. add data
Mock.mock("/film/addFilm", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let film = converter(requestData);
    // for remove repeated word
    film.id = ++count + 1000;//实现id自增
    // can't add the same name film
    if (filmList.find((item) => item.filmName.includes(film.filmName.replaceAll("+", " ")))) {
        return "已有相同名字的电影";
    }
    filmList.push(film);
    return 1;
});

// 4. change data
Mock.mock("/film/changeFilm", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let film = converter(requestData);
    filmList = filmList.map((item) => {
        if (item.id == film.id) {
            // if user not choose address then don't change address
            if (!film.province) {
                film.address = item.address;
            } else {
                // for remove repeated word
                let temp = [];
                temp.push(film.province, film.city, film.district);
                film.address = [...new Set(temp)].join(" ");
            }
            return film;
        }
        return item;
    })
    return 1;
});

// ## user
// 1. query
Mock.mock("/user/queryUserInfo", "post", function (obj) {
    // the back should only return the userName,for safe ,should't return user pass or other info
    let requestData = decodeURI(obj.body);
    let user = converter(requestData);
    let userName = user.userName;
    return userList.some((item) => item.userName == userName);
});

// 2. login
Mock.mock("/user/login", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let user = converter(requestData);
    let userName = user.userName;
    let userPass = user.userPass;

    let queryUser = userList.find(item => item.userName == userName);
    if (queryUser) {//用户名存在
        if (queryUser.userPass == userPass) {
            sessionStorage.setItem("loginUserInfo", JSON.stringify(queryUser))
            return 1;
        }
    }
    return 0;
});

// 3. register
let userCount = userList.length;
Mock.mock("/user/regUser", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let user = converter(requestData);
    user.id = ++userCount;
    userList.push(user);
    return 1;
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

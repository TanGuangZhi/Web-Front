/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-04 19:23:41 Tue
 * @LastEditTime: 2022-01-04 19:53:43 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
let UserModule = require("./module/UserModule");
let fs = require("fs");
let strToJson = require("./util/util");
let userModule = new UserModule();
//1.查询
// userMofdule.queryUser();
//2.添加
let addUser = { "userName": "spring", "userPass": "1234", "userPhone": "114" };
userModule.addUser(addUser);
// userModule.queryUser();


//3.批量导入
fs.readFile("./file/user.csv", function (error, data) {
    if (error) {
        return console.error(error);
    }
    let res = userModule.addManyUser(strToJson(data.toString()));
    userModule.queryUser();
});

//4. 删除 or del by batch
// userModule.deleteUser([1, 2]);

// 5. change user
userModule.changeUser({ id: 1, userName: 'changeUserName' });
userModule.queryUser();


/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-04 19:23:41 Tue
 * @LastEditTime: 2022-01-04 20:23:52 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
let fs = require("fs");
class UserModule {
    static count = 4;
    userList = [
        { "id": 1, "userName": "iis", "userPass": "1234", "userPhone": "110" },
        { "id": 2, "userName": "tomcat", "userPass": "1234", "userPhone": "111" },
        { "id": 3, "userName": "node.js", "userPass": "1234", "userPhone": "112" },
        { "id": 4, "userName": "jboss", "userPass": "1234", "userPhone": "113" }
    ];
    //1.添加用户
    addUser(user) {
        // 1.只要在数组中存在一个与用户输入的用户一致 则返回true
        let flag = this.userList.some(item => {
            return item.userName == user.userName || item.userPhone == user.userPhone;
        });
        if (!flag) {//说明没有重复的用户名以及手机号
            user.id = ++UserModule.count;
            this.userList.push(user);
            return 1;
        }
        return 0;//不能添加重复的元素
    }
    // 2.查询用户
    queryUser() {
        console.table(this.userList);
    }

    // 1.1 批量导入
    addManyUser(userArr) {
        this.userList = [...this.userList, ...userArr];
        return 1;
    }

    // 3.删除
    deleteUser(delArr) {
        this.userList = this.userList.filter(item => {
            // includes is all equal ,so to avoid 1 or "1",use this method to solve
            return !delArr.includes(item.id);
        })
        return 1;
    }

    // 4. change user 
    changeUser(changeUserInfoArr) {
        this.userList = this.userList.map((item) => {
            if (item.id == changeUserInfoArr.id) {
                return changeUserInfoArr;
            }
            return item;
        })
        // writeData(this.userList);
        return 1;
    }

}
// ## Others
// 1. write info to file
function writeData(data) {
    fs.writeFile("./file/user.csv", data, function (err) {
        if (err) {
            return console.error(error);
        }
        console.log("write success");
    })
}
module.exports = UserModule;
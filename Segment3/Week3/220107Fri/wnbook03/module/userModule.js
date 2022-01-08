/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-07 19:55:32 Fri
 * @LastEditTime: 2022-01-08 17:12:42 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
class UserModule {
    userList = [
        { id: 1, userName: "tina", userPass: "1234", userScore: 100, userPhone: "110", userType: 0 },
        { id: 2, userName: "jam", userPass: "1234", userScore: 234, userPhone: "110", userType: 1 },
        { id: 3, userName: "marry", userPass: "1234", userScore: 113, userPhone: "110", userType: 0 },
        { id: 4, userName: "ioi", userPass: "1234", userScore: 138, userPhone: "110", userType: 0 },
        { id: 5, userName: "pop", userPass: "1234", userScore: 106, userPhone: "110", userType: 0 },
        { id: 6, userName: "tina", userPass: "1234", userScore: 100, userPhone: "110", userType: 0 },
        { id: 7, userName: "tina", userPass: "1234", userScore: 100, userPhone: "110", userType: 0 },
        { id: 8, userName: "jam", userPass: "1234", userScore: 234, userPhone: "110", userType: 1 },
        { id: 9, userName: "marry", userPass: "1234", userScore: 113, userPhone: "110", userType: 0 },
        { id: 10, userName: "ioi", userPass: "1234", userScore: 138, userPhone: "110", userType: 0 },
        { id: 11, userName: "pop", userPass: "1234", userScore: 106, userPhone: "110", userType: 0 },
        { id: 12, userName: "jam", userPass: "1234", userScore: 234, userPhone: "110", userType: 1 },
        { id: 13, userName: "marry", userPass: "1234", userScore: 113, userPhone: "110", userType: 0 },
        { id: 14, userName: "ioi", userPass: "1234", userScore: 138, userPhone: "110", userType: 0 },
    ];

    queryUser(data) {
        let pageCount = 10;
        let pageNumber = data.pageNum ?? 1;
        let newArr = this.userList.filter((item) => {
            return item.userName.includes(data.userName ?? "") &&
                item.userPhone.includes(data.userPhone ?? "") &&
                (item.id + "").includes(data.id ?? "")
        });

        // all page num
        let allPageNum = Math.ceil(newArr.length / pageCount);

        // pagination
        // newArr = newArr.slice((pageNumber - 1) * pageCount, pageNumber * pageCount);
        newArr = newArr.filter((item, index) => {
            return index >= (pageNumber - 1) * pageCount && index <= pageNumber * pageCount;
        });

        // sort
        if (data.sortId != 0) {
            newArr = newArr.sort((a, b) => {
                return (a.userScore - b.userScore) * data.sortId;
            })
        } else {
            newArr = newArr.sort((a, b) => {
                return a.id - b.id;
            })
        }
        return { newArr, allPageNum };
    }

    static count = 5;
    insertUser(user) {
        user.id = UserModule.count++;
        user.userType = 0;//默认只能添加普通用户
        this.userList.push(user);
        return 1;
    }

    updateUser(data) {
        this.userList = this.userList.map((item) => {
            if (item.id == data.id) {
                return data;
            }
            return item;
        })
        return 1;
    }

    deleteUser(delArr) {
        this.userList = this.userList.filter(item => {
            // includes is all equal ,so to avoid 1 or "1",use this method to solve
            return !delArr.includes(item.id + "");
        })
        return 1;
    }
    insertUserByBatch(userArr) {
        for (let user of userArr) {
            this.insertUser(user);
        }
        return 1;
    }
    loginUser(userName) {
        let user = null;
        let newArr = this.userList.filter(item => {
            return item.userName == userName;
        });
        if (newArr.length > 0) {//用户名存在
            user = newArr[0];
        }
        return user;
    }
    registerUser(user) {
        user.id = UserModule.count += 1;
        this.userList.push(user);
        console.log(this.userList);
        return 1;
    }

}
module.exports = UserModule;

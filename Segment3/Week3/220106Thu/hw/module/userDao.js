/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 19:17:06 Thu
 * @LastEditTime: 2022-01-06 21:16:54 Thu
 * @LastEditors: TanGuangZhi
 * @Description: deal data 
 * @KeyWords: Kw
 */
class UserDao {
    userList = [
        { id: 1, userName: "tina", userPass: "1234", userScore: 100, userPhone: "110", userType: 0 },
        { id: 2, userName: "jam", userPass: "1234", userScore: 234, userPhone: "110", userType: 1 },
        { id: 3, userName: "marry", userPass: "1234", userScore: 113, userPhone: "110", userType: 0 },
        { id: 4, userName: "ioi", userPass: "1234", userScore: 138, userPhone: "110", userType: 0 },
        { id: 5, userName: "pop", userPass: "1234", userScore: 106, userPhone: "110", userType: 0 }
    ];
    static count = 6;
    query() {
        return this.userList;
    }
    insert(data) {
        data.id = UserDao.count += 1;
        this.userList.push(data);
        return "1";
    }
    insertByBatch(data) {
        for (const iterator of data) {
            this.insert(iterator);
        }
        return "1";
    }
    del(delArr) {
        this.userList = this.userList.filter(item => {
            // includes is all equal ,so to avoid 1 or "1",use this method to solve
            return !delArr.includes(item.id + "");
        })
        return "1";
    }
    update(data) {
        this.userList = this.userList.map((item) => {
            if (item.id == data.id) {
                return data;
            }
            return item;
        })
        return "1";
    }
}

module.exports = UserDao;

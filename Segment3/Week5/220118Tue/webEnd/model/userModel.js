/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-13 11:51:06 Thu
 * @LastEditTime: 2022-01-15 16:47:42 Sat
 * @LastEditors: TanGuangZhi
 * @Description: to deal user data form mongoDB By mongoose
 * @KeyWords: NodeJs, Express, MongoDB
 */

let dbUtil = require('../util/dbUtil');
let dbUserTable = require('../data/userSchema.js');
let dbSequence = dbUtil.dbSequence;

class UserModel {
    // async queryUser() {
    //     return await dbUserTable.find({});
    // }

    async queryUser(nowPage, pageCount, data) {
        let sortObj = {};
        let matchObj = {};
        console.log(data);
        if (data.userName) {
            matchObj.userName = { $regex: data.userName };
        }
        if (data.userType) {
            matchObj.userType = data.userType - 0;
        }
        if (data.sortType == 0) {
            sortObj._id = 1;
        } else if (data.sortType == 1 || data.sortType == -1) {
            sortObj.userSalary = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }
        return await dbUserTable.find(matchObj)
            .sort(sortObj)
            .skip((nowPage - 1) * (pageCount - 0))
            .limit(pageCount - 0);
    }

    async getUserCount(data) {
        let matchObj = {};
        if (data.userName != "") {
            matchObj.userName = { $regex: data.userName };
        }
        if (data.userType) {
            matchObj.userType = data.userType - 0;
        }
        let userList = await dbUserTable.aggregate([
            {
                $match: matchObj
            },
        ]);
        return await userList.length;
    }

    async queryUserExists(user) {
        let userName = user.userName;
        return await dbUserTable.find({});
    }

    async login(data) {
        let userName = data.userName;
        let userPass = data.userPass;
        return await dbUserTable.find({ userName: userName, userPass: userPass });
    }

    async register(user) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "uId" }, { $inc: { sequenceValue: 1 } });
        user._id = sequence.sequenceValue;
        return await dbUserTable.insertMany([user]);
    }

    async insert(user) {
        for (const userOne of user) {
            let sequence = await dbSequence.findOneAndUpdate({ _id: "uid" }, { $inc: { sequenceValue: 1 } });
            userOne._id = sequence.sequenceValue;
        }
        return await dbUserTable.insertMany(user);
    }

    async deleteUser(delArr) {
        return await dbUserTable.deleteMany({ _id: { $in: delArr } });
    }

    async updateUser(user) {
        return await dbUserTable.updateMany({ _id: parseInt(user._id) }, {
            $set:
            {
                userName: user.userName,
                userPhone: user.userPhone,
            }
        });
    }
}
module.exports = UserModel;

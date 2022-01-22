/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 13:11:56 Sat
 * @LastEditTime: 2022-01-22 14:13:55 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
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
        if (data.name != "") {
            matchObj.name = { $regex: data.name };
        }

        return await dbUserTable.find(matchObj)
            .sort(sortObj)
            .skip((nowPage - 1) * (pageCount - 0))
            .limit(pageCount - 0);
    }

    async getUserCount(data) {
        let matchObj = {};
        if (data.name != "") {
            matchObj.userName = { $regex: data.userName };
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

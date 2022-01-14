/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-13 11:51:06 Thu
 * @LastEditTime: 2022-01-13 15:00:43 Thu
 * @LastEditors: TanGuangZhi
 * @Description: to deal user data form mongoDB By mongoose
 * @KeyWords: NodeJs, Express, MongoDB
 */

let dbUtil = require('../util/dbUtil');
let dbUserTable = dbUtil.dbUserTable;
let dbStuTable = dbUtil.dbStuTable;
let dbSequence = dbUtil.dbSequence;

class UserModel {
    async queryStu() {
        return await dbStuTable.find({});
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
}
module.exports = UserModel;

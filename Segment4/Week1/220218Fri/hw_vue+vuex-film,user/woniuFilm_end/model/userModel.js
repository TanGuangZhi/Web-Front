/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 19:51:30 Fri
 * @LastEditTime: 2022-02-19 10:45:47 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let dbSequence = dbUtil.dbSequence;
let dbUser = require("../entity/user");

class UserModel {
    async queryUser() {
        return await dbUser.find({});
    }
    async insertUser(user) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "uid" }, { $inc: { sequenceValue: 1 } });
        user._id = sequence.sequenceValue;
        return await dbUser.insertMany([user]);
    }
    async deleteUser(_idArr) {
        return await dbUser.deleteMany({ _id: { $in: _idArr } });
    }
    async updateUser(user) {
        return await dbUser.updateMany({ _id: parseInt(user._id) },
            {
                $set: {
                    userName: user.userName,
                    userPass: parseFloat(user.userPass),
                    userPhone: user.userPhone,
                    userScore: parseFloat(user.userScore),
                }
            },
            { multi: true });
    }
}
module.exports = UserModel;

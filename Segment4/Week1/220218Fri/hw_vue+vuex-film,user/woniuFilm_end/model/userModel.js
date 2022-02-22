/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 19:51:30 Fri
 * @LastEditTime: 2022-02-22 20:52:35 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let dbSequence = dbUtil.dbSequence;
let dbUser = require("../entity/user");

class UserModel {
    async queryUser(data) {
        let multipleQueryObj = {};
        if (data.userName) {
            multipleQueryObj.userName = { $regex: data.userName };
        }
        if (data.userPhone) {
            multipleQueryObj.userPhone = data.userPhone;
        }
        return await dbUser.find(multipleQueryObj);
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

    async loginUser(userName) {
        return await dbUser.find({ userName });
    }

    async judgeIsUserNameExist(user) {
        return await dbUser.find({ userName: user.userName, "_id": { $nin: [user._id] } });
    }
}
module.exports = UserModel;

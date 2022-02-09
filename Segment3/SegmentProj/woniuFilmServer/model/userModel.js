/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 13:11:56 Sat
 * @LastEditTime: 2022-02-08 18:24:11 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbUserTable = require('../data/userSchema.js');
let dbUserOrderTable = require('../data/orderSchema.js');
let dbSequence = dbUtil.dbSequence;

class UserModel {
    // async queryUser() {
    //     return await dbUserTable.find({});
    // }

    async queryUser(nowPage, pageCount, data) {
        let sortObj = {};
        let matchObj = {};
        if (data.name) {
            matchObj.name = { $regex: data.name };
        }
        if (data.userId) {
            matchObj._id = data.userId;
        }

        return await dbUserTable.find(matchObj)
            .sort(sortObj)
            .skip((nowPage - 1) * (pageCount - 0))
            .limit(pageCount - 0);
    }

    async queryUserOrder(userId) {
        let sortObj = {};
        let matchObj = {};
        matchObj._id = userId - 0;
        return await dbUserOrderTable.aggregate([
            {
                $match: matchObj
            }, {
                $lookup: {
                    from: "film",
                    localField: "filmId",
                    foreignField: "_id",
                    as: "filmIdToDetail"
                }
            }, {
                $lookup: {
                    from: "cinema",
                    localField: "cinemaId",
                    foreignField: "_id",
                    as: "cinemaIdToDetail"
                }
            }, {
                $lookup: {
                    from: "room",
                    localField: "roomId",
                    foreignField: "_id",
                    as: "roomIdToDetail"
                }
            }
        ]);
    }

    async getUserCount(data) {
        let matchObj = {};
        if (data.name) {
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
        let name = data.name;
        let password = data.password;
        return await dbUserTable.find({ name, password });
    }

    async loginUser(name) {
        return await dbUserTable.find({ name });
    }

    async register(user) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "userId" }, { $inc: { sequenceValue: 1 } });
        user._id = sequence.sequenceValue;
        return await dbUserTable.insertMany([user]);
    }

    async updateStatus(uuid) {
        return await dbUserTable.updateMany({ uuid }, { state: 1 }, { multi: true });
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

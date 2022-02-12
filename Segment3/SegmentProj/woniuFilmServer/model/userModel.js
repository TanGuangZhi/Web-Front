/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 13:11:56 Sat
 * @LastEditTime: 2022-02-11 11:16:53 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbUserTable = require('../data/userSchema.js');
let dbUserOrderTable = require('../data/orderSchema.js');
let uuid = require("uuid");//用来产生一个唯一的字符串
let dbSequence = dbUtil.dbSequence;
let sortObj = {};
let matchObj = {};
class UserModel {
    // async queryUser() {
    //     return await dbUserTable.find({});
    // }

    async queryUser(nowPage, pageCount, data) {
        sortObj = {};
        matchObj = {};
        if (data.name) {
            matchObj.name = { $regex: data.name };
        }
        if (data.userId) {
            matchObj._id = data.userId;
        }

        if (data.sortType == 0) {
            sortObj._id = 1;
        } else if (data.sortType == 1 || data.sortType == -1) {
            sortObj.score = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }

        return await dbUserTable.find(matchObj)
            .sort(sortObj)
            .skip((nowPage - 1) * (pageCount - 0))
            .limit(pageCount - 0);
    }

    async getUserIdByName(name) {
        return await dbUserTable.find({ name });
    }


    async queryUserOrder(userId) {
        matchObj.userId = userId - 0;
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
        matchObj = {};
        if (data.name) {
            matchObj.name = { $regex: data.name };
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

    async queryUserById(_id) {
        return await dbUserTable.find({ _id });
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
            let sequence = await dbSequence.findOneAndUpdate({ _id: "userId" }, { $inc: { sequenceValue: 1 } });
            userOne._id = sequence.sequenceValue;
            userOne.score = 0;
            userOne.type = 1;
            userOne.state = 1;
            // userOne.avatar = "images/user/avatar1.jpg";
            userOne.uuid = uuid.v1();
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
                name: user.userName,
                phone: user.userPhone,
            }
        });
    }
}
module.exports = UserModel;

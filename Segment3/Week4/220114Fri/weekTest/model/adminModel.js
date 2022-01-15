/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-13 15:20:32 Thu
 * @LastEditTime: 2022-01-15 16:21:52 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbStuTable = require("../data/stuSchema");
let dbStuTypeTable = require("../data/stuTypeSchema");
let dbSequence = dbUtil.dbSequence;

class AdminModel {
    async queryStu(nowPage, pageCount, data) {
        let sortObj = {};
        let matchObj = {};
        if (data.stuName) {
            matchObj.stuName = { $regex: data.stuName };
        }
        if (data.stuType) {
            matchObj.stuType = data.stuType - 0;
        }
        if (data.sortType == 0) {
            sortObj._id = 1;
        } else if (data.sortType == 1 || data.sortType == -1) {
            sortObj.stuSalary = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }
        return await dbStuTable.aggregate([{
            $match: matchObj
        },
        {
            $lookup: {
                from: "stuType",
                localField: "stuType",
                foreignField: "_id",
                as: "stuType"
            }
        }, {
            $sort: sortObj
        }, {
            $skip: (nowPage - 1) * (pageCount - 0)
        }, {
            $limit: pageCount - 0
        }
        ])
        // return await dbStuTable.find(matchObj)
        //     .sort(sortObj)
        //     .skip((nowPage - 1) * (pageCount - 0))
        //     .limit(pageCount - 0);
    }

    async getStuCount(data) {
        let matchObj = {};
        if (data.stuName != "") {
            matchObj.stuName = { $regex: data.stuName };
        }
        if (data.stuType) {
            matchObj.stuType = data.stuType - 0;
        }
        let stuList = await dbStuTable.aggregate([
            {
                $match: matchObj
            },
        ]);
        return await stuList.length;
    }

    async deleteStu(delArr) {
        return await dbStuTable.deleteMany({ _id: { $in: delArr } });
    }

    async addStu(stu) {
        for (const stuOne of stu) {
            let sequence = await dbSequence.findOneAndUpdate({ _id: "sid" }, { $inc: { sequenceValue: 1 } });
            stuOne._id = sequence.sequenceValue;
        }
        return await dbStuTable.insertMany(stu);
    }

    async updateStu(stu) {
        return await dbStuTable.updateMany({ _id: parseInt(stu._id) }, {
            $set:
            {
                stuName: stu.stuName,
                stuType: stu.stuType,
                stuImg: stu.stuImg,
                stuSalary: stu.stuSalary,
                stuTime: stu.stuTime
            }
        });
    }

    async queryAllStuType() {
        return await dbStuTypeTable.find({});
    }
}

module.exports = AdminModel;

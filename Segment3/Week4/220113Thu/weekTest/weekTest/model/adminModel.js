/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-13 15:20:32 Thu
 * @LastEditTime: 2022-01-14 18:09:22 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbStuTable = dbUtil.dbStuTable;
let dbSequence = dbUtil.dbSequence;

class AdminModel {
    async queryStu(nowPage, pageCount, data) {
        let sortObj = {};
        let matchObj = {};
        if (data.stuName != "") {
            matchObj.stuName = { $regex: data.stuName };
        }
        if (data.sortType != 0) {
            sortObj.stuSalary = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }
        let temp = await dbStuTable.find(matchObj)

        return await dbStuTable.find(matchObj)
            .sort(sortObj)
            .skip((nowPage - 1) * (pageCount - 0))
            .limit(pageCount - 0);
    }
    async getStuCount(data) {

        let matchObj = {};
        if (data.stuName != "") {
            matchObj.stuName = { $regex: data.stuName };
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
        let sequence = await dbSequence.findOneAndUpdate({ _id: "sid" }, { $inc: { sequenceValue: 1 } });
        stu._id = sequence.sequenceValue;
        // console.log(stu);
        return await dbStuTable.insertMany([stu]);
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
}

module.exports = AdminModel;

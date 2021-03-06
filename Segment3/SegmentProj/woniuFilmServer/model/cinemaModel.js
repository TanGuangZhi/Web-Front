/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:20:09 Thu
 * @LastEditTime: 2022-02-11 08:58:17 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbCinemaTable = require("../data/cinemaSchema.js");
let dbCinemaDistrictTable = require("../data/cinemaDistrictSchema.js");
let dbSequence = dbUtil.dbSequence;

let sortObj = {};
let matchObj = {};
class CinemaModel {
    static async query(nowPage, pageCount, data) {
        sortObj = {};
        matchObj = {};
        if (data.name) {
            matchObj.name = { $regex: data.name };
        }
        if (data.sortType == 0) {
            sortObj._id = 1;
        } else if (data.sortType == 1 || data.sortType == -1) {
            sortObj.districtId = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }

        if (data.districtId) {
            matchObj.districtId = data.districtId - 0;
        }

        return await dbCinemaTable.aggregate([{
            $match: matchObj
        }, {
            $lookup: {
                from: "cinemaDistrict",
                localField: "districtId",
                foreignField: "_id",
                as: "district"
            }
        }, {
            $sort: sortObj
        }, {
            $skip: (nowPage - 1) * (pageCount - 0)
        }, {
            $limit: pageCount - 0
        }])
    }

    static async getCount(data) {
        let list = await dbCinemaTable.aggregate([
            {
                $match: matchObj
            },
        ]);
        return await list.length;
    }

    static async getCinemaIdByName(name) {
        return await dbCinemaTable.find({ name: { $regex: name } });
    }

    static async queryCinemaDetail(data) {
        return await dbCinemaTable.find({ _id: data.cinemaId });
    }

    static async queryDistrict(data) {
        return await dbCinemaDistrictTable.find({});
    }

    static async delete(delArr) {
        return await dbCinemaTable.deleteMany({ _id: { $in: delArr } });
    }

    static async insert(cinema) {
        for (const cinemaOne of cinema) {
            let sequence = await dbSequence.findOneAndUpdate({ _id: "cinemaId" }, { $inc: { sequenceValue: 1 } });
            cinemaOne._id = sequence.sequenceValue;
        }
        return await dbCinemaTable.insertMany(cinema);
    }

    static async update(cinema) {
        return await dbCinemaTable.updateMany({ _id: parseInt(cinema._id) }, {
            $set:
            {
                name: cinema.name,
                address: cinema.address,
                img: cinema.img,
                phone: cinema.phone,
                districtId: cinema.districtId - 0,
            }
        });
    }

    static async queryAllType() {
        return await dbCinemaTypeTable.find({});
    }
}

module.exports = CinemaModel;

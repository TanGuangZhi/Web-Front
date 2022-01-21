/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:20:09 Thu
 * @LastEditTime: 2022-01-21 21:30:37 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbCinemaRoomTable = require("../data/cinemaRoomSchema");
let dbCinemaTable = require("../data/cinemaSchema.js");
let dbSequence = dbUtil.dbSequence;

class CinemaRoomModel {
    static async query(nowPage, pageCount, data) {
        let sortObj = {};
        let matchObj = {};
        if (data.name != "") {
            matchObj.name = { $regex: data.name };
        }
        if (data.cinemaId != "") {
            matchObj.cinemaId = { $regex: data.cinemaId };
        }
        if (data.sortType == 0) {
            sortObj._id = 1;
        } else if (data.sortType == 1 || data.sortType == -1) {
            sortObj.session = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }

        return await dbCinemaRoomTable.aggregate([{
            $match: matchObj
        }, {
            $lookup: {
                from: "cinema",
                localField: "cinemaId",
                foreignField: "_id",
                as: "cinemaIdToDetails"
            }
        }, {
            $lookup: {
                from: "film",
                localField: "filmId",
                foreignField: "_id",
                as: "filmIdToDetails"
            }
        }, {
            $lookup: {
                from: "cinemaHallType",
                localField: "roomId",
                foreignField: "_id",
                as: "roomIdToDetails"
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
        let matchObj = {};
        if (data.name != "") {
            matchObj.name = { $regex: data.name };
        }
        let list = await dbCinemaRoomTable.aggregate([
            {
                $match: matchObj
            },
        ]);
        return await list.length;
    }

    static async queryCinema(data) {
        return await dbCinemaTable.find({});
    }

    static async delete(delArr) {
        return await dbCinemaRoomTable.deleteMany({ _id: { $in: delArr } });
    }

    static async insert(cinema) {
        for (const cinemaOne of cinema) {
            let sequence = await dbSequence.findOneAndUpdate({ _id: "cinemaId" }, { $inc: { sequenceValue: 1 } });
            cinemaOne._id = sequence.sequenceValue;
        }
        return await dbCinemaRoomTable.insertMany(cinema);
    }

    static async update(cinema) {
        return await dbCinemaRoomTable.updateMany({ _id: parseInt(cinema._id) }, {
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

module.exports = CinemaRoomModel;

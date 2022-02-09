/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:20:09 Thu
 * @LastEditTime: 2022-02-07 20:39:24 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbFilmTable = require("../data/filmSchema.js");
let dbFilmTypeTable = require("../data/filmTypeSchema.js");
let dbFilmDistrictTable = require("../data/filmDistrictSchema.js");
let dbSequence = dbUtil.dbSequence;

let sortObj = {};
let matchObj = {};
class FilmModel {
    static async query(nowPage, pageCount, data) {
        sortObj = {};
        matchObj = {};
        if (data.name) {
            matchObj.name = { $regex: data.name };
        }
        if (data.typeId) {
            matchObj.typeId = data.typeId - 0;
        }
        if (data.districtId) {
            matchObj.districtId = data.districtId - 0;
        }

        if (data.startTime) {
            matchObj.startTime = { $gt: data.startTime };
        }

        if (data.classicFlag) {
            matchObj.startTime = { $lt: data.startTime };
        }

        if (data.sortType) {
            if (data.sortType == 0) {
                sortObj._id = 1;
            } else if (data.sortType == 1 || data.sortType == -1) {
                sortObj.districtId = data.sortType - 0;
            } else {
                sortObj._id = 1;
            }
        } else {
            sortObj._id = 1;
        }

        if (data.sortCondition) {
            sortObj[data.sortCondition] = 1;
            delete sortObj._id;
        }
        return await dbFilmTable.aggregate([{
            $match: matchObj
        }, {
            $lookup: {
                from: "filmType",
                localField: "typeId",
                foreignField: "_id",
                as: "typeIdToName"
            }
        }, {
            $lookup: {
                from: "filmDistrict",
                localField: "districtId",
                foreignField: "_id",
                as: "districtIdToName"
            }
        }, {
            $sort: sortObj
        }, {
            $skip: (nowPage - 1) * (pageCount - 0)
        }, {
            $limit: pageCount - 0
        }]);
    }

    static async queryWantSeeNum(data) {
        return await dbFilmTable.find({});
    }

    static async getCount(data) {
        let list = await dbFilmTable.aggregate([
            {
                $match: matchObj
            },
        ]);
        return await list.length;
    }

    static async queryType(data) {
        return await dbFilmTypeTable.find({});
    }

    static async queryDistrict(data) {
        return await dbFilmDistrictTable.find({});
    }

    static async queryFilmDetail(data) {
        return await dbFilmTable.aggregate([{
            $match: { _id: data - 0 }
        }, {
            $lookup: {
                from: "filmType",
                localField: "typeId",
                foreignField: "_id",
                as: "typeIdToName"
            }
        }, {
            $lookup: {
                from: "filmDistrict",
                localField: "districtId",
                foreignField: "_id",
                as: "districtIdToName"
            }
        }]);
    }

    static async queryHotPlayerFilm(nowTime, beforeTime) {
        return await dbFilmTable.find({ startTime: { $gte: beforeTime, $lte: nowTime } }).skip(0).limit(10);
    }

    static async queryAfterPlayerFilm(time) {
        return await dbFilmTable.find({ startTime: { $gte: time } }).skip(0).limit(8);
    }

    static async delete(delArr) {
        return await dbFilmTable.deleteMany({ _id: { $in: delArr } });
    }

    static async insert(film) {
        for (const filmOne of film) {
            let sequence = await dbSequence.findOneAndUpdate({ _id: "filmId" }, { $inc: { sequenceValue: 1 } });
            filmOne._id = sequence.sequenceValue;
        }
        return await dbFilmTable.insertMany(film);
    }

    static async updateTemp(film) {
        let random = parseInt(Math.random() * 1000000) + 100000;
        return await dbFilmTable.updateMany({ _id: film._id - 0 }, {
            $set:
            {
                wantSeeNum: random
            }
        });
    }

    static async update(film) {
        return await dbFilmTable.updateMany({ _id: parseInt(film._id) }, {
            $set:
            {
                name: film.name,
                address: film.address,
                img: film.img,
                phone: film.phone,
                districtId: film.districtId - 0,
            }
        });
    }

    static async queryAllType() {
        return await dbFilmTypeTable.find({});
    }
}

module.exports = FilmModel;

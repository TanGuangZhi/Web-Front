/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:20:09 Thu
 * @LastEditTime: 2022-01-21 19:57:25 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbFilmTable = require("../data/filmSchema.js");
let dbFilmTypeTable = require("../data/filmTypeSchema.js");
let dbFilmDistrictTable = require("../data/filmDistrictSchema.js");
let dbSequence = dbUtil.dbSequence;

class FilmModel {
    static async query(nowPage, pageCount, data) {
        let sortObj = {};
        let matchObj = {};
        if (data.name != "") {
            matchObj.name = { $regex: data.name };
        }
        if (data.typeId != "") {
            matchObj.typeId = data.typeId - 0;
        }
        if (data.districtId != "") {
            matchObj.districtId = data.districtId - 0;
        }
        if (data.sortType == 0) {
            sortObj._id = 1;
        } else if (data.sortType == 1 || data.sortType == -1) {
            sortObj.districtId = data.sortType - 0;
        } else {
            sortObj._id = 1;
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

    static async getCount(data) {
        let matchObj = {};
        if (data.name != "") {
            matchObj.name = { $regex: data.name };
        }
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

/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:54 Tue
 * @LastEditTime: 2022-02-26 17:51:48 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
let dbUtil = require("../util/dbUtil");
let dbSequence = dbUtil.dbSequence;
let dbFilm = require("../entity/film");

class FilmModel {
    async queryFilm(data) {
        let multipleQueryObj = {};
        let sortObj = {};
        let limit = null;
        if (data.filmName) {
            multipleQueryObj.filmName = { $regex: data.filmName };
        }
        if (data.filmType) {
            multipleQueryObj.filmType = { $regex: data.filmType };
        }
        if (data.sortBy) {
            sortObj[data.sortBy] = -1;
        }
        if (data.limit) {
            limit = data.limit;
        }
        return await dbFilm.find(multipleQueryObj).sort(sortObj).limit(limit);
    }
    async insertFilm(film) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "fid" }, { $inc: { sequenceValue: 1 } });
        film._id = sequence.sequenceValue;
        return await dbFilm.insertMany([film]);
    }
    async deleteFilm(_id) {
        return await dbFilm.deleteMany({ _id });
    }
    async updateFilm(film) {
        return await dbFilm.updateMany({ _id: parseInt(film._id) },
            {
                $set: {
                    filmName: film.filmName,
                    filmPrice: parseFloat(film.filmPrice),
                    filmImg: film.filmImg,
                    filmScore: parseFloat(film.filmScore),
                    filmType: film.filmType
                }
            },
            { multi: true });
    }

    async judgeIsFilmNameExist(film) {
        return await dbFilm.find({ filmName: film.filmName, "_id": { $nin: [film._id] } });
    }

    async queryFilmType() {
        return await dbFilm.aggregate([{
            $group: {
                _id: "$filmType",
                count: { $sum: 1 }

            }
        }, {
            // 控制显示哪些字段（不写project也行，数据会多一些而已），1代表回显
            $project: {
                "filmType": 1,
                "count": 1
            }
        }
        ])
    }
}
module.exports = FilmModel;

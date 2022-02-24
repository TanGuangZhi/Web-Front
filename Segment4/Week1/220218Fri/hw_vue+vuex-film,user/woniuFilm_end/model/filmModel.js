/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:54 Tue
 * @LastEditTime: 2022-02-24 20:15:05 Thu
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
        if (data.filmName) {
            multipleQueryObj.filmName = { $regex: data.filmName };
        }
        if (data.filmType) {
            multipleQueryObj.filmType = { $regex: data.filmType };
        }
        return await dbFilm.find(multipleQueryObj)
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
}
module.exports = FilmModel;

/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-07 19:55:32 Fri
 * @LastEditTime: 2022-01-11 19:04:25 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * * V1.0.0 20220111Tue: use mongoose to connect to the mongodb
 * @KeyWords: Kw
 */

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/filmdb");

// get the schema of db table 
let filmSchema = mongoose.Schema({
    _id: Number,
    filmName: String,
    filmType: String,
    filmPrice: Number,
    filmScore: Number,
    filmImg: String
})

// get the table object
let filmTable = mongoose.model("film", filmSchema, "film");

// for id auto increment
let sequenceSchema = mongoose.Schema({
    _id: String,
    sequenceValue: Number
});
//得到sequence的集合(表格)对象
let dbSequence = mongoose.model("sequence", sequenceSchema, "sequence");
class BookModule {
    static count = 5;

    async insertBook(book) {
        let fid = await dbSequence.findOneAndUpdate({ _id: "fid" }, { $inc: { sequenceValue: 1 } });
        let insertResult = await filmTable.insertMany([{
            _id: fid.sequenceValue,
            filmName: '烈日灼心',
            filmType: '犯罪',
            filmPrice: 68.88888,
            filmScore: 9.6,
            filmImg: 'images/film/13.jpg'
        }]);
        return insertResult.length > 0 ? "1" : "0";
    }

    async updateBook(data) {
        let updateResult = await filmTable.updateMany({ _id: data._id - 0 }, {
            $set: {
                bookName: data.bookName,
                bookPrice: data.bookPrice - 0,
                bookImg: "",
                bookType: data.bookType,
                bookCount: data.bookCount - 0,
                bookNum: data.bookNum - 0,
            }
        });
        return updateResult.modifiedCount > 0 ? "1" : "0"
    }

    async delBook(delArr) {
        let delResult = await filmTable.deleteMany({ _id: { $in: delArr } });
        return delResult.deletedCount > 0 ? "1" : "0";
    }

    async queryBook() {
        return await filmTable.find({});
    }
}
module.exports = BookModule;

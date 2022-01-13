/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-11 19:06:53 Tue
 * @LastEditTime: 2022-01-12 15:18:51 Wed
 * @LastEditors: TanGuangZhi
 * @Description: connect to mongoose
 * @KeyWords: NodeJs, Express, MongoDB
 */
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookdb");
let bookSchema = mongoose.Schema({
    _id: Number,
    bookName: String,
    bookType: String,
    bookImg: String,
    bookPrice: Number,
    bookCount: Number,
    bookNum: Number
});
let dbBook = mongoose.model("book", bookSchema, "book");

let sequenceSchema = mongoose.Schema({
    _id: String,
    sequenceValue: Number
});
let dbSequence = mongoose.model("sequence", sequenceSchema, "sequence");

class BookModel {
    async queryBook(limit) {
        // let queryResult = dbBook.find({});
        let limitObj, sortObj = {};
        if (limit.bookName) {
            limitObj.bookName = { $regex: limit.bookName };
        }
        if (limit.bookType) {
            limitObj.bookType = limit.bookType;
        }
        if (limit.sortType == 0) {
            sortObj = { _id: 1 };
        } else {
            sortObj = { bookCount: limit.sortType };
        }

        console.log(limitObj);
        let queryResult = dbBook.find(limitObj)
            .sort(sortObj)
            .skip(0)
            .limit(6);
        return queryResult;
    }

    async deleteBook(delArr) {
        return await dbBook.deleteMany({ _id: { $in: delArr } });
    }

    async addBook(book) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "bid" }, { $inc: { sequenceValue: 1 } });
        book._id = sequence.sequenceValue;
        return await dbBook.insertMany([book]);
    }

    async updateBook(book) {
        return await dbBook.updateMany({ _id: parseInt(book._id) }, {
            $set:
            {
                bookName: book.bookName,
                bookPrice: parseFloat(book.bookPrice),
                bookImg: book.bookImg,
                bookType: book.bookType,
                bookCount: parseInt(book.bookCount),
                bookNum: parseInt(book.bookNum)
            }
        });
    }

}

module.exports = BookModel;

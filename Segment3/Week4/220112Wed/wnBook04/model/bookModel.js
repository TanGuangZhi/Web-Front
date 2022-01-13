let dbUtil = require("../util/dbUtil");
let dbBook = dbUtil.dbBook;
let dbSequence = dbUtil.dbSequence;
class BookModel {
    async queryBook(nowPage, pageCount, book) {
        let obj = {};
        if (book.bookName) {
            obj.bookName = { $regex: book.bookName };
        }
        if (book.bookType) {
            obj.bookType = book.bookType;
        }
        console.log(obj);
        let sortObj = {};
        if (book.sortType != 0) {
            sortObj.bookCount = parseInt(book.sortType);//{bookCount:-1}
        }
        return await dbBook.find(obj).skip((nowPage - 1) * pageCount).limit(pageCount).sort(sortObj);
    }

    async getBookLength(book) {
        let obj = {};
        if (book.bookName) {
            obj.bookName = { $regex: book.bookName };
        }
        if (book.bookType) {
            obj.bookType = book.bookType;
        }
        let bookList = await dbBook.find(obj);
        return await bookList.length;
    }
    async deleteBook(_id) {
        return await dbBook.deleteMany({ _id });
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
        }, { multi: true });
    }
}

module.exports = BookModel;

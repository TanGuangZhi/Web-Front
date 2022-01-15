let dbUtil=require("../util/dbUtil");
let dbSequence=dbUtil.dbSequence;
let dbBook=require("../data/book");

class BookModel{
    async queryBook(nowPage,pageCount){
        return await dbBook.find({}).skip((nowPage-1)*pageCount).limit(pageCount);
    }
    async getBookListLength(){
        let bookList=await dbBook.find({});
        return await bookList.length;
    }

    async deleteBook(_id){
        return await dbBook.deleteMany({_id});
    }
    async deleteManyBook(idArr){
       return await dbBook.deleteMany({_id:{$in:idArr}});
    }
    async addBook(book){
        let sequence=await dbSequence.findOneAndUpdate({_id:"bid"},{$inc:{sequenceValue:1}});
        book._id=sequence.sequenceValue;
        return await dbBook.insertMany([book]);
    }

    async addManyBook(bookList){
        for(let book of bookList){
            let sequence=await dbSequence.findOneAndUpdate({_id:"bid"},{$inc:{sequenceValue:1}});
            book._id=sequence.sequenceValue;
        }
        return await dbBook.insertMany(bookList);
    }
}

module.exports=BookModel;

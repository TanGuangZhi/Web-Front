let dbUtil=require("../util/dbUtil");
let bookSchema=dbUtil.mongoose.Schema({
    _id:Number,
    bookName:String,
    bookImg:String,
    bookType:String,
    bookCount:Number,
    bookPrice:Number,
    bookNum:Number
});

let dbBook=dbUtil.mongoose.model("Book",bookSchema,"book");

module.exports=dbBook;
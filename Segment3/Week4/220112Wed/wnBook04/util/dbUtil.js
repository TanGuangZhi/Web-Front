let mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookdb");
class DBUtil{
    static dbBook=DBUtil.getCollection("Book",{
        _id:Number,
        bookName:String,
        bookType:String,
        bookImg:String,
        bookPrice:Number,
        bookCount:Number,
        bookNum:Number
    },"book");

    static dbSequence=DBUtil.getCollection("Sequence",{
        _id:String,
        sequenceValue:Number
    },"sequence");

    static dbUser=DBUtil.getCollection("User",{
        _id:Number,
        userName:String,
        userPass:String,
        userPhone:String,
        userScore:Number
    },"user");

    static getCollection(modelName,modelData,collectionName){
        let objSchema=mongoose.Schema(modelData);
        let dbCollection=mongoose.model(modelName,objSchema,collectionName);
        return dbCollection;
    }
}
module.exports=DBUtil;
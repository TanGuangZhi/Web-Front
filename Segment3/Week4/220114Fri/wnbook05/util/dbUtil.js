let mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookdb");
class DBUtil{
    static mongoose=mongoose;//将mongoose对象共享出来
    static dbSequence=mongoose.model("Sequence",mongoose.Schema({
        _id:String,
        sequenceValue:Number
    }),"sequence");
}
module.exports=DBUtil;
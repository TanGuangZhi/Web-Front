let dbUtil=require("../util/dbUtil");
let filmSchema=dbUtil.mongoose.Schema({
   _id:Number,
   filmName:String,
   filmPrice:Number,
   filmType:String,
   filmImg:String,
   filmScore:Number
});
let dbFilm=dbUtil.mongoose.model("Film",filmSchema,"film");
module.exports=dbFilm;

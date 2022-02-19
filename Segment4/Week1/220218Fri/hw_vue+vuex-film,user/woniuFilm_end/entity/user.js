let dbUtil=require("../util/dbUtil");
let userSchema=dbUtil.mongoose.Schema({
   _id:Number,
   userName:String,
   userPass:String,
   userPhone:String,
   userType:Number,
   status:Number,
   email:String,
   uuid:String
});

let dbUser=dbUtil.mongoose.model("User",userSchema,"user");
module.exports=dbUser;
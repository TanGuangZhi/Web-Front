let dbUtil=require("../util/dbUtil");
let dbUser=dbUtil.dbUser;
let dbSequence=dbUtil.dbSequence;

class UserModel{
    async queryUser(){
        return await dbUser.find({});
    }

    async addUser(user){
       let sequence=await dbSequence.findOneAndUpdate({_id:"uid"},{$inc:{sequenceValue:1}});
       user._id=sequence.sequenceValue;
       return await dbUser.insertMany([user]);
    }
    async addManyUser(userList){
        for(let user of userList){
            let sequence=await dbSequence.findOneAndUpdate({_id:"uid"},{$inc:{sequenceValue:1}});
            user._id=sequence.sequenceValue;
        }
    }
}
module.exports=UserModel;


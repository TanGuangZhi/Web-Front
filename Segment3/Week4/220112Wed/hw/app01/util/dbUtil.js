let mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/appdb");
class DBUtil{
    static dbAppType=DBUtil.getCollection("AppType",{
        _id:Number,
        type:String
    },"appType");
    static dbAppPlatform=DBUtil.getCollection("AppPlatform",{
        _id:Number,
        platform:String
    },"appPlatform");
    static dbApp=DBUtil.getCollection("App",{
        _id:Number,
        appName:String,
        appSize:Number,
        appTypeId:Number,
        appPlatformId:Number,
        appDownLoadCount:Number,
        appImg:String,
        appPlatform:[{
           _id:Number,
           platform:String
        }],
        appType:[{
            _id:Number,
            type:String
        }]
    },"app");

    static dbSequence=DBUtil.getCollection("Sequence",{
        _id:String,
        sequenceValue:Number
    },"sequence");

    static getCollection(modelName,modelData,collectionName){
        let objSchema=mongoose.Schema(modelData);
        let dbCollection=mongoose.model(modelName,objSchema,collectionName);
        return dbCollection;
    }
}
module.exports=DBUtil;
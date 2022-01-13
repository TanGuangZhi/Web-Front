/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-12 15:45:39 Wed
 * @LastEditTime: 2022-01-12 16:22:56 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bookdb");

let appSchema = mongoose.Schema({
    _id: Number,
    appName: String,
    appTypeId: Number,
    appPlatformId: Number,
    appDownloadCount: Number,
    appSize: Number,
    appImg: String,
    typeId: String,
    platformId: String,
})

let appTable = mongoose.model("app", appSchema, "app");

class AppModel {
    async queryApp() {
        return await appTable.find({});
    }

    async queryAppType() {
        return await appTable.aggregate([{
            $lookup: {
                from: "appType",
                localField: "appTypeId",
                foreignField: "_id",
                as: "typeId"
            }
        }, {
            $lookup: {
                from: "appPlatform",
                localField: "appPlatformId",
                foreignField: "_id",
                as: "platFormId"
            }
        }, {
            $group: { _id: "$typeId" }
        }]);
    }

    async queryAppPlatform() {
        return await appTable.aggregate([{
            $lookup: {
                from: "appType",
                localField: "appTypeId",
                foreignField: "_id",
                as: "typeId"
            }
        }, {
            $lookup: {
                from: "appPlatform",
                localField: "appPlatformId",
                foreignField: "_id",
                as: "platFormId"
            }
        }, {
            $group: { _id: "$platFormId" }
        }]);
    }
}

module.exports = AppModel;

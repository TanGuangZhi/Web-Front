/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-12 19:13:24 Wed
 * @LastEditTime: 2022-01-13 10:03:53 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let dbAppType = dbUtil.dbAppType;
let dbAppPlatform = dbUtil.dbAppPlatform;
let dbApp = dbUtil.dbApp;
let dbSequence = dbUtil.dbSequence;

class AppModel {
    async queryAppType() {
        return await dbAppType.find({});
    }

    async queryAppPlatform() {
        return await dbAppPlatform.find({});
    }

    async queryApp(nowPage, pageCount, data) {
        let matchObj = {};
        let sortObj = {};
        // console.log(data);
        if (data.appName != "") {
            matchObj.appName = { $regex: data.appName };
        }
        if (data.appTypeId != 0) {
            matchObj.appTypeId = data.appTypeId - 0;
        }
        if (data.appPlatformId != 0) {
            matchObj.appPlatformId = data.appPlatformId - 0;
        }
        if (data.sortType != 0) {
            sortObj.appDownLoadCount = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }
        let appList = await dbApp.aggregate([
            {
                $match: matchObj
            }, {
                $lookup: {
                    from: "appType",
                    localField: "appTypeId",
                    foreignField: "_id",
                    as: "appType"
                }
            }, {
                $lookup: {
                    from: "appPlatform",
                    localField: "appPlatformId",
                    foreignField: "_id",
                    as: "appPlatform"
                }
            }, {
                $sort: sortObj
            }, {
                $skip: (nowPage - 1) * (pageCount - 0)
            }, {
                $limit: pageCount - 0
            }
        ]);
        return appList;
    }

    async getAppCount(data) {
        let matchObj = {};
        if (data.appName != "") {
            matchObj.appName = { $regex: data.appName };
        }
        if (data.appTypeId != 0) {
            matchObj.appTypeId = data.appTypeId - 0;
        }
        if (data.appPlatformId != 0) {
            matchObj.appPlatformId = data.appPlatformId - 0;
        }
        let appList = await dbApp.aggregate([
            {
                $match: matchObj
            },
            {
                $lookup: {
                    from: "appType",
                    localField: "appTypeId",
                    foreignField: "_id",
                    as: "appType"
                }
            },
            {
                $lookup: {
                    from: "appPlatform",
                    localField: "appPlatformId",
                    foreignField: "_id",
                    as: "appPlatform"
                }
            }
        ]);
        return await appList.length;
    }

    async deleteApp(delArr) {
        return await dbApp.deleteMany({ _id: { $in: delArr } });
    }

    async addApp(app) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "appId" }, { $inc: { sequenceValue: 1 } });
        app._id = sequence.sequenceValue;
        // console.log(app);
        return await dbApp.insertMany([app]);
    }

    async updateApp(app) {
        return await dbApp.updateMany({ _id: parseInt(app._id) }, {
            $set:
            {
                appName: app.appName,
                appTypeId: parseFloat(app.appTypeId),
                appImg: app.appImg,
                appPlatformId: app.appPlatformId,
                appDownLoadCount: parseInt(app.appDownLoadCount),
                appSize: parseInt(app.appSize)
            }
        });
    }
}
module.exports = AppModel;

/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 13:11:56 Sat
 * @LastEditTime: 2022-02-10 21:57:32 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbSequence = dbUtil.dbSequence;
let dbOrderTable = require('../data/orderSchema.js');
let dbFilmTable = require("../data/filmSchema.js");

class OrderModel {
    static async insertOrder(data) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "orderId" },
            { $inc: { sequenceValue: 1 } });
        data._id = sequence.sequenceValue;
        return await dbOrderTable.insertMany([data]);
    }

    static async updateOrder(data) {

        let nowTime = new Date().Format("yyyy-MM-dd HH:mm");
        return await dbOrderTable.updateMany({ orderId: data.orderId - 0 }, {
            $set:
            {
                status: "completed",
                completeTime: nowTime
            }
        });
    }

    static async addViews(data) {
        return await dbFilmTable.findOneAndUpdate({ _id: data.filmId - 0 }, {
            $inc: { views: data.allTotal - 0 }
        }
        );
    }

    static async queryTodayBoxOffice(data) {
        let today = new Date().Format('yyyy-MM-dd');
        let todayStart = today + " 00:00";
        let todayEnd = today + " 23:59";
        // console.log(today);
        // return await dbOrderTable.find({ $and: [{ completeTime: { $gt: todayStart } }, { completeTime: { $lt: todayEnd } }] });
        return await dbOrderTable.aggregate([{
            $match:
                { $and: [{ completeTime: { $gt: todayStart } }, { completeTime: { $lt: todayEnd } }] }
        }, {
            $lookup: {
                from: "film",
                localField: "filmId",
                foreignField: "_id",
                as: "filmIdToDetail"
            }
        }, {
            $group: {
                _id: "$filmId",
                sum: { $sum: "$price" }
            }
        }])
    }

    static async queryAllSaledSeat(data) {
        return await dbOrderTable.find({
            cinemaId: data.cinemaId - 0,
            roomId: data.roomId - 0,
            filmId: data.filmId - 0,
            // cinemaId: 3,
            // roomId: 1,
            // filmId: 8,
            // cinemaId: 2,
            // roomId: 5,
            // filmId: 4,
        });
    }
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
module.exports = OrderModel;

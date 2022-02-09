/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 13:11:56 Sat
 * @LastEditTime: 2022-02-08 22:41:47 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbSequence = dbUtil.dbSequence;
let dbOrderTable = require('../data/orderSchema.js');

class OrderModel {
    static async insertOrder(data) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "orderId" },
            { $inc: { sequenceValue: 1 } });
        data._id = sequence.sequenceValue;
        return await dbOrderTable.insertMany([data]);
    }

    static async updateOrder(data) {
        return await dbOrderTable.updateMany({ orderId: data.orderId - 0 }, {
            $set:
            {
                status: "completed",
                completeTime: "now"
            }
        });
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
module.exports = OrderModel;

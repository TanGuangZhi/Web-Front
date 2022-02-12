/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 13:11:56 Sat
 * @LastEditTime: 2022-02-09 21:50:44 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbSequence = dbUtil.dbSequence;
let dbCommentTable = require('../data/commentSchema.js');

class CommentModel {
    static async queryComment(filmId) {
        return await dbCommentTable.aggregate([
            {
                $match: { filmId }
            }, {
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userIdToDetail"
                }
            }]);;
    }

    static async insertComment(data) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "commentId" },
            { $inc: { sequenceValue: 1 } });
        data._id = sequence.sequenceValue;
        return await dbCommentTable.insertMany([data]);
    }


}
module.exports = CommentModel;

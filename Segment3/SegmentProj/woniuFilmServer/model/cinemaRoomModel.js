/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:20:09 Thu
 * @LastEditTime: 2022-02-11 12:57:42 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require('../util/dbUtil');
let dbCinemaRoomTable = require("../data/cinemaRoomSchema");
let dbRoomTable = require("../data/roomSchema.js");
let dbCinemaTable = require("../data/cinemaSchema.js");
let dbFilmTable = require("../data/filmSchema.js");
let dbCinemaBrandTable = require("../data/cinemaBrandSchema.js");
let dbSequence = dbUtil.dbSequence;

let sortObj = {};
let matchObj = {};
let queryResult;
class CinemaRoomModel {
    static async query(nowPage, pageCount, data) {
        sortObj = {};
        matchObj = {};
        if (data.name) {
            // matchObj.name = { $regex: data.name };
            let queryResult = await dbRoomTable.find({ name: data.name });
            queryResult = JSON.parse(JSON.stringify(queryResult));
            matchObj.roomId = queryResult[0]?._id;
        }

        if (data.cinemaId) {
            matchObj.cinemaId = data.cinemaId - 0;
        }

        if (data.filmId) {
            matchObj.filmId = data.filmId - 0;
        }

        if (data.sortType == 0) {
            sortObj._id = 1;
        } else if (data.sortType == 1 || data.sortType == -1) {
            sortObj.session = data.sortType - 0;
        } else {
            sortObj._id = 1;
        }

        queryResult = await dbCinemaRoomTable.aggregate([{
            $match: matchObj
        }, {
            $lookup: {
                from: "cinema",
                localField: "cinemaId",
                foreignField: "_id",
                as: "cinemaIdToDetails"
            }
        }, {
            $lookup: {
                from: "film",
                localField: "filmId",
                foreignField: "_id",
                as: "filmIdToDetails"
            }
        }, {
            $lookup: {
                from: "room",
                localField: "roomId",
                foreignField: "_id",
                as: "roomIdToDetails"
            }
        }, {
            $sort: sortObj
        }, {
            $skip: (nowPage - 1) * (pageCount - 0)
        }, {
            $limit: pageCount - 0
        }]);

        if (data.districtId) {
            let temp = [];
            queryResult.forEach(element => {
                if (element.cinemaIdToDetails[0].districtId == data.districtId) {
                    temp.push(element);
                }
            });
            queryResult = temp;
        }
        return queryResult;
    }

    static async getCount(data) {
        let list = await dbCinemaRoomTable.aggregate([
            {
                $match: matchObj
            },
        ]);
        if (data.districtId) {
            return queryResult.length;
        }
        return await list.length;
    }

    static async queryCinema(data) {
        return await dbCinemaBrandTable.find({});
    }

    static async queryCinemaRoom(data) {
        return await dbCinemaRoomTable.aggregate([
            {
                $match: { cinemaId: data.cinemaId - 0 }
            }, {
                $lookup: {
                    from: "film",
                    localField: "filmId",
                    foreignField: "_id",
                    as: "filmIdToDetails"
                }
            }
        ]);
    }

    static async queryRoomLevel(data) {
        return await dbRoomTable.aggregate([
            { $group: { _id: "$level" } },
            { $sort: { _id: 1 } }
        ])
    }

    static async queryFilm(data) {
        return await dbFilmTable.find({});
    }

    static async delete(delArr) {
        return await dbCinemaRoomTable.deleteMany({ _id: { $in: delArr } });
    }

    static async insert(cinema) {
        let roomArr = [];
        let room = {};
        for (let roomOne of cinema) {
            room = {};
            let sequence = await dbSequence.findOneAndUpdate({ _id: "roomId" },
                { $inc: { sequenceValue: 1 } });
            room._id = sequence.sequenceValue;
            // room.level = roomOne.roomLevel - 0;
            room.level = 1;
            room.name = roomOne.roomName;
            roomArr.push(room);
        }
        await dbRoomTable.insertMany(roomArr);

        let temp = {}
        let tempArr = [];
        for (let cinemaOne of cinema) {
            delete cinemaOne.roomLevel;
            delete cinemaOne.roomName;
            let sequence = await dbSequence.findOneAndUpdate({ _id: "cinemaRoomId" },
                { $inc: { sequenceValue: 1 } });
            cinemaOne._id = sequence.sequenceValue;
            cinemaOne.roomId = room._id - 0;
            // temp._id = cinemaOne._id;
            // temp.cinemaId = cinemaOne.cinemaId;
            // temp.language = cinemaOne.detailsPosition;
            // temp.filmId = cinemaOne.language;
            // temp.detailsPosition = cinemaOne.undefined;
            // temp.roomId = room._id - 0;
            // temp.session = cinemaOne.filmId;
            // temp.roomSize = cinemaOne.roomSize + "," + cinemaOne.session;
            // // cinemaOne = temp;
            // tempArr.push(temp);
        }
        return await dbCinemaRoomTable.insertMany(cinema);
    }

    static async insert2(cinema) {
        let room = {};
        let cinemaRoom = {};
        let film = {};
        cinema.forEach(element => {
            room.roomId = element.roomId - 0;
            // room.roomSize = element.roomSize - 0;
            room.level = 1;
            cinemaRoom.cinemaId = element.cinemaId - 0;
            cinemaRoom.roomSize = element.roomSize + "," + element.session;
            cinemaRoom.language = element.details;
            film.filmId = element.language;
        });
        await dbRoomTable.insertMany([room]);
        return await dbCinemaRoomTable.insertMany(cinema);
    }
    static async update(cinema) {
        let room = {};
        for (const roomOne of [cinema]) {
            room._id = roomOne.roomId - 0;
            room.level = roomOne.roomLevel - 0;
            room.name = roomOne.roomName;
        }
        await dbRoomTable.updateMany({ _id: room._id }, {
            $set:
            {
                name: room.name,
                level: room.level,
            }
        });
        return await dbCinemaRoomTable.updateMany({ _id: parseInt(cinema._id) }, {
            $set:
            {
                roomSize: cinema.roomSize,
                language: cinema.language,
                session: cinema.session,
                filmId: cinema.filmId - 0,
                cinemaId: cinema.cinemaId - 0,
            }
        });
    }

    static async queryAllType() {
        return await dbCinemaTypeTable.find({});
    }
}

module.exports = CinemaRoomModel;

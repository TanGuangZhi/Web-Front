/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 19:51:30 Fri
 * @LastEditTime: 2022-03-04 16:08:26 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let dbSequence = dbUtil.dbSequence;
let dbFood = require("../entity/food");

class FoodModel {
    async queryFood(data) {
        let multipleQueryObj = {};
        if (data.foodType) {
            multipleQueryObj.foodType = { $regex: data.foodType };
        }
        return await dbFood.find(multipleQueryObj);
    }

    async queryFoodType() {
        return await dbFood.aggregate([{
            $group: {
                _id: "$foodType"
            }
        }]);
    }

    async insertFood(food) {
        let sequence = await dbSequence.findOneAndUpdate({ _id: "uid" }, { $inc: { sequenceValue: 1 } });
        food._id = sequence.sequenceValue;
        return await dbFood.insertMany([food]);
    }

    async deleteFood(_idArr) {
        return await dbFood.deleteMany({ _id: { $in: _idArr } });
    }

    async updateFood(food) {
        return await dbFood.updateMany({ _id: parseInt(food._id) },
            {
                $set: {
                    foodName: food.foodName,
                    foodPass: parseFloat(food.foodPass),
                    foodPhone: food.foodPhone,
                    foodScore: parseFloat(food.foodScore),
                }
            },
            { multi: true });
    }

    async loginFood(foodName) {
        return await dbFood.find({ foodName });
    }

    async judgeIsFoodNameExist(food) {
        return await dbFood.find({ foodName: food.foodName, "_id": { $nin: [food._id] } });
    }
}
module.exports = FoodModel;

/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-04 19:23:41 Tue
 * @LastEditTime: 2022-01-04 20:25:04 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
class GoodsModule {
    static count = 4;
    goodsList = [
        { "id": 1, "goodsName": "iis", "goodsprice": "1234", "goodsPhone": "110" },
        { "id": 2, "goodsName": "tomcat", "goodsprice": "1234", "goodsPhone": "111" },
        { "id": 3, "goodsName": "node.js", "goodsprice": "1234", "goodsPhone": "112" },
        { "id": 4, "goodsName": "jboss", "goodsprice": "1234", "goodsPhone": "113" }
    ];
    queryGoods() {
        console.table(this.goodsList);
        return this.goodsList;
    }

    addGoods(goodsInfoList) {
        goodsInfoList.id = GoodsModule.count += 1;
        this.goodsList.push(goodsInfoList)
        return 1;
    }

    delGoods(delArr) {
        this.goodsList = this.goodsList.filter(item => {
            // includes is all equal ,so to avoid 1 or "1",use this method to solve
            return !delArr.includes(item.id);
        })
        return 1;
    }

    changeGoods(goodsInfoList) {
        this.goodsList = this.goodsList.map((item) => {
            if (item.id == goodsInfoList.id) {
                return goodsInfoList;
            }
            return item;
        })
        // writeData(this.userList);
        return 1;
    }
}

module.exports = GoodsModule;
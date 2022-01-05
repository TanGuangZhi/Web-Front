/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-04 16:34:37 Tue
 * @LastEditTime: 2022-01-04 16:46:46 Tue
 * @LastEditors: TanGuangZhi
 * @Description: my some util class
 * @KeyWords: Kw
 */

class MyUtils {

    /**
     * @description: 
     * @param {*} dataStr: the data form csv
     * @return {*} objList: put the csv data into json array
     */
    
    strToJson(dataStr) {//只能处理csv读取进来的数据（逗号隔开）
        let objList = [];//json对象数组
        //回车符号: \r\n
        let dataArr = dataStr.split("\r\n");
        let fieldNames = dataArr[0].split(",");//拿到所有的属性名字
        for (let i = 1; i < dataArr.length; i++) {
            let str = `{`;
            let fieldValues = dataArr[i].split(",");
            for (let j = 0; j < fieldValues.length; j++) {
                if (j < fieldValues.length - 1) {
                    str += `"${fieldNames[j]}":"${fieldValues[j]}",`;
                } else {//最后一个属性可以不加逗号
                    str += `"${fieldNames[j]}":"${fieldValues[j]}"`;
                }
            }
            str += `}`;
            objList.push(JSON.parse(str));
        }
        return objList;
    }
}
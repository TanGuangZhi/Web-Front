/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-16 19:40:00 Wed
 * @LastEditTime: 2022-02-16 19:46:09 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

exports.compare = function (obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
        return false
    } else {
        for (key in obj1) {
            if (obj2.hasOwnProperty(key)) {
                if (!Object.is(obj1[key], obj2[key])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}

// let obj1 = { name: 111, id: 11 };
// let obj2 = { id: 11, name: 111 };
// let obj11 = { id: 111, name: 111 };
// let obj111 = { name: 111, id: 11 };
// console.log(compare(obj1, obj111));

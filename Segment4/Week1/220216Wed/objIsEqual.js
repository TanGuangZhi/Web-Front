/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-16 17:39:13 Wed
 * @LastEditTime: 2022-02-16 17:40:18 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
function compare(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
        return false
    } else {
        for (key in obj1) {
            if (obj2.hasOwnProperty(key)) {
                if (!Object.is(obj1[key], obj2[key])) {
                    return false;
                }
            } else {
                return false
            }
        }
        return true
    }
}

let obj1 = { name: 111, id: 11 };
let obj2 = { id: 11, name: 111 };
let obj11 = { id: 111, name: 111 };
let obj111 = { name: 111, id: 11 };
console.log(compare(obj1, obj111));

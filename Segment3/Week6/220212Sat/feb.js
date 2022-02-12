/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-12 11:04:23 Sat
 * @LastEditTime: 2022-02-12 11:31:30 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

// function feb(params) {
//     if (params == 1 || params == 2) {
//         return 1;
//     }

//     return feb(params - 1) + feb(params - 2);
// }

// console.log(feb(45));


// let tempArr = [];
// console.log(tempArr[1]);

function feb2(params, arr = []) {
    if (params < 3) {
        arr[0] = 1;
        arr[1] = 1;
        return 1;
    }
    if (arr[params - 1] == undefined) {
        arr[params - 1] = feb2(params - 1, arr) + feb2(params - 2, arr);
    }
    console.log(arr);
    return arr[params - 1];
}
console.log(feb2(100));

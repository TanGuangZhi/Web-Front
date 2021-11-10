// console.log(true)
// console.log(Number(true))
// console.log(parseFloat(true)) // NaN

// // 数字转字符串
// var num = 11;
// var str = num.toString();
// var str2 = num + "";
// console.log(str)
// console.log(str2)

// // 指定保留几位小数(会四舍五入)
// var numFixed = 11.555
// // numFixed.toFixed(1)
// console.log(numFixed.toFixed(1))

// 接受用户输入
var num1 = prompt("请输入数字")
var num2 = prompt("请输入数字")

// 类型转换
num1 = Number(num1)
num2 = Number(num2)

console.log(num1 + num2);
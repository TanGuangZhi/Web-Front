/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-19 16:15:18 Wed
 * @LastEditTime: 2022-01-19 18:39:56 Wed
 * @LastEditors: TanGuangZhi
 * @Description: climb the cat eye cinema info for local db to practice project
 * @KeyWords: NodeJs, Express, MongoDB
 */
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

class Cinema {
    static getxxx() {
        request('https://www.maoyan.com/cinemas', function (error, response, body) {
            let $ = cheerio.load(body);
            console.log($(".tags").text());
            // console.log(body);
            // console.log(pageBody);
            // console.log(pageBody('<ul class="tags">...</ul>').html());
            // console.log(cheerio.load('<ul class="tags">...</ul>').html());
            // let cinemaDivList = pageBody('.tags');
            // console.log(cinemaDivList.attr('class'));
            //通过for循环来提取每部电影里的信息
            // for (let i = 0; i < cinemaDivList.length; i++) {
            //     //takeMovie函数能提取电影名称、评分和封面
            //     let movieInfo = takeCinema(cinemaDivList[i])
            //     //将提取到的电影放入数组
            //     // movies.push(movieInfo)
            // }
            // console.log(cinemaDivList);
            // console.log(cinemaDivList[0]);
            // Array.from(cinemaDivList).forEach(element => {
            //     console.log(0);
            //     let cinemaDiv = cheerio.load(element);
            //     console.log(1);
            //     console.log(cinemaDiv);
            //     console.log(cinemaDiv('li').text());
            //     console.log(cinemaDiv('li').html());
            // });
        })
    }
}

let takeCinema = function (div) {
    let cinemaDiv = cheerio.load(div);
    console.log(cinemaDiv('li').text());
}

function saveDataToCsv(path, data) {
    // data = JSON.stringify(data, null, 2)
    fs.appendFile(path, data, function (error) {
        if (error == null) {
            console.log("success");
        } else {
            console.log(error);
        }
    })
}
Cinema.getxxx();





















// class Cinema {
//     static getxxx() {
//         request('https://cinema.douban.com/top250', function (error, response, body) {
//             //使用cheerio来解析body（网页内容），提取我们想要的信息
//             let pageBody = cheerio.load(body)
//             let cinemaDivList = pageBody('.item')
//             Array.from(cinemaDivList).forEach(element => {
//                 takeCinema(element);
//             });
//         })
//     }
// }
// let takeCinema = function (div) {
//     let cinemaDiv = cheerio.load(div)
//     //将类初始化
//     console.log(cinemaDiv('.title').text());
// }
// Cinema.getxxx();

/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-19 16:11:01 Wed
 * @LastEditTime: 2022-01-19 16:45:41 Wed
 * @LastEditors: TanGuangZhi
 * @Description: test nodejs pa chong
 * @KeyWords: NodeJs, Express, MongoDB
 */
var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')
var movies = []

var requstMovie = function (url) {
    request('https://movie.douban.com/top250', function (error, response, body) {
        //res.statusCode 为200则表示链接成功
        if (error === null && response.statusCode === 200) {
            console.log('链接成功')
            console.log(response);
            //使用cheerio来解析body（网页内容），提取我们想要的信息
            var e = cheerio.load(body)

            //通过分析网页结构，我们发现豆瓣每部电影都通过item属性隔开
            var movieDiv = e('.item')

            //通过for循环来提取每部电影里的信息
            for (let i = 0; i < movieDiv.length; i++) {
                //takeMovie函数能提取电影名称、评分和封面
                let movieInfo = takeMovie(movieDiv[i])
                //将提取到的电影放入数组
                movies.push(movieInfo)
            }
            saveMovie(movies);
            console.log(movies);
        }
    })
}
//电影的类
var movie = function () {
    this.id = 0
    this.name = ''
    this.score = 0
    this.pic = ''
}

var takeMovie = function (div) {
    var e = cheerio.load(div)
    //将类初始化
    var m = new movie()
    m.name = e('.title').text()
    m.score = e('.rating_num').text()
    var pic = e('.pic')
    //cheerio如果要提取某个属性的内容，可以通过attr()
    m.pic = pic.find('img').attr('src')
    m.id = pic.find('em').text()
    return m
}

//保存文件
var saveMovie = function (movies) {
    var path = 'movie.txt'
    var data = JSON.stringify(movies, null, 2)
    fs.appendFile(path, data, function (error) {
        if (error == null) {
            console.log("success");
        } else {
            console.log(error);
        }
    })
}


requstMovie();

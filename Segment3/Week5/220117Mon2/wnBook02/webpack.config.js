/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-17 15:02:36 Mon
 * @LastEditTime: 2022-01-17 17:31:30 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let Path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// web package by batch
const pageList = ["index", "html/book", "html/user"];
function listEntry(entry) {
    let obj = {};
    entry.forEach(item => {
        obj[item] = `./src/js/${item}.js`;
    });
    // const jquery = "util/jquery-3.5.1";
    // const bootstrap = "util/bootstrap";
    // obj[jquery] = `./src/js/${bootstrap}.js`;
    // obj[bootstrap] = `./src/js/${jquery}.js`;
    return obj;
}

function listPage(entry) {
    return newArr = entry.map((item) => {
        return new HtmlWebpackPlugin({
            template: `./src/${item}.html`,
            filename: `${item}.html`,
            chunks: [`${item}`]
        })
    })
}

module.exports = {
    entry: { ...listEntry(pageList) },
    output: {
        path: Path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
    }, plugins: [
        ...listPage(pageList)
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|webp)$/i, //寻找以.css结尾的文件
            exclude: /node_modules/,
            use: {
                loader: "url-loader",
                options: {
                    //图片小于10kb的时候。默认将图片转化为base64位编码
                    limit: 1024 * 10,
                    outputPath: "./images/",
                    //图片这个插件和其他会出现冲突。设置位false可以避免冲突
                    esModule: false
                }
            },
            type: "javascript/auto"  //webpack 5 必须加这个
        }, { // 打包html文件中的img
            test: /.(html|htm)$/i,
            use: ["html-withimg-loader"]
        }]
    },
    devServer: {
        port: 8001,
        open: true,
        hot: true,
    },
    mode: 'development',

}

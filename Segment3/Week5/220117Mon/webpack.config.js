/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-17 09:38:22 Mon
 * @LastEditTime: 2022-01-17 14:23:00 Mon
 * @LastEditors: TanGuangZhi
 * @Description: study wp
 * @KeyWords: NodeJs, Express, MongoDB
 */

let Path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: { // 打包哪里
        index: "./src/js/index.js"
    }, output: { // 打包后放哪里
        path: Path.resolve(__dirname, 'dist'),
        filename: "js/[name].js"
    }, plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 打包文件路径
            filename: "index.html", // 打包文件名字
            chunks: ["index"] // 自动将指定的js文件导入html中
        })
    ], module: {
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
    }, devServer: {
        port: 8001, //修改端口号
        open: true, //启动服务器，打开本地默认浏览器
        hot: true, //启动热更新
    }, mode: "development" // 开发模式
};

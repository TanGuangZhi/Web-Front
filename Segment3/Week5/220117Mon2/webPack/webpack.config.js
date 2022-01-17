/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-17 15:02:36 Mon
 * @LastEditTime: 2022-01-17 15:32:57 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let Path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: { index: "./src/js/index.js" },
    output: {
        path: Path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
    }, plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["index"]
        })
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

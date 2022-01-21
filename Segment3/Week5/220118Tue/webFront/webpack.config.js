/*
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug　　
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 */

/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-17 19:35:32 Mon
 * @LastEditTime: 2022-01-17 21:25:19 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */


let webpack = require("webpack");
let Path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

const pageList = ["index", "html/stu", "html/user"];
function listEntry() {
    let obj = {};
    pageList.forEach(item => {
        obj[item] = `./src/js/${item}.js`
    });
    return obj;
}

function listPage() {
    let newArr = pageList.map(item => {
        return new HtmlWebpackPlugin({
            template: `./src/${item}.html`,//需要打包的html路径
            filename: `${item}.html`,
            chunks: [`${item}`]
        });
    });
    return newArr;
}

module.exports = {
    entry: { ...listEntry() },
    output: {
        path: Path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
    },
    plugins: [
        ...listPage(),
        new webpack.ProvidePlugin({
            "$": "jquery"
        })
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
            exclude: /node_modules/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 1024 * 10,
                    outputPath: "./images/",
                    esModule: false
                }
            },
            type: "javascript/auto"
        }, {
            test: /.(html|htm)$/i,
            use: ["html-withimg-loader"]
        }]
    },
    devServer: {
        port: 8000,
        // open: true,
        hot: true
    },
    mode: "development",
}

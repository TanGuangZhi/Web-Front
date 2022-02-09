/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:25 Thu
 * @LastEditTime: 2022-01-25 16:21:31 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let Path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");

let pageList = ["index", "alitest", "userInfo", "cinema", "chooseseat", "cinemadetail", "movie", "orderlist",
    "filmDetail", "login", "register",
    "html/index", "html/admin/admin", "html/admin/page/user",
    "html/filmAdmin/filmAdmin", "html/filmAdmin/page/cinema",
    "html/filmAdmin/page/cinemaRoom", "html/filmAdmin/page/film"
];
function listEntry() {
    let obj = {};
    pageList.forEach(item => {
        obj[item] = `./src/js/${item}.js`;
    });
    return obj;
}
function listHtmlPage() {
    let newArr = pageList.map(item => {
        return new HtmlWebpackPlugin({
            template: `./src/${item}.html`,
            filename: `${item}.html`,
            chunks: [`${item}`]
        });
    });
    return newArr;
}
module.exports = {
    entry: {//参与打包的js文件路径
        ...listEntry()
    },
    output: {
        path: Path.resolve(__dirname, "dist"),
        filename: `js/[name].js`//打包之后的js文件位置以及文件名
    },
    plugins: [
        ...listHtmlPage(),
        new webpack.ProvidePlugin({
            "$": "jquery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/i, //寻找以.css结尾的文件
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
            },
            // 打包html文件中的img
            {
                test: /\.(html|htm)$/i,
                use: ["html-withimg-loader"]
            }
        ]
    }, resolve: {
        alias: {
            "@css": "bootstrap/dist/css",
            "@js": "bootstrap/dist/js",

        }
    },
    devServer: {
        port: 8000,
        hot: true
    },
    mode: "development"
}

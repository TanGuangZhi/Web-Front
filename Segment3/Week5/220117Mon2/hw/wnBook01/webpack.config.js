let Path=require("path");
let HtmlWebpackPlugin=require("html-webpack-plugin");

let webpack=require("webpack");
module.exports={
    entry:{
        book:"./src/js/book.js",
    },
    output:{
        path:Path.resolve(__dirname,"dist"),
        filename:"js/[name].js"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/html/book.html",//需要打包的HTML文件路径
            filename: "html/book.html",//打包之后逇目录
        }),
        new webpack.ProvidePlugin({
            "$":"jquery"//全局配置  默认所有的js文件默认导入jquery
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:["style-loader","css-loader"]
            },{
                test:/\.(png|jpg|jpeg|gif|svg|webp)$/i, //寻找以.css结尾的文件
                exclude:/node_modules/,
                use:{
                    loader:"url-loader",
                    options:{
                        //图片小于10kb的时候。默认将图片转化为base64位编码
                        limit:1024 * 10,
                        outputPath:"./images/",
                        //图片这个插件和其他会出现冲突。设置位false可以避免冲突
                        esModule:false
                    }
                },
                type:"javascript/auto"  //webpack 5 必须加这个
            },
            // 打包html文件中的img
            {
                test:/.(html|htm)$/i,
                use:["html-withimg-loader"]
            }
        ]
    },resolve:{
        alias:{
            "@css":"../css",
            "@bs":"bootstrap/dist/css"
        }

    },
    devServer:{
      port:8000,
      hot:true
    },
    mode:"development"
}
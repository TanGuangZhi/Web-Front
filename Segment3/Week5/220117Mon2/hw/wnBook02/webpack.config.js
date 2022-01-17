let Path=require("path");
let HtmlWebpackPlugin=require("html-webpack-plugin");
let webpack=require("webpack");
//1.需要打包的页面名称(一个.html页面===>一个.js文件)
let pageList=["index","html/book","html/user"];
function listEntry(){
    let obj={};
    pageList.forEach(item=>{
        obj[item]=`./src/js/${item}.js`
    });
    return obj;
}
function listPage(){
    let newArr=pageList.map(item=>{
        return new HtmlWebpackPlugin({
            template:`./src/${item}.html`,//需要打包的html路径
            filename:`${item}.html`,
            chunks:[`${item}`]
        });
    });
    return newArr;
}
module.exports={
    entry:{...listEntry()},
    output:{
        path:Path.resolve(__dirname,"dist"),
        filename:"js/[name].js"
    },
    plugins:[
        ...listPage(),
        new webpack.ProvidePlugin({
            "$":"jquery"
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
    },
    devServer:{
      port:8000,
      hot:true
    },
    mode:"development"
}



let fs=require("fs");
let multer=require("multer");

// ./ 服务器端的项目： 返回根目录
// ./ 非服务端的项目: 返回当前的根目录
exports.upload01=function(req,dirName){
    let data=fs.readFileSync(req.files[0].path);
    let fileName=Date.now()+req.files[0].originalname;
    fs.writeFileSync("./public/"+dirName+"/"+fileName,data);
    return dirName+"/"+fileName;
}

exports.upload02=function(req,resp,dirName,upFileName) {
    return new Promise((resolve,reject)=>{
        let storage=multer.diskStorage({
            destination:function (req,file,cb) {
                cb(null,"./public/"+dirName);
            },filename:function(req,file,cb){
                cb(null,Date.now()+file.originalname);
            }
        });
        let fun=multer({storage}).single(upFileName);
        fun(req,resp,(error)=>{
            if(error){
                reject(error);
            }else{
                resolve(req.file);
            }
        });
    });
}
let fs=require("fs");
let multer=require("multer");
// ./ 服务器端的项目： 返回根目录
// ./ 非服务端的项目: 返回当前的根目录
exports.upload01=function(req,dirName){
    if(req.files.length>0){
        let data=fs.readFileSync(req.files[0].path);
        let fileName=Date.now()+req.files[0].originalname;
        fs.writeFileSync("./public/"+dirName+"/"+fileName,data);
        return dirName+"/"+fileName;
    }
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
//1.读取csv文件中的数据 解析出json对象数组
exports.csvParse=function(dataStr) {//只能处理csv读取进来的数据（逗号隔开）
    let objList=[];//json对象数组
    //回车符号: \r\n
    let dataArr=dataStr.split("\r\n");
    let fieldNames=dataArr[0].split(",");//拿到所有的属性名字
    for(let i=1;i<dataArr.length;i++){
        let str=`{`;
        let fieldValues=dataArr[i].split(",");
        for(let j=0;j<fieldValues.length;j++){
            if(j<fieldValues.length-1){
                str+=`"${fieldNames[j]}":"${fieldValues[j]}",`;
            }else{//最后一个属性可以不加逗号
                str+=`"${fieldNames[j]}":"${fieldValues[j]}"`;
            }
        }
        str+=`}`;
        objList.push(JSON.parse(str));
    }
    return objList;
}

//1.将json转成转成字符串 (符合csv格式的字符串)
exports.jsonToCSV=function(jsonList){
    let str=``;
    for(let fieldName in jsonList[0]){
        if((typeof jsonList[0][fieldName])!="object"){
            str+=`,${fieldName}`;
            if(str.indexOf(",")==0){
                str=str.substring(1);
            }
        }
    }
    str+="\r\n";
    for(let json of jsonList){
        let line="";
        for(let fieldName in json){
            if((typeof json[fieldName])!="object"){
                line+=`,${json[fieldName]}`;
                if(line.indexOf(",")==0){//逗号在最前面的时候，删除逗号
                    line=line.substring(1);
                }
            }
        }
        str+=line+"\r\n";
    }
    return str;
}

exports.toIdArr=function (idArrStr) {
    let idArr=[];
    for(let i=0;i<idArrStr.split(",").length;i++){
        idArr.push(parseInt(idArrStr.split(",")[i]));
    }
    return idArr;
}

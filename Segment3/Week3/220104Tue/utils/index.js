//1.引入文件的模块
let fs=require("fs");
//2.异步读取 th1:读取文件的路径  th2 (error 异常信息  data 文件中读取的数据)
fs.readFile("./file/user.txt",function (error,data){
    if(error){//如果存在异常 执行  没有异常则不执行
        return console.error(error);//打印异常信息
    }
    //1.从文件中读取到的数据
    console.log("异步读取:"+data.toString());
});
//3.同步读取
let data=fs.readFileSync("./file/user.txt");
console.log("同步读取:"+data.toString());

let userList=[
    { id: '1', userName: 'jack', userPass: '1234', userPhone: '12580' },
    { id: '2', userName: 'rouse', userPass: '1234', userPhone: '12581' },
    { id: '3', userName: 'tina', userPass: '1234', userPhone: '12582' }
    ];
fs.readFile("./file/user.csv",function(error,data){
    if(error){
        return console.error(error);
    }
   let userArr=strToJson(data.toString());
    userList=[...userList,...userArr];
   console.log(userList);
});

function strToJson(dataStr) {//只能处理csv读取进来的数据（逗号隔开）
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
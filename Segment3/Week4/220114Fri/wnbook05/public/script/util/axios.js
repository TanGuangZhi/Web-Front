export let axios=function(url,...params){
    let data={};
    let dataType="json";//text/json
    let type="get";//get/post
    for(let param of params){
        if(param=="json"||param=="text"){//改了 dataType 不能使用默认值
            dataType=param;
        }else if(param=="get"||param=="post"){
            type=param;
        }else if(typeof param!="boolean"){
            data=param;
        }
    }
    return new Promise((resolve,reject)=>{
        let obj={
            url,
            data,
            dataType,
            type,
            success:(result)=>{
                resolve(result);
            },error:(error)=>{
                reject(error);
            }
        }
        if(params.indexOf(false)!=-1){
            obj.contentType=false;
            obj.processData=false;
        }
        $.ajax(obj);
    });
}
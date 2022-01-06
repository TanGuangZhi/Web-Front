function axios(url,...params){
    let data={};
    let dataType="json";//text/json
    let type="get";//get/post
    for(let param of params){
        if(param=="json"||param=="text"){//改了 dataType 不能使用默认值
            dataType=param;
        }else if(param=="get"||param=="post"){
            type=param;
        }else{
            data=param;
        }
    }
    return new Promise((resolve,reject)=>{
        $.ajax({
            url,
            data,
            dataType,
            type,
            success:(result)=>{
                resolve(result);
            },error:(error)=>{
                reject(error);
            }
        });
    });
}
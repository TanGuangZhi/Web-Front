$("form").each(function (){
    //1.form表单中 拥有pattern属性 的表单 才会做正则的验证
    let form=$(this);
    if(form.find("[pattern]").length>0){
        let regInputArr=$(this).find("[pattern]");
        let flag=new Array();
        for(let i=0;i<regInputArr.length;i++){
            flag[i]=false;
        }
        //1.一开始设置表单提交按钮为不可用
        form.find(".submit").prop("disabled",true);
        regInputArr.each(function (index) {
            //1.将属性中字符串的正则变成 一个正则表达式对象
            let reg=new RegExp($(this).attr("pattern"));//"^[a-zA-Z]{3,6}$"
            let msg=$(this).attr("msg");
            let input=$(this);
            input.next().html(msg);
            input.next().css("color","red");
            input.bind("keyup focus",function () {
                 if(reg.test(input.val())){
                     flag[index]=true;
                     input.next().html("格式正确");
                     input.next().css("color","green");
                 }else{
                     flag[index]=false;
                     input.next().html(msg);
                     input.next().css("color","red");
                 }
                 if(flag.indexOf(false)==-1){
                     form.find(".submit").prop("disabled",false);
                 }else{
                     form.find(".submit").prop("disabled",true);
                 }
            });
        });
    }
});

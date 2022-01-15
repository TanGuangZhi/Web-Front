import {$} from "./util/jquery-3.5.1.js";//导入jQuery
import {axios} from "./util/axios.js";//导入axios.js

function queryBook(nowPage=1){
    axios("/book/queryBook",{nowPage}).then(res=>{
        let str=``;
        for(let book of res.bookList){
            str+=`<tr>
                    <td>选项<input type="checkbox" class="sel" value="${book._id}"></td>
                    <td>${book._id}</td>
                    <td>${book.bookName}</td>
                    <td>${book.bookPrice}元</td>
                    <td>${book.bookType}</td>
                    <td><img src="../${book.bookImg}" width="50px" class="img-thumbnail"></td>
                    <td>${book.bookCount}万/月</td>
                    <td>${book.bookNum}万件</td>
                    <td>
                        <button type="button" class="btn btn-danger deleteBtn" _id="${book._id}"><span class="glyphicon glyphicon-remove"></span> 删除</button>
                        <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#updateModal"><span class="glyphicon glyphicon-edit"></span> 修改</button>
                    </td>
                </tr>`;
        }
        $("#showTab").html(str);
        //0.拼接页码
        let pageStr=` <li><a href="javascript:void(0)" class="page-li" nowPage="-1">&laquo;</a></li>`;
        for(let i=1;i<=res.lastPage;i++){
            pageStr+=` <li><a href="javascript:void(0)" class="page-li" nowPage="${i}">${i}</a></li>`;
        }
        pageStr+=` <li><a href="javascript:void(0)" class="page-li" nowPage="-2">&raquo;</a></li>`;
        $("#pageList").html(pageStr);

        $(".page-li").click(function () {
            let nowPage=$(this).attr("nowPage");
            queryBook(nowPage);
        });

        //1.删除操作...
        $(".deleteBtn").click(function (){
            let _id=$(this).attr("_id");
            axios("/book/deleteBook","text",{_id}).then(res=>{
                if(res=="1"){
                    alert("删除成功");
                    queryBook();
                }else{
                    alert("删除失败");
                }
            });
        });
        //2.批量操作...
        //2.1 全选全消
        $("#allId").change(function () {
           $(".sel").prop("checked",$(this).prop("checked"));
        });
        //2.2 全选全消的优化
        $(".sel").change(function () {
           $("#allId").prop("checked",$(".sel:checked").length==$(".sel").length);
        });
    });
}
queryBook();

$("#deleteManyId").click(function () {
    if(confirm("您确定要删除吗?")){
        let idArr=[];
        $(".sel:checked").each(function () {
            idArr.push($(this).val());
        });
        if(idArr.length>0){
            axios("/book/deleteManyBook",{"idArr":idArr.toString()},"text").then(res=>{
               if(res=="1"){
                   alert("批量删除成功");
                   queryBook();
               } else{
                   alert("批量删除失败");
               }
            });
        }else{
            alert("请先选择...");
        }
    }
});

//1.添加功能
$("#addBtn").click(function () {
   axios("/book/addBook","post","text",false,new FormData($("#addForm")[0])).then(res=>{
       if(res=="1"){
           alert("添加成功");
           queryBook();
       }else{
           alert("添加失败");
       }
   })
});

$("#uploadBtn").click(function () {
   axios("/book/uploadBook","post",false,"text",new FormData($("#uploadForm")[0])).then(res=>{
      if(res=="1"){
          alert("上传成功");
          queryBook();
      } else{
          alert("上传失败");
      }
   });
});

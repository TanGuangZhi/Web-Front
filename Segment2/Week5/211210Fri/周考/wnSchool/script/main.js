// 删除学生
function delStuBtn(index) {
    $.ajax({
        type: "post",
        url: "/end/delStuInfo",
        data: { "index": index },
        dataType: "json",
        success: function (response) {
            console.log(`${response}`);
            queryStus();
        }
    });
}

$("#addStuBtn").click(function (e) { 
    $.ajax({
        type: "post",
        url: "/end/addStuInfo",
        data: $("#addFormId").serialize(),
        dataType: "json",
        success: function (response) {
            console.log(`${response}`);
            queryStus();
        }
    });
    
});

function updModalClick(index) {
    let stu=stuArr[index];
    $("#updateImg").attr("src",stu.stuImg);
    $("#updateFormId [name=id]").val(stu.id);
    $("#updateFormId [name=stuName]").val(stu.stuName);
    $("#updateFormId [name=salary]").val(stu.salary);
    $("#updateFormId [name=stuTime]").val(stu.stuTime);
    $("#updateFormId [name=stuLesson]").val(stu.stuLesson);
    $("#updateFormId [name=stuImg]").val(stu.stuImg);
}

// 修改学生
$("#updStuBtn").click(function (e) { 
    $.ajax({
        type: "post",
        url: "/end/updStuInfo",
        data: $("#updateFormId").serialize(),
        dataType: "json",
        success: function (response) {
            // console.log(`${response}`);
            queryStus();
        }
    });
    
});

// 上传随机图片
$(".uploadImgBtn").click(function () {
    console.log(1);
    let imgRandom = parseInt(Math.random() * 9) + 1;
    $(this).parent().parent().find("input").last().val(`./images/${imgRandom}.jpg`);
    $(".showBackImg").attr("src", `./images/${imgRandom}.jpg`)
})

// ================查询学生================
let stuArr = [];
function queryStus() {
    $.ajax({
        url: "/end/queryStuInfo",
        dataType: "json",
        success: function (stuList) {
            let str = ``;
            stuList.forEach((element, index) => {
                stuArr=stuList;
                if (element.stuStatus != "deleted") {
                    str += ` <tr>
                    <div data-id="" hidden></div>
                    <th class="text-center" scope="row">${element.id}</th>
                    <td>${element.stuName}</td>
                    <td>${element.stuTime}</td>
                    <td>${element.stuLesson}</td>
                    <td>
                    <img src="${element.stuImg}" class="img-circle" width="60px" >
                    </td>
                    <td>￥${element.salary}</td>
                    <td><img src="${element.movieImg}" class="" style="width: 50px;" alt="" srcset=""></td>
                    <td>
                    <button class="btn btn-danger" onclick="delStuBtn(${index})">
                        <span class="glyphicon glyphicon-remove"></span>删除
                    </button>
                    </td>
                    <td>
                        <button class="btn btn-info" data-toggle="modal" data-target="#updateModal" onclick="updModalClick(${index})">
                            <span class="glyphicon glyphicon-heart"></span>修改
                        </button>
                    </td>
                </tr>`;
                }

            });
            $("#showInfoBody").html(str);
        }
    });

}

queryStus();

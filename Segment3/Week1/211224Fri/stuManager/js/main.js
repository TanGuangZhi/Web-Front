let newStudent;
let studentInfoArr;
function showTableData(params) {
    function getStuJson(params) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "get",
                url: "./data/student.json",
                success: function (response) {
                    resolve(response);
                }
            });
        });
    }


    async function name1(params) {
        return await getStuJson();
    }

    name1().then((result) => {
        if (localStorage.getItem("studentInfoArr")) {
            studentInfoArr = JSON.parse(localStorage.getItem("studentInfoArr"));
        }
        studentInfoArr = result.filter(item => item.status == "right");
        let str = ``;

        result.forEach(element => {
            str += `
             <tr>
              <td>${element.studentID}</td>
              <td>${element.studentName}</td>
              <td>${element.studentAge}</td>
              <td>man</td>
              <td>
                <button type="button" class="btn btn-primary btn-sm">修改资料</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick=delStu(${element.studentID})>删除学员</button>
              </td>
            </tr>
    `

        });
        $('#stuTbody').html(str);
        // console.log(newStudent);
        // showTableData(result);
        // newStudent.addStudent("3", "mary", "right");
        // newStudent.delStudent("2");
        // newStudent.changeStudent("1", { studentName: "tom2" });
        // newStudent.addCourse("1", [1, 2, 3]);
        // console.table(newStudent.queryStudent());
    }).catch((err) => {

    });


}
showTableData();

$('#addStuBtn').click(function (params) {
    let studentName = $('#studentName').val();
    let studentAge = $('#studentAge').val();
    let studentID = 11;
    studentInfoArr.push({ studentID, studentName, studentAge });
    // console.log(stuName);
    localStorage.setItem("studentInfoArr", JSON.stringify(studentInfoArr));
    showTableData()
})

function delStu(params) {
    newStudent.delStudent(params);
    console.log(1);
    showTableData();
}

// console.log(1);

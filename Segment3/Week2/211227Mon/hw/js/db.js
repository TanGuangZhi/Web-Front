
[
    {
        "stuId": "S001",
        "stuName": "张三",
        "stuPass": "1234",
        "stuPhone": "12580",
        "stuScore": 87,
        "stuAge": 17,
        "status": "right"
    },
    {
        "stuId": "S002",
        "stuName": "张三丰",
        "stuPass": "1234",
        "stuPhone": "12581",
        "stuScore": 87,
        "stuAge": 20,
        "status": "right"
    },
    {
        "stuId": "S003",
        "stuName": "ios",
        "stuPass": "1234",
        "stuPhone": "12582",
        "stuScore": 67,
        "stuAge": 18,
        "status": "right"
    },
    {
        "stuId": "S004",
        "stuName": "张无忌",
        "stuPass": "1234",
        "stuPhone": "12583",
        "stuScore": 77,
        "stuAge": 19,
        "status": "right"
    },
    {
        "stuId": "S005",
        "stuName": "张学友",
        "stuPass": "1234",
        "stuPhone": "12584",
        "stuScore": 57,
        "stuAge": 23,
        "status": "right"
    },
    {
        "stuId": "S006",
        "stuName": "marry",
        "stuPass": "1234",
        "stuPhone": "12585",
        "stuScore": 87,
        "stuAge": 16,
        "status": "right"
    }
];
let newStudent = new Student(result);

newStudent.addStudent("S003", "mary", "1234", "12588", "90", "19", "right");
newStudent.delStudent("S002");
newStudent.delStudentBatch(["S001", "S003"]);
newStudent.changeStudent("S004", { stuName: "tom2" });
console.table(newStudent.queryStudent());
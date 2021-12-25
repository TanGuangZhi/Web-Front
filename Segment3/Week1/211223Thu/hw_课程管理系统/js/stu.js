
class Student {
    constructor(infoList) {
        this.studentInfoArr = infoList;
    }

    queryStudent() {
        return this.studentInfoArr;
    }

    addStudent(studentId, studentName, status) {
        this.studentInfoArr.push({ studentId, studentName, status });
    }

    delStudent(studentId) {
        let index = this.findIndexById(studentId);
        this.studentInfoArr[index].status = "deleted";
    }

    changeStudent(studentId, changeInfoList) {
        let index = this.findIndexById(studentId);
        this.studentInfoArr[index].studentName = changeInfoList.studentName;
    }

    findIndexById(studentId) { return this.studentInfoArr.findIndex((item, index) => item.studentId == studentId); }
    // constructor(id, studentName) {
    // this.id = id;
    // this.studentName = studentName;
    // }

    addCourse(studentId, courseId) {
        let index = this.findIndexById(studentId);
        this.studentInfoArr[index].courseArr= [...courseId];
    }
}

// let javaStudent = new Student("1", "java");
// let webStudent = new Student("2", "Web");
let newStudent = new Student([{
    studentId: "1",
    studentName: "tom",
    status: "right"
}, {
    studentId: "2",
    studentName: "jack",
    status: "right"
}]);

newStudent.addStudent("3", "mary", "right");
newStudent.delStudent("2");
newStudent.changeStudent("1", { studentName: "tom2" });
newStudent.addCourse("1", [1, 2, 3]);
console.table(newStudent.queryStudent());
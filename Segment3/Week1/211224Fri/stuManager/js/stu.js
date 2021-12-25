
class Student {
    constructor(infoList) {
        this.studentInfoArr = infoList;
    }

    queryStudent() {
        return this.studentInfoArr.filter(item=>item.status=="right");
    }

    addStudent(studentID, studentName, studentAge, status) {
        this.studentInfoArr.push({ studentID, studentName, studentAge, status });
    }

    delStudent(studentID) {
        let index = this.findIndexById(studentID);
        this.studentInfoArr[index].status = "deleted";
    }

    changeStudent(studentID, changeInfoList) {
        let index = this.findIndexById(studentID);
        this.studentInfoArr[index].studentName = changeInfoList.studentName;
    }

    findIndexById(studentID) { return this.studentInfoArr.findIndex((item, index) => item.studentID == studentID); }
    // constructor(id, studentName) {
    // this.id = id;
    // this.studentName = studentName;
    // }

    addCourse(studentID, courseId) {
        let index = this.findIndexById(studentID);
        this.studentInfoArr[index].courseArr = [...courseId];
    }
}

// let javaStudent = new Student("1", "java");
// let webStudent = new Student("2", "Web");
// let newStudent = new Student([{
//     studentID: "1",
//     studentName: "tom",
//     status: "right"
// }, {
//     studentID: "2",
//     studentName: "jack",
//     status: "right"
// }]);

// newStudent.addStudent("3", "mary", "right");
// newStudent.delStudent("2");
// newStudent.changeStudent("1", { studentName: "tom2" });
// newStudent.addCourse("1", [1, 2, 3]);
// console.table(newStudent.queryStudent());
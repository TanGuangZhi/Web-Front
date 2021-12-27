
class Student {
    constructor(infoList) {
        this.studentInfoArr = infoList;
    }

    queryStudent() {
        return this.studentInfoArr.filter(item => item.status == "right");
    }

    addStudent(stuId, stuName, stuPass, stuPhone, stuScore, stuAge, status) {
        this.studentInfoArr.push({ stuId, stuName, stuPass, stuPhone, stuScore, stuAge, status });
    }

    delStudent(stuId) {
        // let index = this.findIndexById(stuId);
        // this.studentInfoArr[index].status = "deleted";
        this.studentInfoArr.map(item=>{
            if (item.stuId == stuId) {
                item.status = "deleted";
            }
        })
    }

    delStudentBatch(studentIdArr) {
        studentIdArr.forEach(element => {
            this.delStudent(element);
        });
    }

    changeStudent(stuId, changeInfoList) {
        // let index = this.findIndexById(stuId);
        // this.studentInfoArr[index].stuName = changeInfoList.stuName;
        this.studentInfoArr.map(item => {
            if (item.stuId == stuId) {
                item.stuName = changeInfoList.stuName;
            }
        })
    }

    findIndexById(stuId) { return this.studentInfoArr.findIndex((item, index) => item.stuId == stuId); }

    addCourse(studentId, courseId) {
        let index = this.findIndexById(studentId);
        this.studentInfoArr[index].courseArr = [...courseId];
    }
}


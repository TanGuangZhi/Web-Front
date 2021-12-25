
class Course {
    constructor(infoList) {
        this.courseInfoArr = infoList;
    }

    queryCourse() {
        return this.courseInfoArr;
    }

    addCourse(courseId, courseName, status) {
        this.courseInfoArr.push({ courseId, courseName, status });
    }

    delCourse(courseId) {
        let index = this.findIndexById(courseId);
        this.courseInfoArr[index].status = "deleted";
    }

    changeCourse(courseId, changeInfoList) {
        let index = this.findIndexById(courseId);
        this.courseInfoArr[index].courseName = changeInfoList.courseName;
    }

    findIndexById(courseId) {
        return this.courseInfoArr.findIndex((item, index) => item.courseId == courseId);
    }
    // constructor(id, courseName) {
    // this.id = id;
    // this.courseName = courseName;
    // }
}

// let javaCourse = new Course("1", "java");
// let webCourse = new Course("2", "Web");
let newCourse = new Course([{
    courseId: "1",
    courseName: "java",
    status: "right"
}, {
    courseId: "2",
    courseName: "web",
    status: "right"
}]);

newCourse.addCourse("3", "test", "right");
newCourse.delCourse("2");
newCourse.changeCourse("1", { courseName: "web2" });
console.table(newCourse.queryCourse());
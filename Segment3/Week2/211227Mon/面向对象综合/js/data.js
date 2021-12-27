class Student{
    static count=0;
    constructor(name,pass,phone,sex,score){
        this.id=++Student.count;
        this.name=name;
        this.pass=pass;
        this.phone=phone;
        this.sex=sex;
        this.score=score;
    }
    toString(){
        return this.id+","+this.name+","+this.pass+","+this.phone+","+this.sex+","+this.score;
    }
}

class Teacher{
    static count=0;
   constructor(name,pass,phone,sex,score){
       this.id=++Teacher.count;
       this.name=name;
       this.pass=pass;
       this.phone=phone;
       this.sex=sex;
       this.score=score;
   }
   toString(){
       return this.id+","+this.name+","+this.pass+","+this.phone+","+this.sex+","+this.score;
   }
}


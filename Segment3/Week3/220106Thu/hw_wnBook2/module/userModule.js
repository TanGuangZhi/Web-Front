class UserModule{
    userList=[
        {id:1,userName:"tina",userPass:"1234",userScore:100,userPhone:"110",userType:0},
        {id:2,userName:"jam",userPass:"1234",userScore:234,userPhone:"110",userType:1},
        {id:3,userName:"marry",userPass:"1234",userScore:113,userPhone:"110",userType:0},
        {id:4,userName:"ioi",userPass:"1234",userScore:138,userPhone:"110",userType:0},
        {id:5,userName:"pop",userPass:"1234",userScore:106,userPhone:"110",userType:0}
    ];
    static count=6;
    insertUser(user){
        user.id=UserModule.count++;
        user.userType=0;//默认只能添加普通用户
        this.userList.push(user);
        return 1;
    }
    updateUser(user){

    }
    deleteUser(id){

    }
    deleteManyUser(idArr){
        this.userList=this.userList.filter(item=>{
            return idArr.indexOf(item.id.toString())==-1;
        });
        return 1;
    }
    insertManyUser(userArr){
        for(let user of userArr){
            this.insertUser(user);
        }
        return 1;
    }
    queryUser(){
        return this.userList;
    }
}
module.exports=UserModule;
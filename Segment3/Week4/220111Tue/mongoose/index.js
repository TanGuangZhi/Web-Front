let mongoose=require("mongoose");
//1.链接数据库
mongoose.connect("mongodb://localhost:27017/filmdb",(error)=>{
    if(error){
        return console.error(error);
    }
    console.log("mongodb数据库链接成功");
});
//2.建立 film的数据模型
let filmSchema=mongoose.Schema({
    _id:Number,
    filmName:String,
    filmType:String,
    filmPrice:Number,
    filmScore:Number,
    filmImg:String
});
//3.得到film的集合(表格)对象  (有了film既可以操作表格了)
let dbFilm=mongoose.model("film",filmSchema,"film");


let sequenceSchema=mongoose.Schema({
    _id:String,
    sequenceValue:Number
});
//得到sequence的集合(表格)对象
let dbSequence=mongoose.model("sequence",sequenceSchema,"sequence");

//1.
(async ()=>{
    //1.查询全部数据
    let filmList=await dbFilm.find({});
    console.log(filmList);
    //2.删除数据
    let delRes=await dbFilm.deleteMany({_id:{$in:[16,18,19]}});
    console.log(delRes);
    //3.修改数据
    let updateRes=await dbFilm.updateMany({_id:{$in:[3,9]}},{$set:{filmPrice:68.88}},{multi:true});
    console.log(updateRes);

    //4.添加数据
    let fid=await dbSequence.findOneAndUpdate({_id:"fid"},{$inc:{sequenceValue:1}});
    let addRes=await dbFilm.insertMany([
        {_id:fid.sequenceValue,
            filmName: '烈日灼心',
            filmType: '犯罪',
            filmPrice: 68.88,
            filmScore: 9.6,
            filmImg: 'images/film/13.jpg'
        }
        ]);
        console.log(addRes);

        //5.批量插入
        let arr=[
            {
                filmName: '武林外传',
                filmType: '喜剧',
                filmPrice: 68.88,
                filmScore: 9.6,
                filmImg: 'images/film/13.jpg'
            },{
                filmName: '三国演义',
                filmType: '名著',
                filmPrice: 68.88,
                filmScore: 9.6,
                filmImg: 'images/film/14.jpg'
            }
        ];
        for(let film of arr){
            let id=await dbSequence.findOneAndUpdate({_id:"fid"},{$inc:{sequenceValue:1}});
            film._id=id.sequenceValue;
        }
        let manyRes=await dbFilm.insertMany(arr);
        console.log(manyRes);
})();



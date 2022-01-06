//1.模拟用户数据
let userData=Mock.mock({
    "list|10-20":[{
        "id|+1":1,
        "userName":/[a-z]{3,6}/,
        "userPass":"123456",
        "userPhone":/1[3-9]\d{9}/,
        "userScore|0-100":0
    }]
});
let userList=userData.list;
//2.模拟图书数据
let bookData=Mock.mock({
   "list|20-30":[{
       "id|+1":1,
       "bookName":"@name",
       "bookPrice|40-200.2":40.88,
       "bookImg":/images\/book\/[1-9]\.jpg/,
       "bookCount|100-1000":100,
       "bookNum|50-100":50,
       "bookType|+1":["励志","小说","人物","历史"]
   }]
});


//images/book/  1.jpg
let bookList=bookData.list;
let bookPageNum=1;
let bookPageCount=6;
/**
 * 1    [0,6)
 * 2    [6,12)
 * 3    [12,18)
 *
 * bookPageNum页  [(bookPageNum-1)*bookPageCount,bookPageNum*bookPageCount)
 *
 * */
Mock.mock("/book/queryBook","post",function (obj){
    let requestData=decodeURI(obj.body);
    let book=converter(requestData);
    let newArr=[...bookList];
    if(book.bookName){
        newArr=newArr.filter(item=>{
            return item.bookName.indexOf(book.bookName)!=-1;
        });
    }

    if(book.bookType){
        newArr=newArr.filter(item=>{
            return item.bookType==book.bookType;
        });
    }
    let bookType=parseInt(book.sortType);
    if(bookType!=0){
        newArr.sort((a,b)=>{
            return (a.bookCount-b.bookCount)*bookType;
        });
    }
    //0.查询之前获得页码
    let temp=parseInt(book.pageNum);
    if(temp<0){
        if(temp==-1&&bookPageNum>1){
            bookPageNum--;
        }
        if(temp==-2&&bookPageNum<Math.ceil(newArr.length/bookPageCount)){
            bookPageNum++;
        }
    }else{
        bookPageNum=temp;
    }
    //1.分页查询数据
    let pageList=newArr.filter((item,index)=>{
        return index>=(bookPageNum-1)*bookPageCount&&index<bookPageNum*bookPageCount;
    });


    //2.求出总页数(最后一页)
    let lastPage=Math.ceil(newArr.length/bookPageCount);
    return {lastPage,pageList};
});
function converter(data) {
    let dataArr = data.split("&");
    let str = `{`
    for (let d of dataArr) {
        str += `"${d.split('=')[0]}":"${d.split('=')[1]}",`;
    }
    str = str.substring(0, str.length - 1);
    str += `}`;
    return JSON.parse(str);
}

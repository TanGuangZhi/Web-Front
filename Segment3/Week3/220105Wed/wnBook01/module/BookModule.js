/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-05 18:59:01 Wed
 * @LastEditTime: 2022-01-06 08:49:05 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
class BookModule {
    bookList = [
        { id: 1, bookName: 'Dorothy Jackson1', bookType: "小说", bookPrice: 100.88, bookImg: 'images/book/1.jpg', bookCount: 928, bookNum: 100 },
        { id: 2, bookName: 'Dorothy Jackson2', bookType: "名著", bookPrice: 100.88, bookImg: 'images/book/2.jpg', bookCount: 888, bookNum: 100 },
        { id: 3, bookName: 'Dorothy Jackson3', bookType: "童话", bookPrice: 100.88, bookImg: 'images/book/3.jpg', bookCount: 329, bookNum: 100 },
        { id: 4, bookName: 'Dorothy Jackson4', bookType: "惊悚", bookPrice: 100.88, bookImg: 'images/book/4.jpg', bookCount: 117, bookNum: 100 }
    ];
    static count = 5;

    //1.添加书籍
    addBook(book) {
        book.id = BookModule.count++;
        this.bookList.push(book);
        return 1;
    }

    // 3.删除
    deleteBook(delArr) {
        this.bookList = this.bookList.filter(item => {
            // includes is all equal ,so to avoid 1 or "1",use this method to solve
            return !delArr.includes(item.id - 0);
        })
        return 1;
    }

    // 4. change  
    changeBook(changeInfoArr) {
        this.bookList = this.bookList.map((item) => {
            if (item.id == changeInfoArr.id) {
                return changeInfoArr;
            }
            return item;
        })
        // writeData(this.userList);
        return 1;
    }
    //4. 查询书籍
    queryBook() {
        return this.bookList;
    }
}
module.exports = BookModule;

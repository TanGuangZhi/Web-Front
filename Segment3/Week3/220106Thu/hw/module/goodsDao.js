/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 19:17:25 Thu
 * @LastEditTime: 2022-01-06 22:01:16 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */

class GoodsDao {
    bookList = [
        { id: 1, bookName: 'Dorothy Jackson1', bookType: "小说", bookPrice: 100.88, bookImg: 'images/book/1.jpg', bookCount: 928, bookNum: 100 },
        { id: 2, bookName: 'Dorothy Jackson2', bookType: "名著", bookPrice: 100.88, bookImg: 'images/book/2.jpg', bookCount: 888, bookNum: 100 },
        { id: 3, bookName: 'Dorothy Jackson3', bookType: "童话", bookPrice: 100.88, bookImg: 'images/book/3.jpg', bookCount: 329, bookNum: 100 },
        { id: 4, bookName: 'Dorothy Jackson4', bookType: "惊悚", bookPrice: 100.88, bookImg: 'images/book/4.jpg', bookCount: 117, bookNum: 100 }
    ];
    static count = 5;
    insertBook(book) {
        book.id = GoodsDao.count++;
        this.bookList.push(book);
        return "1";
    }
    updateBook(data) {
        this.bookList = this.bookList.map((item) => {
            if (item.id == data.id) {
                return data;
            }
            return item;
        })
        return "1";
    }
    delBook(delArr) {
        this.bookList = this.bookList.filter(item => {
            // includes is all equal ,so to avoid 1 or "1",use this method to solve
            return !delArr.includes(item.id + "");
        })
        return "1";
    }
    deleteManyBook(idArr) {

    }
    insertManyBook(bookArr) {

    }
    queryBook() {
        return this.bookList;
    }
}

module.exports = GoodsDao;

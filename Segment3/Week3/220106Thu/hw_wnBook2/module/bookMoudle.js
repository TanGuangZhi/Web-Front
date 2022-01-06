class BookModule{
    bookList=[
        {id: 1, bookName: 'Dorothy Jackson1',bookType:"小说", bookPrice: 100.88, bookImg: 'images/book/1.jpg', bookCount: 928,bookNum:100},
        {id: 2, bookName: 'Dorothy Jackson2',bookType:"名著", bookPrice: 100.88, bookImg: 'images/book/2.jpg', bookCount: 888,bookNum:100},
        {id: 3, bookName: 'Dorothy Jackson3',bookType:"童话", bookPrice: 100.88, bookImg: 'images/book/3.jpg', bookCount: 329,bookNum:100},
        {id: 4, bookName: 'Dorothy Jackson4',bookType:"惊悚", bookPrice: 100.88, bookImg: 'images/book/4.jpg', bookCount: 117,bookNum:100}
    ];
    static count=5;
    insertBook(book){
        book.id=BookModule.count++;
        this.bookList.push(book);
        return 1;
    }
    updateBook(book){

    }
    deleteBook(id){

    }
    deleteManyBook(idArr){

    }
    insertManyBook(bookArr){

    }
    queryBook(){
        return this.bookList;
    }
}
module.exports=BookModule;
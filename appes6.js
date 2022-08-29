// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI {
  //add book
  addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
        `;
    list.appendChild(row);
  }

  //show alert
  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    //disappear after 2seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  //clear input
  clearFields() {
    document.getElementById("title").value = " ";
    document.getElementById("author").value = " ";
    document.getElementById("isbn").value = " ";
  }

  //delete book
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// local storage class
class Store {
  //get books from local storage
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  //display books from local storage
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  //add book to local storage
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBooks() {}
}
//display books from local storage
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//eventlistener to add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //instantiate Book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //validation and alerts
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.showAlert("Book Added!", "success");

    //add books
    ui.addBookToList(book);

    //add book to LS
    Store.addBook(book);

    //clear books
    ui.clearFields();
  }

  e.preventDefault();
});

// eventlistener to delete a book
document.getElementById("book-list").addEventListener("click", function (e) {
  //instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert("Book Removed!", "success");
});

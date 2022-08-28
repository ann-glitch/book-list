class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

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

//eventlistener to add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

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

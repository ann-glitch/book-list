// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

//add book prototype
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#">X</a></td>
  `;
  list.appendChild(row);
};

//clear books prototype
UI.prototype.clearBooks = function () {
  document.getElementById("title").value = " ";
  document.getElementById("author").value = " ";
  document.getElementById("isbn").value = " ";
};

// listen on submit
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //instantiate Book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //add books
  ui.addBookToList(book);

  //clear books
  ui.clearBooks();

  e.preventDefault();
});

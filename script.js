/* TOP Library Project
1. Create an array to store the books
2. Constructor for book object, needs:
    - Title
    - Author
    - No. of pages
    - Read it or not
3. Function to add book to library
    3a. Create modal to retrieve new book info from user
    3b. Wire up modal to "add book" function
4 Function to loop through the array and displays all books on the page
5. Function to remove book from library
6. Function to toggle "read" status on or off
7. Function to remove all books from library
*/

// 1. Create an array to store the books

let myLibrary = [];

// 2. Constructor for book object

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// 3. Function to add book to library

function addBookToLibrary(title, author, pages, read) {
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// 3a. Create "add new book" modal on page

// Select "add new book" button
const addNewBookButton = document.querySelector("#add-book-button")

// Select "add new book" modal/form
const addNewBookModal = document.querySelector("#add-book-modal")

// Add event listener to show modal when "add new book" button is pressed
addNewBookButton.addEventListener("click", () => {
    addNewBookModal.showModal();
});

// 3b. Wire the modal up to the addBookToLibrary function
let addNewBookForm  = document.querySelector("#add-book-form");

addNewBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");

    addBookToLibrary(title.value, author.value, pages.value, read.value);
    console.log(myLibrary);
});
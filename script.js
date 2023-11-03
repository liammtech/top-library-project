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

    function resetFormDefaults() {
        title.value = "";
        author.value = "";
        pages.value = "";
        read.checked = false;
    }

    if (e.submitter.id === "submit") {

        // Add unique-entry validation
        for (let entry in myLibrary) {
            if (title.value === myLibrary[entry].title) {
                alert("Title is already an entry in the library, please choose another");
                return;
            }
        }

        // Add validation against empty fields
        if (!title.value | !author.value | !pages.value) {
            alert("Please ensure all fields are filled with an appropriate value.");
            return;
        };

        addBookToLibrary(title.value, author.value, pages.value, read.checked);
        console.log(myLibrary);
        resetFormDefaults();
        displayBooksOnPage();
        addNewBookModal.close();

    } else if (e.submitter.id === "cancel") {
        resetFormDefaults();
        addNewBookModal.close();
    }
});

// 4. Function to loop through library array and print to screen
function displayBooksOnPage() {
    document.querySelectorAll('.book-card').forEach(e => e.remove());
    const mainContainer = document.querySelector("#main-container")
    for (let entry in myLibrary) {
        // Get the values
        const title = myLibrary[entry].title;
        const author = myLibrary[entry].author;
        const pages = myLibrary[entry].pages;
        const read = myLibrary[entry].read;

        // Create the card div
        const newBookCard = document.createElement('div');

        // Set the id and class of the card div
        newBookCard.setAttribute('id', entry)
        newBookCard.setAttribute('class', 'book-card')

        // Set state of "Read" element
        let readClass = "not-read";
        let readStatus = "Not read";
        if (read) {
            readClass = "read";
            readStatus = "Read";
        }

        // Add innerHTML with the values
        newBookCard.innerHTML = `
        <p>"${title}"</p>
        <p>${author}</p>
        <p>${pages} pages</p>
        <button class="${readClass}">${readStatus}</button>
        <button class="remove">Remove</button>
        `

        // Push to page
        mainContainer.appendChild(newBookCard);
        addBookCardListeners();
    }
}

// 5. Function to remove book from library

// Function adds book card event handling
function addBookCardListeners() {
    let bookCards = document.querySelectorAll(".book-card");
    bookCards.forEach((bookCard) => {
        if (bookCard.getAttribute('listener') !== 'true') {
            bookCard.addEventListener('click', (e) => {
                if (e.target.getAttribute("class") === "remove") {
                    removeBook(bookCard.id);
                } else if (e.target.getAttribute("class") === "read" | e.target.getAttribute("class") === "not-read" ) {
                    toggleReadStatus(bookCard.id);
                }
            });
        }
    });
}

// Actual delete function
function removeBook(entryIndex) {
    delete myLibrary[entryIndex];
    displayBooksOnPage();
}

// 6. Function to toggle "read" status on or off
function toggleReadStatus(entryIndex) {
    let currentBookCard = document.getElementById(entryIndex);
    let readButton = currentBookCard.childNodes[7]
    readButton.classList.toggle("read");
    readButton.classList.toggle("not-read");
    if (readButton.textContent === "Read") {
        readButton.textContent = "Not read";
    } else if (readButton.textContent === "Not read") {
        readButton.textContent = "Read";
    };
}
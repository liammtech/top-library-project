// Wrap app in anonymous function
(function() {
    // Create app object
    var libraryApp = {

        // Create empty array for "library"
        myLibrary: [],

        // Add init function
        init: function() {

            // Initialisation functions
            this.cacheDom();
            this.handleEvents();
            this.render();
        },

        // cacheDom: caches document information
        cacheDom: function() {

            // Add all document query selectors
            this.container = document.querySelector("#main-container");
            this.bookCards = document.querySelectorAll(".book-card");
            this.addButton = document.querySelector("#add-book-button");
            this.modal = document.querySelector("#add-book-modal");
            this.form = document.querySelector("#add-book-form");
            this.formTitle = document.getElementById("title");
            this.formAuthor = document.getElementById("author");
            this.formPages = document.getElementById("pages");
            this.formRead = document.getElementById("read");
            this.reset = document.getElementById("reset-all-button");
        },

        // handleEvents: event handling
        handleEvents: function() {
            this.addButton.addEventListener("click", () => {this.modal.showModal()});
            this.form.addEventListener("submit", formHandling(e));
            this.bookCards.forEach((bookCard) => {});
        },

        // render: pushes to page document
        render: function() {},

        // bookConstructor: creates book object
        bookConstructor: function Book(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        },

        // addToLibrary: add book object to library
        addToLibrary: function(title, author, pages, read) {

        },

        // formHandling: handles form submission values and cancelling
        formHandling: function(e) {
            this.newBook = new Book(title, author, pages, read);
            this.myLibrary.push(newBook);
        },

        // resetFormDefaults: resets form values
        resetFormDefaults: function() {
            this.formTitle.value = "";
            this.formAuthor.value = "";
            this.formPages.value = "";
            this.formRead.checked = false;
        }
    };

    // Initialise app
    libraryApp.init()

})();
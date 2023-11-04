// Wrap app in anonymous function
(function() {

    // Create app object
    var libraryApp = {

        // Add init function
        init: function() {

            // Initialisation functions
            this.cacheDom();
            this.bindEvents();
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
            this.addButton.addEventListener("click", () => {});
            this.form.addEventListener("submit", () => {});
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
        }
    };

    // Initialise app
    libraryApp.init()
});
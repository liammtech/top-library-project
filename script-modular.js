// Wrap app in anonymous function
function app () {
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
            this.form.addEventListener("submit", this.formHandling.bind(this));
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
            this.newBook = new this.bookConstructor(title, author, pages, read);
            this.myLibrary.push(this.newBook);
            console.log(this.myLibrary);
        },

        // formHandling: handles form submission values and cancelling
        formHandling: function(e) {
            e.preventDefault();
            if (e.submitter.id === "submit") {
                for (let entry in this.myLibrary) {
                    if (this.formTitle.value === this.myLibrary[entry].title) {
                        alert("Title is already an entry in the library, please choose another");
                        return;
                    }
                }
                if (!this.formTitle.value | !this.formAuthor.value | !this.formPages.value) {
                    alert("Please ensure all fields are filled with an appropriate value.");
                    return;
                };
                this.addToLibrary(
                    this.formTitle.value, 
                    this.formAuthor.value, 
                    this.formPages.value, 
                    this.formRead.checked
                );
                this.resetFormDefaults();
                this.render();
                this.modal.close();
            } else if (e.submitter.id === "cancel") {
                this.resetFormDefaults();
                this.modal.close();
            }
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

};

app();
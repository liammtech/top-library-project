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
            this.bookCards.forEach((bookCard) => {this.bookCardHandling.bind(this)});
        },

        // render: pushes to page document
        render: function() {
            document.querySelectorAll('.book-card').forEach(e => e.remove());
            for (let entry in this.myLibrary) {
                // Get the values
                this.title = this.myLibrary[entry].title;
                this.author = this.myLibrary[entry].author;
                this.pages = this.myLibrary[entry].pages;
                this.read = this.myLibrary[entry].read;
        
                // Create the card div
                const newBookCard = document.createElement('div');
        
                // Set the id and class of the card div
                newBookCard.setAttribute('id', entry)
                newBookCard.setAttribute('class', 'book-card')
        
                // Set state of "Read" element
                let readClass = "not-read";
                let readStatus = "Not read";
                if (this.read) {
                    readClass = "read";
                    readStatus = "Read";
                }
        
                // Add innerHTML with the values
                newBookCard.innerHTML = `
                <p>"${this.title}"</p>
                <p>${this.author}</p>
                <p>${this.pages} pages</p>
                <button class="${readClass}">${readStatus}</button>
                <button class="remove">Remove</button>
                `
        
                // Push to page
                this.container.appendChild(newBookCard);
            }
        },

        // bookConstructor: creates book object
        bookConstructor: function Book(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        },

        // addToLibrary: add Book object to library
        addToLibrary: function(title, author, pages, read) {
            this.newBook = new this.bookConstructor(title, author, pages, read);
            this.myLibrary.push(this.newBook);
            console.log(this.myLibrary);
        },

        // bookCardHandling: handles actions on bookcard
        bookCardHandling: function(e) {
            if (!bookCard.hasEventlistener) {
                bookCard.hasEventListener = true;
                bookCard.addEventListener('click', (e) => {
                    if (e.target.getAttribute("class") === "remove") {
                        this.removeFromLibrary(bookCard.id);
                    } else if (e.target.getAttribute("class") === "read" | e.target.getAttribute("class") === "not-read" ) {
                        this.toggleReadStatus(bookCard.id);
                        return;
                    }
                });
            }           
        },

        // formHandling: handles whether form is submitted or cancelled
        formHandling: function(e) {
            e.preventDefault();
            if (e.submitter.id === "submit") {
                validationResult = this.validateForm();
                if (validationResult) {
                    this.formSubmit();
                } else {
                    return;
                }
            } else if (e.submitter.id === "cancel") {
                this.resetFormDefaults();
                this.modal.close();
            }
        },

        // formSubmit: handles form submission
        formSubmit: function() {
            this.addToLibrary(
                this.formTitle.value, 
                this.formAuthor.value, 
                this.formPages.value, 
                this.formRead.checked
            );
            this.resetFormDefaults();
            this.render();
            this.modal.close();
        },

        // validateForm: validate form values
        validateForm: function() {
            validation = true;
            for (let entry in this.myLibrary) {
                if (this.formTitle.value === this.myLibrary[entry].title) {
                    alert("Title is already an entry in the library, please choose another");
                    validation = false;
                    return validation;
                }
            }
            if (!this.formTitle.value | !this.formAuthor.value | !this.formPages.value) {
                alert("Please ensure all fields are filled with an appropriate value.");
                validation = false;
                return validation;
            };
            return validation;    
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
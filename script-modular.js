(function() {
    var libraryApp = {
        myLibrary: [],
        init: function() {
            this.cacheDom();
            this.handleSingleEvents();
            this.render();
        },
        cacheDom: function() {
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
        handleSingleEvents: function() {
            this.addButton.addEventListener("click", () => {this.modal.showModal()});
            this.form.addEventListener("submit", this.formHandling.bind(this));
            this.reset.addEventListener("click", this.resetAllButton.bind(this));
        },
        handleBookCardEvents: function() {      
            this.cacheDom();      
            this.bookCards.forEach((bookCard) => {
                if (!bookCard.hasEventListener) {
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
            });
        },
        render: function() {
            this.bookCards.forEach(e => e.remove());
            for (let entry in this.myLibrary) {
                this.title = this.myLibrary[entry].title;
                this.author = this.myLibrary[entry].author;
                this.pages = this.myLibrary[entry].pages;
                this.read = this.myLibrary[entry].read;
                const newBookCard = document.createElement('div');
                newBookCard.setAttribute('id', entry)
                newBookCard.setAttribute('class', 'book-card')
                let readClass = "not-read";
                let readStatus = "Not read";
                if (this.read) {
                    readClass = "read";
                    readStatus = "Read";
                }
                newBookCard.innerHTML = `
                <p>"${this.title}"</p>
                <p>${this.author}</p>
                <p>${this.pages} pages</p>
                <button class="${readClass}">${readStatus}</button>
                <button class="remove">Remove</button>
                `
                this.container.appendChild(newBookCard);
                this.handleBookCardEvents();
            }
        },
        bookConstructor: function Book(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        },
        addToLibrary: function(title, author, pages, read) {
            this.newBook = new this.bookConstructor(title, author, pages, read);
            this.myLibrary.push(this.newBook);
            console.log(this.myLibrary);
        },
        removeFromLibrary: function(index) {
            delete this.myLibrary[index];
            this.render();
        },
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
        resetFormDefaults: function() {
            this.formTitle.value = "";
            this.formAuthor.value = "";
            this.formPages.value = "";
            this.formRead.checked = false;
        },
        toggleReadStatus: function(index) {
            let currentBookCard = document.getElementById(index);
            let readButton = currentBookCard.childNodes[7]
            readButton.classList.toggle("read");
            readButton.classList.toggle("not-read");
            if (readButton.textContent === "Read") {
                readButton.textContent = "Not read";
            } else if (readButton.textContent === "Not read") {
                readButton.textContent = "Read";
            };
        },
        resetAllButton: function() {
            this.myLibrary = [];
            this.render();
        }
    };
    libraryApp.init()
})();
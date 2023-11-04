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
            this.title = document.getElementById("title");
            this.author = document.getElementById("author");
            this.pages = document.getElementById("pages");
            this.read = document.getElementById("read");
        },

        // bindEvents: event handling
        bindEvents: function() {},

        // render: pushes to page document
        render: function() {},
    };

    // Initialise app
    libraryApp.init()
});
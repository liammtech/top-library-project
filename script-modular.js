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
        cacheDom: function() {},

        // bindEvents: event handling
        bindEvents: function() {},

        // render: pushes to page document
        render: function() {},
    };

    // Initialise app
    libraryApp.init()
});
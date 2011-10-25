App.Routers.Sets = Backbone.Router.extend({
    routes: {
        "":   "index"
    },

    index: function() {
        // TODO: Implement this.
        var sets = new App.Collections.Sets();
        sets.fetch({
            success: function() {
                new App.Views.Index({ sets: sets });
            },
            error: function() {
		// QUESTION: What does Backbone do with the error class?
                new Error({ message: "Error loading sets." });
		console.error('Error loading sets.');
            }
        });
       
    }

});

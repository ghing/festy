App.Routers.Sets = Backbone.Router.extend({
    routes: {
        "":   "index",
	"venues/:slug":    "venue"
    },

    index: function() {
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
       
    },

    venue: function(slug) {
        // Fix case where venue was named differently in sets vs. venues
    	if (slug == "bar-1982") {
	    slug = "1982";
	}
        else if (slug == "durty-nelly-s") {
	    slug = "durty-nelly-s-pub";
 	}
    	var venues = new App.Collections.Venues();
	venues.fetch({
            success: function() {
                new App.Views.Venue({ venue: venues.find(function(venue) { 
		    return venue.get('slug') == slug;
		})});
            },
            error: function() {
		// QUESTION: What does Backbone do with the error class?
                new Error({ message: "Error loading venues." });
		console.error('Error loading venues.');
            }
	});
    }

});

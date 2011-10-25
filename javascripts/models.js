var Venue = Backbone.Model.extend(
);

var Set = Backbone.Model.extend({
    formatTime: function(dateObj) {
	var amPm = "";
        var hours = dateObj.getHours();
        var minutes = dateObj.getMinutes();        
        if (hours < 12) {
            amPm = "am";
        }
        else {
            amPm = "pm";
        }
        if (hours == 0) {
            hours = 12;
        }
        else if (hours >= 13) {
            hours -= 12;
	}
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + " " + amPm;
    },

    set: function(attributes, options) {
        /*
         * The start_time and end_time retrieved from the ScraperWiki API
         * are RFP 822-formatted strings representing the set's start and
         * end dates and times.  Rather than storing these in the model
         * attributes, lets store a Javascript Date object and separate
         * string representations of the date and time.
         */
	var startTimeObj = null;
	var endTimeObj = null;
        if (attributes.hasOwnProperty('start_time')) {
	    var startDateTime = new Date(attributes.start_time);	
  	    attributes.start_datetime = startDateTime; 
	    attributes.start_date = startDateTime.toDateString();
            attributes.start_time = this.formatTime(startDateTime);
        }
        if (attributes.hasOwnProperty('end_time')) {
	    var endDateTime = new Date(attributes.end_time);
  	    attributes.end_datetime = endDateTime; 
            attributes.end_date = endDateTime.toDateString();
            attributes.end_time = this.formatTime(endDateTime);
        }

        // Create a slug for the set based on the venue and start time
        if (attributes.hasOwnProperty('venue_slug') && attributes.hasOwnProperty('start_datetime')) {
	    attributes.slug = attributes.venue_slug +  "-" + attributes.start_datetime.getTime();   
	}

        // Call set on the parent (e.g. super)
        Backbone.Model.prototype.set.call(this, attributes, options);
    },
    
    getStartTime: function() {
    },
    
    getEndTime: function() {
    }
});

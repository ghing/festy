App.Views.Index = Backbone.View.extend({
    initialize: function() {
    	this.sets = this.options.sets;
	this.render();
    },
    

    render: function() {
        // Make underscore do Moustache style templates
        _.templateSettings = {
	    interpolate : /\{\{(.+?)\}\}/g
	};	
        var out = "";
        var template = _.template(this.set_template);
        var dateStr = "";
	var currentDateTime = new Date();
        var zebraClass = "odd";

        this.sets.each(function(set) {
            startDate = set.get('start_date');
            if (startDate != dateStr) {
                dateStr = startDate;
                out += "<h2>" + dateStr + "</h2>\n";
            }
	    var containerClass = "set";
	    if (set.get('end_datetime').getTime() > currentDateTime.getTime()) {
	        containerClass += " ongoing-or-upcoming";	
	    }
            containerClass += " " + zebraClass;
            out += template({
	    	container_class: containerClass, 
                slug: set.get('slug'),
                start_time: set.get('start_time'),
                end_time: set.get('end_time'),
                band: set.get('band'),
                venue: set.get('venue'),
		venue_slug: set.get('venue_slug')
            }); 
            if (zebraClass == "odd") {
                zebraClass = "even";
            }
            else {
                zebraClass = "odd";
            }
	});   

        $(this.el).html(out);
        $('#app').html(this.el); 
	var newPosition = $('.ongoing-or-upcoming').offset();
        window.scrollTo(0, newPosition.top);	
        
	return this;
    },

    set_template: "<div class='{{ container_class }}'>\n" +
        "    <a name='{{ slug }}'></a>\n" +
    	"    <span class='start-time'>{{ start_time }}</span>\n" +
        "    <span class='end-time'>{{ end_time }}</span>\n" +
        "    <span class='band'>{{ band }}</span>\n" +
        "    <span class='venue'><a href='#venues/{{ venue_slug }}'>{{ venue }}</a></span>\n" +
        "</div>\n"
});

App.Views.Venue = Backbone.View.extend({
    initialize: function() {
    	this.venue = this.options.venue;
	this.render();
    },
    

    render: function() {
        // Make underscore do Moustache style templates
        _.templateSettings = {
	    interpolate : /\{\{(.+?)\}\}/g
	};	
        var out = "";
        var template = _.template(this.venue_template);
        var infowindowTemplate = _.template(this.venue_infowindow_template); 
        out += template({
	    name: this.venue.get('name'),
	    street: this.venue.get('street')
        }); 
        $(this.el).html(out);
	// Google Maps needs a height set explicitly on the container
        $(this.el).height('100%');
        $('#app').html(this.el); 

	var address = this.venue.get('street') + ', ' + this.venue.get('city') + ', ' + this.venue.get('state');
        var venueName = this.venue.get('name');
	// Center the map at the Holiday Inn
	var gainesvilleCenter = new google.maps.LatLng(29.652092,-82.338336);
	var mapOptions = {
	    zoom: 15,
	    center: gainesvilleCenter, 
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
	        var marker = new google.maps.Marker({
                    position: results[0].geometry.location, 
                    map: map, 
                    title: venueName 
                });   
		var infowindow = new google.maps.InfoWindow({
	            content: infowindowTemplate({
                        name: venueName,
                        address: address
                    }) 
                }); 
	        infowindow.open(map, marker);
            }
	});
	    



	return this;
    },

    /*
    venue_template: "<div class='venue'>\n" +
        "    <h2 class='name'>{{ name }}</h2>\n" +
	"    <span class='street'>{{ street }}</span>\n" + 
        "</div>\n" +
        "<div id='map-canvas' style='width: 100%; height: 100%;'></div>\n"
    */
    venue_template: "<div id='map-canvas' style='width: 100%; height: 100%;'></div>\n",
 
    venue_infowindow_template : '<div class="info-window">\n' + 
        '    <h1 class="venue-name">{{ name }}</h1>\n' +
        '    <p class="address">{{ address }}</p>\n' +
        '    <p class="directions"><a href="http://maps.google.com/maps?saddr=&daddr={{ address }}">Directions</a>\n'

});

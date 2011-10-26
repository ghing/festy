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
	var currentDateTime = new Date('2011-10-29T11:00');

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
            out += template({
	    	container_class: containerClass, 
                slug: set.get('slug'),
                start_time: set.get('start_time'),
                end_time: set.get('end_time'),
                band: set.get('band'),
                venue: set.get('venue')
            }); 
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
        "    <span class='band'>{{ band }}</band>\n" +
        "    <span class='venue'>{{ venue }}</venue>\n" +
        "</div>\n"
});

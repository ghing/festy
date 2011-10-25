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
        /*
         QUESTION: Why can't I iterate over this.sets instead of
         this.sets.models?
         */
        _.each(this.sets.models, function(set) {
            startDate = set.get('start_date');
            if (startDate != dateStr) {
                dateStr = startDate;
                out += "<h2>" + dateStr + "</h2>\n";
            }
            out += template({
                slug: set.get('slug'),
                start_time: set.get('start_time'),
                end_time: set.get('end_time'),
                band: set.get('band'),
                venue: set.get('venue')
            }); 
	});   

        $(this.el).html(out);
        $('#app').html(this.el) 
    },

    set_template: "<div class='set'>\n" +
        "    <a name='{{ slug }}'></a>\n" +
    	"    <span class='start-time'>{{ start_time }}</span>\n" +
        "    <span class='end-time'>{{ end_time }}</span>\n" +
        "    <span class='band'>{{ band }}</band>\n" +
        "    <span class='venue'>{{ venue }}</venue>\n" +
        "</div>\n"
});

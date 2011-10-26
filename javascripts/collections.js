/*
select `venue`, `venue_slug`, `band`, `start_time_rfc822` as start_time, 
       `end_time_rfc822` as end_time from `sets`
order by datetime(`start_time_iso8601`);
*/
var SETS_URI = 'https://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=fest_10_schedule&query=select%20%60venue%60%2C%20%60venue_slug%60%2C%20%60band%60%2C%20%60start_time_rfc822%60%20as%20start_time%2C%20%0A%20%20%20%20%20%20%20%60end_time_rfc822%60%20as%20end_time%20from%20%60sets%60%0Aorder%20by%20datetime(%60start_time_iso8601%60)%3B%0A&callback=?'

App.Collections.Sets = Backbone.Collection.extend({
    model: Set,
    
    url: SETS_URI,
    
    comparator: function(set) {
        // Sort the collection based on start time
        return set.get('start_datetime').getTime();
    }
});

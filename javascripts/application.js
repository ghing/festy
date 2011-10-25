var App = {
    Views: {},
    Routers: {},
    Collections: {},
    init: function() {
        new App.Routers.Sets();
        Backbone.history.start();
    }
};


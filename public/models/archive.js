var app = app || {};
app.Archive = Backbone.Collection.extend({
    model: app.Post,
    url: '/api/posts',
    parse: function(data) {
        /* for default values if server return nothing */
        if (!data) {
            this.total = 0;
            return []; 
        }
        this.total = data.total;
        return data.posts;
    },
});
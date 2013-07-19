var app = app || {};
app.Post = Backbone.Model.extend({
    urlRoot: '/api/posts',
    defaults: {
        title: '',
        content: '',
        lastModifiedAt: '1970-01-01'
    },
    parse: function( response ) { 
        response.id = response._id; 
        return response;
    }
});
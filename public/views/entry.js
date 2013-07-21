app.EntryView = Backbone.View.extend({
    tagName: 'article',
    template: _.template( $('#entry-template').html() ),
    events: {
        "click a.title": "fetchPost",
        "click button.btn-edit": "editPost",
        "click button.btn-delete": "deletePost"
    },
    initialize: function(options) {
        //this.model = options.model;
        // make sure 'this' refers to this View in the success callback below
        _.bindAll(this, "renderPost");
        this.config = options.config || {styles: {}};
    },
    render: function() {
        // tmpl is a function that takes a JSON object and returns html
        // this.el is what we defined in tagName. use $el to get access // to jQuery html() function
        this.$el.html( this.template( _.extend({}, this.model.toJSON(), {config: this.config}) ));
        return this; 
    },
    fetchPost: function (event){
        this.model.fetch({success: this.renderPost});
    },
    renderPost: function(){
        var postView = new app.PostView({
            model: this.model
        });
        $(".tab-pane.active").removeClass("active");
        $(".nav li.active").removeClass("active")
        $("#post-pane.tab-pane").addClass("active");
        $("#post-pane #content").html( postView.render().el );
    },
    editPost: function() {
        console.log("Edit post");
        var editorView = new app.EditorView({
            model: this.model
        });

        $('div.navbar ul.nav a[data-view=EditorView]').tab('show');
    },
    deletePost: function(){
        this.model.destroy();
        this.remove();
    }
});
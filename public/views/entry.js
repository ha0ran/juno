/* for Backbone script */

/* TODO Need to create a abstract PostEntry for Home/Archive/Admin custom by params */
app.PostSummaryView = Backbone.View.extend({
    tagName: 'article',
    template: _.template( $('#post-summary-template').html() ),
    events: {
        "click a.title": "fetchPost"
    },
    initialize: function() {
        //this.model = options.model;
        // make sure 'this' refers to this View in the success callback below
        _.bindAll(this, "renderPostView"); 
    },
    render: function() {
        // tmpl is a function that takes a JSON object and returns html
        // this.el is what we defined in tagName. use $el to get access // to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ));
        return this; 
    },
    fetchPost: function (event){
        this.model.fetch({success: this.renderPostView});
    },
    renderPostView: function(){
        var postView = new app.PostView({
            model: this.model
        });
        $(".tab-pane.active").removeClass("active");
        $(".nav li.active").removeClass("active")
        $("#post-pane.tab-pane").addClass("active");
        $("#post-pane #content").html( postView.render().el );

    }
});
app.AdminSummaryView = Backbone.View.extend({
    tagName: 'article',
    template: _.template( $('#admin-summary-template').html() ),
    events: {
        "click a.title": "fetchPost",
        "click button.btn-edit": "edit",
        "click button.btn-delete": "drop"
    },
    initialize: function() {
        //this.model = options.model;
        // make sure 'this' refers to this View in the success callback below
        _.bindAll(this, "renderPostView"); 
    },
    render: function() {
        // tmpl is a function that takes a JSON object and returns html
        // this.el is what we defined in tagName. use $el to get access // to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ));
        return this; 
    },
    fetchPost: function (event){
        this.model.fetch({success: this.renderPostView});
    },
    renderPostView: function(){
        var postView = new app.PostView({
            model: this.model
        });
        $(".tab-pane.active").removeClass("active");
        $(".nav li.active").removeClass("active")
        $("#post-pane.tab-pane").addClass("active");
        $("#post-pane #content").html( postView.render().el );
    },
    edit: function() {
        console.log("Edit post");
        var editorView = new app.EditorView({
            model: this.model
        });
        $(".tab-pane.active").removeClass("active");
        $(".nav li.active").removeClass("active")
        $("#editor-pane.tab-pane").addClass("active");
        $("#editor-pane").html( editorView.render().el );
    },
    drop: function(){
        this.model.destroy();
        this.remove();
    }
});
app.EntryView = Backbone.View.extend({
    tagName: 'article',
    template: _.template( $('#entry-template').html() ),
    initialize: function(options) {
        //this.model = options.model;
        // make sure 'this' refers to this View in the success callback below
        _.bindAll(this, "renderPostView"); 
    },
    render: function() {
        // tmpl is a function that takes a JSON object and returns html
        // this.el is what we defined in tagName. use $el to get access // to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ));
        return this; 
    }
});
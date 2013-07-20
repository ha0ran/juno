app.EditorView = Backbone.View.extend({
    el: '#editor-pane',
    template: _.template( $('#editor-template').html() ),
    events: {
        "click button.btn-submit": "submit",
        "input textarea#content": "preview",
        "change textarea#content": "preview"
        
    },
    initialize: function(options){
        this.model = (options && options.model) || new app.Post();
        this.render();
    },
    render: function() {
        // tmpl is a function that takes a JSON object and returns html
        // this.el is what we defined in tagName. use $el to get access // to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ));
        return this; 
    },
    preview: function (){
        $('#preview').html(Markdown(this.$el.find('#content').val()));
    },
    submit: function(evt){
        evt.preventDefault();
        this.model.save({
            'title': this.$el.find('#title').val(),
            'content': this.$el.find('#content').val()
        });
    }
});
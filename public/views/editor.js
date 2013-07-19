app.EditorView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( $('#editor-template').html() ),
    events: {
        "click button.btn-submit": "submit"
    },
    render: function() {
        // tmpl is a function that takes a JSON object and returns html
        // this.el is what we defined in tagName. use $el to get access // to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ));
        return this; 
    },
    submit: function(evt){
        evt.preventDefault();
        this.model.save({
            'title': this.$el.find('#title').val(),
            'content': this.$el.find('#content').val()
        });
    }
});
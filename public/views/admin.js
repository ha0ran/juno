app.AdminView = Backbone.View.extend({
    el: 'div#admin-pane',
    initialize: function() {
        this.collection = new app.Archive(); 
        this.collection.fetch({reset: true});
        this.render();
        this.listenTo( this.collection, 'add', this.render );
        this.listenTo( this.collection, 'reset', this.render );
    },
    // render library by rendering each book in its collection
    render: function() { 
        this.$el.html('');
        if(this.collection.length === 0) {
            this.renderLogo();
            return;
        } else {
            this.collection.each(function( item ) {
                this.renderEntry( item ); 
            }, this );
        }
    },
    renderLogo: function() {
        this.$el.append(_.template($('#logo-template').html()));
    },
    // render a book by creating a BookView and appending the 
    // element it renders to the library's element 
    renderEntry: function( item ) {
        var entryView = new app.EntryView({
            model: item,
            className: 'title-entry',
            config: {
                admin: true
            }
        });
        this.$el.append( entryView.render().el ); 
    }
});
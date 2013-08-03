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
        this.collection.each(function( item ) {
            this.renderEntry( item ); 
        }, this );
    },
    // render a book by creating a BookView and appending the 
    // element it renders to the library's element 
    renderEntry: function( item ) {
        var entryView = new app.EntryView({
            model: item,
            className: 'row-fluid title-entry',
            config: {
                admin: true,
                styles: {
                    header: 'span10',
                    buttons: 'span2',
                    time: 'span3',
                    title: 'span9'
                }
            }
        });
        this.$el.append( entryView.render().el ); 
    }
});
var app = app || {};
app.ArchiveView = Backbone.View.extend({
    el: '#archive-pane #archive-entries',
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
                this.renderSummaryEntry( item ); 
            }, this );
        }
    },
    renderLogo: function() {
        this.$el.append(_.template($('#logo-template').html()));
    },
    // render a book by creating a BookView and appending the 
    // element it renders to the library's element 
    renderSummaryEntry: function( item ) {
        var postSummaryView = new app.PostSummaryView({
            model: item
        });
        this.$el.append( postSummaryView.render().el ); 
    }
});
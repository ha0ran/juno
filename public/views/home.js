app.HomeView = Backbone.View.extend({
    el: '#home-pane',
    initialize: function() {
        this.collection = new app.Archive();
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.updateCollection();
        this.render();
        this.listenTo( this.collection, 'add', this.render );
        this.listenTo( this.collection, 'reset', this.render );
        this.eventHub.bind('changePage', this.jumpToPage, this);
    },
    updateCollection: function() {
        this.collection.fetch({reset: true, data: $.param({page: this.currentPage, limit: this.itemsPerPage})});
    }, 
    // render library by rendering each book in its collection
    render: function() { 
        /* Need to improve, it's not a good idea to remove all elements
           Maybe consider to display a logon or text on the background
        */
        this.$el.html('');
        this.collection.each(function( item ) {
            this.renderEntry( item ); 
        }, this );

        var pageCount = Math.ceil(this.collection.total / this.itemsPerPage )
        this.renderPagination( pageCount );
    },
    // render a book by creating a BookView and appending the 
    // element it renders to the library's element 
    renderEntry: function( item ) {
        var postView = new app.EntryView({
            model: item,
            className: 'full-entry',
            config: {
                showContent: true,
                styles: {}
            }
        });
        this.$el.append( postView.render().el ); 
    },
    renderPagination: function(pageCount) {
        var paginationView = new app.PaginationView({
            pageCount: pageCount,
            currentPage: this.currentPage
        });
        this.$el.append( paginationView.render().el );
    },
    jumpToPage: function(page) {
        this.currentPage = page;
        this.updateCollection();
    }
});
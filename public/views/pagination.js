app.PaginationView = Backbone.View.extend({
    tagName: 'div',
    //className: "pagination",
    template: _.template( $('#pagination-template').html() ),
    events: {
        "click .pagination-item": "jumpToPage"
    },
    initialize: function(options) {
        this.currentPage = options.currentPage;
        this.pageCount = options.pageCount;
    },
    render: function() {
        this.$el.append( this.template( {currentPage: this.currentPage, pageCount: this.pageCount} ));    
        return this; 
    },
    jumpToPage: function( event ) {
        var page = $(event.currentTarget).data("page");
        this.eventHub.trigger('changePage', page);
    }
});
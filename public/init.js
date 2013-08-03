/* Ref: http://stackoverflow.com/questions/9713246/backbone-js-unable-to-trigger-custom-view-from-parent-view-and-have-child-view */
Backbone.View.prototype.eventHub = _.extend({}, Backbone.Events);
$.event.props.push('dataTransfer');
var app = app || {};

$(document).ready(function() {

    $("div.navbar ul.nav a").click(function(evt){
        var obj = $(evt.currentTarget);
        var viewName = obj.data('view');
        new app[viewName]();
    });
    new app.HomeView();
    window.MarkdownConverter = new Markdown.Converter();
    Markdown.Extra.init(window.MarkdownConverter);
});

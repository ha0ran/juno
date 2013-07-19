/* Ref: http://stackoverflow.com/questions/9713246/backbone-js-unable-to-trigger-custom-view-from-parent-view-and-have-child-view */
Backbone.View.prototype.eventHub = _.extend({}, Backbone.Events);
var app = app || {};

$(document).ready(function() {
    jQuery.event.props.push('dataTransfer');
    $('#editor').bind('drop', function(evt) {
        var files = evt.dataTransfer.files;
        $.each(files, function(index, file) {
            if (!file.type.match('image.*')) {
                alert("Sorry, but we only support images now!");
                //Display Error Message 
            }
            var fileReader = new FileReader();
            fileReader.onload = (function(file) {
                return function(e) { 
                    $.post('/upload', {name: file.name, content: e.target.result}, function(data) {
                        var result = $.parseJSON(data);
                        $("#editor").val($("#editor").val() + " !["+ file.name + "](" + result.url + ") ");
                        $("#editor").change();
                    });
                }
            })(file);
            fileReader.readAsDataURL(file);
        });
        return false;
    });
    function preview(){
        $('#preview').html(Markdown($('#editor').val()));
    }
    $('#editor').on("input change",function(){
        preview();
    });

    new app.HomeView();
    new app.ArchiveView();
    new app.AdminView();
});


app.EditorView = Backbone.View.extend({
    el: '#editor-pane',
    template: _.template( $('#editor-template').html() ),
    events: {
        "click button.btn-submit": "submit",
        "input textarea.content": "preview",
        "change textarea.content": "preview",
        "drop textarea.content.wmd-input": "uploadFile"
    },
    initialize: function(options){
        this.model = (options && options.model) || new app.Post();
        this.editor = null;
        this.render();
    },
    render: function() {
        // tmpl is a function that takes a JSON object and returns html
        // this.el is what we defined in tagName. use $el to get access // to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ));
        if(this.editor === null) {
            this.editor = $("textarea").pagedownBootstrap();
        }
        return this; 
    },
    preview: function() {
        return
        this.$el.find('div.preview.markdown.wmd-preview').html(MarkdownConverter.makeHtml(this.$el.find('textarea.content').val()));
        
    },
    submit: function(evt) {
        evt.preventDefault();
        this.model.save({
            'title': this.$el.find('input.title').val(),
            'content': this.$el.find('textarea.content').val()
        });
        this.$el.find('input.title').val('');
        this.$el.find('textarea.content').val('');
        this.$el.find('div.preview.markdown.wmd-preview').html('');
    },
    uploadFile: function(evt) {
        evt.preventDefault();
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
                        var editor = $('#editor-pane textarea.content');
                        editor.val(editor.val() + " !["+ file.name + "](" + result.url + ") ");
                        editor.change();
                    });
                }
            })(file);
            fileReader.readAsDataURL(file);
        });
    }
});
<script id="editor-template" type="text/template">
    <div class="editor">
        <div class="inputs">
            <input type="text" class="title" placeholder="title of the article" value="<%= title %>"/>
            <textarea class="content"><%= content %></textarea>
        </div>
        <div class="preview markdown">
        </div>
        <div class="btn-group">
            <button class="btn btn-primary btn-submit">Submit</button>
        </div>
    </div>

</script>
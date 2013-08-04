<script id="entry-template" type="text/template">
    <div class="<%= config.styles.header %> header">
        <time class="<%= config.styles.time %> date"> <i class="icon-calendar"></i><%= lastModifiedAt %> </time>
        <h1 class="<%= config.styles.title %> title">
            <a class="entry-title" data-id="<%= id %>"><%= title %></a>
        </h1>
    </div>
    <% if (config.admin) { %>
    <div class="<%= config.styles.buttns %> btn-group">
        <button class="btn btn-primary btn-edit" type="button">Edit</button>
        <button class="btn btn-danger btn-delete" type="button">Delete</button>
    </div>
    <% } %>
    <% if (config.showContent) {%>
    <div class="content"><%= MarkdownConverter.makeHtml(content) %></div>
    <% } %>
</script>
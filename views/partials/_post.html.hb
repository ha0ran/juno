<script id="post-template" type="text/template">
    <div class="header">
        <time class="date"> <i class="icon-calendar"></i><%= lastModifiedAt %> </time>
        <h1 class="title">
            <a class="entry-title" data-id="<%= id %>"><%= title %></a>
        </h1>
    </div>
    <div class="content"><%= MarkdownConverter.makeHtml(content) %></div>
</script>
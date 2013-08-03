<header role="banner"><h1><a href="/">Haoran</a></h1></header>
<div class="navbar">
    <ul class="nav">
        <li class="active"><a href="#home-pane" data-toggle="tab" data-view="HomeView">HOME</a></li> 
        <li><a href="#archive-pane" data-toggle="tab" data-view="ArchiveView">ARCHIVE</a></li>
        <!-- comment out about page until we implemnt it
        <li><a href="#about-pane" data-toggle="tab" data-view="AboutView">ABOUT</a></li>
        -->
        <li><a href="#admin-pane" data-toggle="tab" data-view="AdminView">Admin</a></li>
        <li><a href="#editor-pane" data-toggle="tab" data-view="EditorView">Editor</a></li>
    </ul> 
</div>
<div class="tab-content">
    <!-- comment out about page until we implemnt it
    <div class="tab-pane" id="about-pane">
    </div>
    -->
    <div class="tab-pane active" id="home-pane"> 
    </div>
    <div class="tab-pane" id="archive-pane">
    </div>
    <div class="tab-pane" id="new-pane">
    </div>
    <div class="tab-pane" id="post-pane">
        <div class="container-fluid" id="content">
        </div>
    </div>
    <div class="tab-pane" id="admin-pane">
    </div>
    <div class="tab-pane" id="editor-pane">
    </div>
</div>
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
<script id="post-template" type="text/template">
    <div class="header">
        <time class="date"> <i class="icon-calendar"></i><%= lastModifiedAt %> </time>
        <h1 class="title">
            <a class="entry-title" data-id="<%= id %>"><%= title %></a>
        </h1>
    </div>

    <div class="content"><%= MarkdownConverter.makeHtml(content) %></div>
</script>
<script id="pagination-template" type="text/template">
    <% if (pageCount > 0) { %>
    <ul class="pager">

        <% if (currentPage < pageCount ) { %>
        <li class="next">
            <a href="#" class="pagination-item" data-page="<%= currentPage + 1 %>"> Older &rarr;</a>
        </li>
        <% } %>
        <% if (currentPage > 1) { %>
        <li class="previous">
            <a href="#" class="pagination-item" data-page="<%= currentPage - 1 %>">&larr; Newer</a>
        </li>
        <% } %>
    </ul>
    <% } %>
</script>
<script type="text/javascript" src="lib/jquery-2.0.2.js"></script>
<script type="text/javascript" src="lib/underscore.js"></script>
<script type="text/javascript" src="lib/backbone.js"></script>
<script type="text/javascript" src="lib/bootstrap.js"></script>
<!-- Maybe consider use pagedown extra after investigation -->
<script type="text/javascript" src="lib/Markdown.Converter.js"></script>
<script type="text/javascript" src="lib/Markdown.Sanitizer.js"></script>
<script type="text/javascript" src="lib/Markdown.Editor.js"></script>
<script type="text/javascript" src="lib/Markdown.Extra.js"></script>
<script type="text/javascript" src="lib/jquery.pagedown-bootstrap.js"></script>
<script type="text/javascript" src="init.js"></script>
<script type="text/javascript" src="models/post.js"></script>
<script type="text/javascript" src="models/archive.js"></script>
<script type="text/javascript" src="views/admin.js"></script>
<script type="text/javascript" src="views/archive.js"></script>
<script type="text/javascript" src="views/editor.js"></script>
<script type="text/javascript" src="views/entry.js"></script>
<script type="text/javascript" src="views/home.js"></script>
<script type="text/javascript" src="views/pagination.js"></script>
<script type="text/javascript" src="views/post.js"></script>
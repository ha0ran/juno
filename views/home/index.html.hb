<header role="banner"><h1><a href="/">Haoran</a></h1></header>
<div class="navbar">
    <ul class="nav">
        <li class="active"><a href="#home-pane" data-toggle="tab" data-view="HomeView">HOME</a></li> 
        <li><a href="#archive-pane" data-toggle="tab" data-view="ArchiveView">ARCHIVE</a></li>
        <!-- comment out about page until we implemnt it
        <li><a href="#about-pane" data-toggle="tab" data-view="AboutView">ABOUT</a></li>
        -->
        {{#if loggedIn }}
        <li><a href="#editor-pane" data-toggle="tab" data-view="EditorView">Editor</a></li>
        <li><a href="#admin-pane" data-toggle="tab" data-view="AdminView">Admin</a></li>
        {{/if}}
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

    <div class="tab-pane" id="post-pane">
        <div class="container-fluid" id="content">
        </div>
    </div>
    {{#if loggedIn }}
    <div class="tab-pane" id="admin-pane">
    </div>
    <div class="tab-pane" id="editor-pane">
    </div>
    {{/if}}
</div>
{{! Inlcuding templates for backbone }}
{{> _entry }}
{{> _post }}
{{> _pagination }}
{{#if loggedIn }}
{{> _editor }}
{{/if}}

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
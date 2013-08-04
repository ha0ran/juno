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
/********************************************
 *              Routes for Post             *
 ********************************************/
module.exports = function(app){
    app.get( '/api/posts', function( request, response ) { 
        var page = request.query.page;
        var limit = request.query.limit;
        console.log(request.query);
        if (page && limit) {
            Post.find({}).skip((page - 1) * limit).limit(limit).exec( function(err, posts) {
                if( !err ) {
                    Post.count({}, function(err, count){
                        if( !err) {
                            return response.send( {total: count, posts: posts} );
                        }
                    });
                    
                } else {
                    return console.log( err );
                } 
            })
        }
        else {
            Post.find( function( err, posts ) {
                if( !err ) {
                    Post.count({}, function(err, count){
                        if( !err) {
                            return response.send( {total: count, posts: posts} );
                        }
                    });
                } else {
                    return console.log( err );
                } 
            });
        }
    });

    //Insert a new book
    app.post( '/api/posts', function( request, response ) {
        // should find the article accroding to it's id, if no id create new one
        var post = new Post({
            title: request.body.title,
            content: request.body.content,
            createdAt: (new Date()).toJSON()
        });
        post.save( function( err ) {
            if( !err ) {
                return console.log( 'created' );
            } else {
                return console.log( err );
            } 
        });
        return response.send( post ); 
    });

    // Get a new post by ID
    app.get( '/api/posts/:id', function( request, response ) {
        console.log("Get Post by id:" + request.params.id);
        return Post.findById( request.params.id, function( err, post ) {
            if( !err ) {
                console.log(post.id);
                console.log(post.title);
                console.log(post.content);
                return response.send( post );
            } else {
                return console.log( err );
            } 
        });
    });

    //Update a post
    app.put( '/api/posts/:id', function( request, response ) {
        console.log( 'Updating book ' + request.body.title );
        return Post.findById( request.params.id, function( err, post ) {
            post.title = request.body.title;
            post.content = request.body.content;
            post.lastModifiedAt = new Date().getTime();
            return post.save( function( err ) { 
                if( !err ) {
                    console.log( 'post updated' ); 
                } else {
                    console.log( err );
                }
                return response.send( post ); 
            });
        }); 
    });

     //Delete a post
    app.delete( '/api/posts/:id', function( request, response ) { 
        console.log( 'Deleting book with id: ' + request.params.id );
        return Post.findById( request.params.id, function( err, post ) {
            return post.remove( function( err ) {
                if( !err ) {
                    console.log( 'Book removed' ); 
                    return response.send( '' );
                } else {
                    console.log( err );
                }
            }); 
        });
    });
}
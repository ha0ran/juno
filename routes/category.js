/********************************************
 *              Routes for Post             *
 ********************************************/
module.exports = function(app){
    app.get( '/api/categories', function( request, response ) { 
        Category.find( function( err, categories ) {
            if( !err ) {
                return response.send( categories );
            } else {
                return console.log( err );
            } 
        });
    });

    //Insert a new book
    app.post( '/api/categories', function( request, response ) {
        // should find the article accroding to it's id, if no id create new one
        var category = new Category({
            name: request.body.category.name,
            created: (new Date()).toJSON()
        });
        category.save( function( err ) {
            if( !err ) {
                return console.log( 'created' );
            } else {
                return console.log( err );
            } 
        });
        return response.send( post ); 
    });

    // Get a new post by ID
    app.get( '/api/categories/:id', function( request, response ) {
        console.log("Get Post by id:" + request.params.id);
        return Category.findById( request.params.id, function( err, category ) {
            if( !err ) {
                console.log(category.name);
                return response.send( category );
            } else {
                return console.log( err );
            } 
        });
    });

    //Update a post
    app.put( '/api/categories/:id', function( request, response ) {
        console.log( 'Updating book ' + request.body.title );
        return Category.findById( request.params.id, function( err, category ) {
            category.name = request.body.category.name;
            return category.save( function( err ) { 
                if( !err ) {
                    console.log( 'post updated' ); 
                } else {
                    console.log( err );
                }
                return response.send( category ); 
            });
        }); 
    });

     //Delete a post
    app.delete( '/api/categories/:id', function( request, response ) { 
        console.log( 'Deleting book with id: ' + request.params.id );
        return Category.findById( request.params.id, function( err, category ) {
            return category.remove( function( err ) {
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
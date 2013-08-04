/********************************************
 *              Routes for User             *
 ********************************************/
module.exports = function(app){
    app.get( '/api/users', function( request, response ) { 
        User.find( function( err, users ) {
            if( !err ) {
                return response.send( users );
            } else {
                return console.log( err );
            } 
        });
    });

    //Insert a new book
    app.post( '/api/users', function( request, response ) {
        // should find the article accroding to it's id, if no id create new one
        console.log(request);
        var user = new User({
            name       : request.body.user.name,
            first_name : request.body.user.first_name,
            last_name  : request.body.user.last_name,
            password   : request.body.user.password,
            role       : request.body.user.role,
            createdAt  : (new Date()).toJSON()
        });
        user.save( function( err ) {
            if( !err ) {
                return console.log( 'created new user: ' + user.name );
            } else {
                return console.log( err );
            } 
        });
        return response.send( user ); 
    });

    // Get a new post by ID
    app.get( '/api/users/:id', function( request, response ) {
        console.log("Get Post by id:" + request.params.id);
        return User.findById( request.params.id, function( err, user ) {
            if( !err ) {
                console.log(user.id);
                console.log(user.name);
                return response.send( user );
            } else {
                return console.log( err );
            } 
        });
    });

    //Update a post
    app.put( '/api/users/:id', function( request, response ) {
        console.log( 'Updating book ' + request.body.title );
        return User.findById( request.params.id, function( err, user ) {
            return user.save( function( err ) { 
                if( !err ) {
                    console.log( 'post updated' ); 
                } else {
                    console.log( err );
                }
                return response.send( user ); 
            });
        }); 
    });

     //Delete a post
    app.delete( '/api/posts/:id', function( request, response ) { 
        console.log( 'Deleting book with id: ' + request.params.id );
        return User.findById( request.params.id, function( err, user ) {
            return user.remove( function( err ) {
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
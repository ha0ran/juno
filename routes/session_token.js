/********************************************
 *              Routes for Post             *
 ********************************************/
module.exports = function(app){
    app.post('/api/sessions', function(req, res) {
        User.findOne({ name: req.body.user.name }, function(err, user) {
            if (user && user.authenticate(req.body.user.password)) {
                req.session.user_id = user.id;
                console.log("sussccess login")
                // Remember me
                if (req.body.remember_me) {
                    var sessionToken = new SessionToken({ name: user.name });
                        sessionToken.save(function() {
                            res.cookie('sessiontoken', sessionToken.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/', signed: true });
                            res.redirect('/');
                        });
                } else {
                    res.redirect('/');
                }
            } else {
                //req.flash('error', 'Incorrect credentials');
                console.log("Incorrect credentials")
                //res.redirect('/sessions/new');
            }
        }); 
    });

    //Delete a post
    app.delete( '/api/sessions', function( request, response ) { 
        console.log( 'Deleting book with id: ' + request.params.id );
        if (request.session) {
            SessionToken.remove({ name: request.currentUser.name }, function() {});
            response.clearCookie('sessiontoken');
            request.session.destroy(function() {});
        }
    });
}
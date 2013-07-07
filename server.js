var express = require("express"),
	fs = require("fs");                                                                
    app = express(),
    mongoose = require( 'mongoose' ),
    Post = require('./models/post').Post
    application_root = __dirname;                                                                             

// tell express to use the bodyParser middleware                                                 
// and set upload directory                                                                      
app.use( express.bodyParser({ keepExtensions: true, uploadDir: "uploads" }) );                                                                     
app.use( express.static( application_root) );
app.use( express.methodOverride() );

mongoose.connect( 'mongodb://localhost/juno' );

app.post("/upload", function (request, response) {                                               
	var decodedImg = new Buffer(request.body.content, 'base64');
	var imgData = request.body.content.replace(/^data:image\/.*;base64,/,"");
	var imgPath = "uploads/"+ request.body.name;
	fs.writeFile(imgPath, imgData,'base64', function(err){console.log("Fail to save uploaded file:" + imgPath)})
    response.write(JSON.stringify({
    	name: request.body.name,
    	url: "/" + imgPath
    }));
    response.end();
});
   
app.get( '/api/posts', function( request, response ) { 
    return Post.find( function( err, posts ) {
        if( !err ) {
            return response.send( posts );
        } else {
            return console.log( err );
        } 
    });
});

//Insert a new book
app.post( '/api/posts', function( request, response ) { 
    var post = new Post({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate
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
app.listen(3000);
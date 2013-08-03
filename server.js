/********************************************
 *                 Load modules             *
 ********************************************/
var express = require("express"),
    handlebars = require('express3-handlebars'), // handlebars template engine 
	fs = require("fs"), 
    path = require("path");                                                                   

/********************************************
 *                 Load models              *
 ********************************************/

mongoose = require( 'mongoose' );
Post = require('./models/post').Post;
User = require('./models/user').User;
mongoose.connect( 'mongodb://localhost/juno' );
                                                                           
application_root = __dirname;

/********************************************
 *             Config Application           *
 ********************************************/
app = express();                                                       
app.use( express.bodyParser({ keepExtensions: true, uploadDir: "uploads" }) );                                                                     
app.use( express.static( path.join(application_root, 'public') ) );
app.use('/uploads', express.static( path.join(application_root, 'uploads') ) );
app.use( express.methodOverride() );
app.use(express.cookieParser('We1come2N3wW0r1d!1545'));
app.use(express.cookieSession());
app.engine('hb', handlebars({defaultLayout: 'application', extname: '.html.hb'}));

/********************************************
 *                Load Routes               *
 ********************************************/
require('./routes/application')(app);
require('./routes/category')(app);
require('./routes/post')(app);
require('./routes/session_token')(app);
require('./routes/user')(app);

/********************************************
 *              Helper Functions            *
 ********************************************/
function loadUser(req, res, next) {
    if (req.session.user_id) {
        User.findById(req.session.user_id, function(err, user) {
            if (user) {
                req.currentUser = user;
                next();
            } else {
                res.redirect('/sessions/new');
            }
        });
    } else if (req.signedCookies.sessiontoken) {
        authenticateFromSessionToken(req, res, next);
    } else {
        res.redirect('/sessions/new');
    }
}

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

app.listen(3000);
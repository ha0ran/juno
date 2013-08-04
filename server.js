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


app.listen(3000);
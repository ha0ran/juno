var auth = require('../helpers/auth_helper');
/********************************************
 *              Routes for Post             *
 ********************************************/
module.exports = function(app){
    app.get( '/', function( request, response ) {
        response.render("home/index.html.hb", {loggedIn: auth.loggedIn(request, response) });
    });

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
}
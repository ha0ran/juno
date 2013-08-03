/********************************************
 *              Routes for Post             *
 ********************************************/
module.exports = function(app){
    app.get( '/', function( request, response ) {
        console.log("-------- render home page ");
        var OMG = "hello whrer are yuou"
        response.render("home/index.html.hb", {greet: "hew!!!!"});
    });
}
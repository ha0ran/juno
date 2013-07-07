var express = require("express"),
	fs = require("fs");                                                                
    app = express(),
    application_root = __dirname;                                                                             

// tell express to use the bodyParser middleware                                                 
// and set upload directory                                                                      
app.use(express.bodyParser({ keepExtensions: true, uploadDir: "uploads" }));                                                                     
app.use( express.static( application_root) );
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
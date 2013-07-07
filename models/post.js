var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Schemas
var PostSchema = new Schema({ 
        title: String,
        author: String,
        content: String,
        lastModifiedDate: Date
    });
//Models
exports.Post = mongoose.model( 'Post', PostSchema );
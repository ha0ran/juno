var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Schemas
var Post = new Schema({ 
        author         : String,
        content        : String,
        createdAt      : Date,
        editor         : [{ type: Schema.Types.ObjectId, ref: 'User' }],
        lastModifiedAt : Date,
        lastModifiedBy : { type: Schema.Types.ObjectId, ref: 'User' },
        owner          : { type: Schema.Types.ObjectId, ref: 'User' },
        reader         : [{ type: Schema.Types.ObjectId, ref: 'User' }],
        title          : String
    });

//Models
exports.Post = mongoose.model( 'Post', Post );
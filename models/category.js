var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Category of Post */
var Category = new Schema({ 
        name      : String,
        createdAt : Date,
        createdBy : { type: Schema.Types.ObjectId, ref: 'User' },
    });

//Models
exports.Category = mongoose.model( 'Category', Category );
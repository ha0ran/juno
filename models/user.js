var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Helper functions 
function validatePresenceOf(value) {
    return value && value.length;
}

//Schemas
var User = new Schema({ 
        name            : String,
        first_name      : String,
        last_name       : String,
        hashed_password : String,
        salt            : String,
        createdAt       : Date,
        posts           : [ { type: Schema.Types.ObjectId, ref: 'User' } ]
    });

User.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

User.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._password;});

User.method('authenticate', function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
});

User.method('makeSalt', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

User.method('encryptPassword', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

User.pre('save', function(next) {
    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

//Models
exports.User = mongoose.model( 'User', User );







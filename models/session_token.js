var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Schemas
SessionToken = new Schema({
    name   : { type: String, index: true },
    series : { type: String, index: true },
    token  : { type: String, index: true }
});

SessionToken.method('randomToken', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

SessionToken.pre('save', function(next) {
    // Automatically create the tokens
    this.token = this.randomToken();

    if (this.isNew) {
        this.series = this.randomToken();
    }

    next();
});

SessionToken.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

SessionToken.virtual('cookieValue')
    .get(function() {
        return JSON.stringify({ email: this.email, token: this.token, series: this.series });
    });
//Models
exports.SessionToken = mongoose.model( 'SessionToken', SessionToken );
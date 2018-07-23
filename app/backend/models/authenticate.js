var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthenticateSchema = new Schema({
    Email: {
        type: String
    },
    PasswordPlain: {
        type: String
    },
    IsAuthneticated: {
        type: Boolean
    },
    IsUser: {
        type: String
    }
});
module.exports = mongoose.model('Authenticate', AuthenticateSchema);
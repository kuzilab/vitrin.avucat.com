var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({

    UserId: {
        type: String
    },
    NameSurname: {
        type: String
    },
    Email: {
        type: String
    },
    Phone: {
        type: String
    },
    Content: {
        type: String
    },
    SavedDate: {
        type: String
    }
});

module.exports = mongoose.model('Message', MessageSchema);
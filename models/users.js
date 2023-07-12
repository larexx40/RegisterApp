var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    phone: String,
});

var User = new mongoose.model('User', schema);


// let create = new User({ email: 'test', firstName: 'test', lastName: 'test', phone: 'test' });
//  create.save();


module.exports = User;


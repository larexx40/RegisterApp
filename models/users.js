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
    userType: {
        type: Number,
        default: 0
    },
    
    addedBy: {
        type: Number,
        default: 0
    },
    department: {
        type: String,
        default: ''
    },
    phone: String,
    
    address: {
        type: String,
        default: ''
    },
    
    occupation: {
        type: String,
        default: ''
    },
});

var User = new mongoose.model('User', schema);




module.exports = User;


const dbConfig = require('./dbconfig.js');
const mongoose = require('mongoose');
require("dotenv").config();

mongoose.Promise = global.Promise;

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
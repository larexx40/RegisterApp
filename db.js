// const dbConfig = require('./dbconfig.js');
const mongoose = require('mongoose');
require("dotenv").config();

mongoose.Promise = global.Promise;

console.log(process.env.LOCAL_MONGO);
mongoose.connect(process.env.LOCAL_MONGO, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
},60000000).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
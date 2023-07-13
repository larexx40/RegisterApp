const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./db');
const UserRoute = require('./routes/user.js')
const AuthRoute = require('./routes/auth.js')
const jsonParser = express.json();

const app = express();


// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(bodyParser.json())
//parse body as json
app.use(jsonParser);

app.use('/user',UserRoute)
app.use('/auth',AuthRoute)

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
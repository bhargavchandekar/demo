const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000 ;

//include all models
require('./models/model');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let database = require('./config/database');

// connect to  mongoDB
let dbContext = mongoose.connect(database.url,{ useNewUrlParser: true });

console.log("connection with database successfully");

app.use(bodyParser.json());// support json encoded bodies

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//IMPORTANT: You must make sure that you define all configurations BEFORE defining routes
//include all routes
require('./routes/route')(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

module.exports = app;
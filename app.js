const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
var cors = require('cors');

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:user123@ds125263.mlab.com:25263/studditavansdb', { useNewUrlParser: true, useCreateIndex: true }).then(_ => {
    console.log('MongoDB connected!');
}).catch(console.error);

// Express
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


routes(app);

module.exports = app;
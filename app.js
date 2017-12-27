require('dotenv').config();
var express = require('express');
var app = express()
var reg = require('./routes/reg.js')
app.use('/reg', reg);
//
//
// var express     = require('express');
// var app         = express();
// var bodyParser  = require('body-parser');
// var config = require('./config'); // get our config file
// var router = require('./router');
var port = process.env.PORT || 8012;

// routes
app.use('/', reg);


// start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

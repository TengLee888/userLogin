require('dotenv').config();
var express = require('express');
var app = express()
var reg = require('./routes/reg.js')
var flash = require('connect-flash')
var path    = require("path");
var favicon = require('serve-favicon')
// app.use('/reg', reg);
// app.use(flash());
//
//
// var express     = require('express');
// var app         = express();
// var bodyParser  = require('body-parser');
// var config = require('./config'); // get our config file
// var router = require('./router');
var port = process.env.PORT || 8012;

// routes
app.use(express.static('public'));
app.get('/',function(req,res){
     res.sendFile(__dirname + '/index.html');
});
app.use('/', reg);


// start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

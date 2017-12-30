// require('dotenv').config();
// var express = require('express');
// var app = express()
// var reg = require('./routes/reg.js')
// var flash = require('connect-flash')
// var path    = require("path");
// var favicon = require('serve-favicon')
// // app.use('/reg', reg);
// // app.use(flash());
// //
// //
// // var express     = require('express');
// // var app         = express();
// // var bodyParser  = require('body-parser');
// // var config = require('./config'); // get our config file
// // var router = require('./router');
// var port = process.env.PORT || 8012;
//
// // routes
// app.use(express.static('public'));
// app.get('/',function(req,res){
//      res.sendFile(__dirname + '/index.html');
// });
// app.use('/', reg);
//
//
// // start the server
// app.listen(port);
// console.log('Magic happens at http://localhost:' + port);
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

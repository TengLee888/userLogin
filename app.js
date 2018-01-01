require('dotenv').config();
var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var flash = require('connect-flash');
// var routes = require('./routes/index');
var routes = require('./routes/reg');

// var Users = require('./routes/users');
// var User = require('./models/user.js');

var app = express();
var port = process.env.PORT || 3000;
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// // uncomment after placing your favicon in /public
// // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false })); //TODO:註解這個收不到前端的東西
app.use(cookieParser());
app.use('/', routes);




// get home page
app.get('/',function(req,res){
     res.sendFile(__dirname + '/index.html');
     // res.send('Hello')
});




// start the server
app.listen(port , function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  console.log("process.env.PORT: " , process.env.PORT);
});




// catch 404 and forward to error handler
// app.use(function(req, res, next){
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
//
// //errow handler
// //development error handler
// //will print stacktrace
// if(app.get('env') === 'development'){
//   app.use(function(err , req , res , next){
//     res.status(err.status || 500);
//     res.render('error' , {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
//
// //production error handler
// //no stacktrace leaked to user
// app.use(function(err , req , res , next){
//   res.status(err.status || 500);
//   res.render('error' , {
//     message: err.message,
//     error: err
//   });
// })

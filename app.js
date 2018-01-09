require('dotenv').config();
var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');  //書上的例子，嘗試整合中
// var settings = require('./settings');



var app = express();
var port = process.env.PORT || 3000;
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// // uncomment after placing your favicon in /public
// // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //TODO:註解這個收不到前端的東西
app.use(cookieParser());
// app.use(flash())
// app.use(session({
//   secret: settings.cookieSecret,
//   key: settings.db,  //cookieName
//   cookie: {maxAge: 1000*60*60*24*7}, // 7days
//   store: new MongoStore({
//     db: settings.dbName,
//     host: settings.host,
//     port: settings.port
//   })
// }))

app.use('/', routes);



// start the server
app.listen(port , function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



// debug功能 暫時先不用
// // catch 404 and forward to error handler
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

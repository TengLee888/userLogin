var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var crypto = require('crypto');
var qs = require('querystring');
var host = 'http://localhost:8000';



router.post('/', function(req, res) {
  res.header('Access-Control-Allow-Origin', host);
  var formData = '';
  req.on("data", function (data) {
    formData += data;   //eg: username=tenglee&email=abc123%40gmail.com
  });
  req.on("end", function () {
    var user = qs.parse(formData); // user:  { username: 'tenglee', email: 'abc123@gmail.com' }
    // console.log("user: " , user);
    User.saveUser(user)
    res.end('end');
  });

  // var msg = JSON.stringify(user); //msg:  {"username":"tenglee","email":"abc123@gmail.com","id":"123456"}
  // var userName = req.body['username'],
  // userPwd = req.body['password'],
  // userRePwd = req.body['rePassword'],
  // md5 = crypto.createHash('md5');
  //
  // userPwd = md5.update(userPwd).digest('hex');

});
module.exports = router;

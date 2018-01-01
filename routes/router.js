// serverExpress 用的
var express = require('express');
var router = express.Router();
var qs = require('querystring');
var host = 'http://localhost:8000';
var connection = require('./../config');


function save(callback) {
  console.log("open save");
  var user = {
    username: this.username,
    password: this.password
  };

  var cmd = "INSERT INTO user(username, password) VALUES(?,?)";

  connection.query(cmd, [user.username, user.password], function (err,result) {
    if (err) {
      return;
    }

    connection.release();
    callback(err,result);
  });
};


router.post('/', function(req, res) {
  var user = {
    username: this.username,
    password: this.password
  };
  req.on("data", function (data) {
    formData += data;   //eg: username=tenglee&email=abc123%40gmail.com
  });
  req.on("end", function () {
    var user = qs.parse(formData); // user:  { username: 'tenglee', email: 'abc123@gmail.com' }
    save(user)
    user.id = "123456";
    var msg = JSON.stringify(user); //msg:  {"username":"tenglee","email":"abc123@gmail.com","id":"123456"}
    res.writeHead(200, {
      "Content-Type":"application/json;",
      'Access-Control-Allow-Origin': host
    });
    res.end(user.username + "歡迎您的加入!");
  });
});
module.exports = router;

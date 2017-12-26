//後端收到前端的資料，再把收到的資料加工傳給前端

var http = require('http');
var url  = require('url');
var fs   = require("fs");
var qs   = require('querystring');
var host = 'http://localhost:8000'


var server = http.createServer(function (req,res) {
  var pathname = url.parse(req.url,true).pathname;
  if (pathname === "/") {
    var formData = '';
    req.on("data", function (data) {
      formData += data;   //eg: username=tenglee&email=abc123%40gmail.com
    });
    req.on("end", function () {
      var user = qs.parse(formData); // user:  { username: 'tenglee', email: 'abc123@gmail.com' }
      user.id = "123456";
      var msg = JSON.stringify(user); //msg:  {"username":"tenglee","email":"abc123@gmail.com","id":"123456"}
      res.writeHead(200, {
        "Content-Type":"application/json;",
        "Content-Length":msg.length,
        'Access-Control-Allow-Origin': host
      });
      res.end(msg);
    });
  }
  else {
    fs.readFile("hello.html", "utf8", function(err, file) {
      res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
      res.write(file);
      res.end();
    });
  }
});

server.listen(8012);
console.log('Server跑起來了，現在時間是:' + new Date());

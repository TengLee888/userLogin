//後端收到前端的資料，再把訊息傳給前端
var http = require('http');
var url = require('url');
var host = 'http://localhost:8000'

var server = http.createServer(
  function(req,res) {
    if (req.method === 'POST') {
      req.on('data', function (data) { //處理前端送來的資料
        console.log("Post data : " + data);
      });
    }

    var pathname = url.parse(req.url).pathname;
    if(pathname === '/') {
      // res.writeHead(200,{'Content-Type':'text/plain'});
      res.writeHead(200,{
        'Content-Type':'text/plain',
        'Access-Control-Allow-Origin': host
      });
      res.end("Login Success");  //傳送資料給前端
    }
  }
);
server.listen(8012);
console.log('Server跑起來了，現在時間是:' + new Date());

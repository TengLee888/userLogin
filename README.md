## 練習 user login
- 有三個server.js，分別是不一樣的練習
- server1.js、server2.js練習用http、serverExpress鍊習用Express
  - config.js用在上面三個檔案
- app.js才多了使用者的資料會寫到database
  - models, routes用在app.js

## 參考
https://ithelp.ithome.com.tw/articles/10161458
https://ithelp.ithome.com.tw/articles/10161535
https://ithelp.ithome.com.tw/articles/10160394


# 框架/套件
## express
### Application
#### app.get
```
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
```





#### app.listen(port, [hostname], [backlog], [callback])
- Binds and listens for connections on the specified host and port. This method is identical to Node’s http.Server.listen().



#### app.route()
- 為路由路徑建立可鏈接的路由處理程式。
```
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```

- 由於是在單一位置指定路徑，建立模組路由很有用
```
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
```
- 然後將路由器模組載入應用程式中：
```
var birds = require('./birds');
...
app.use('/birds', birds);
```




### Request
#### req.body
- Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.
- 配合Express中间件bodyParser()中间件提供的。当bodyParser()中间件使用后，这个对象默认为 {},req.body可以获取到post到body中的内容。
- use body parser so we can get info from POST and/or URL parameters
```
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/profile', upload.array(), function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});
```


#### req.query
- This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.
- 這個屬性為訪問的結果包在物件


#### req.session
- use the request property to store session data
- req.session, which is store serialized data into JSON
```
var sess = req.session;  //initialize session variable
req.session.userId = results[0].id; //set user id
req.session.user = results[0];//set user name

// Get Session Value
var userId = req.session.userId;


//Destroy/Unset Session Value
req.session.destroy(function(err) {
     //cal back method
  })
```




### Response
#### res.json([body])
- Sends a JSON response
-  sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
```
res.json(null);
res.json({ user: 'tobi' });
res.status(500).json({ error: 'message' });
```


#### res.send([body])
- Sends the HTTP response.
- The body parameter can be a Buffer object, a String, an object, or an Array.
```
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
```




### Router
- express.Router 類別用來建立可裝載的模組路由處理程式
- Router 實例是一個完整的中介軟體與路由系統
- 將路由器建立成模組、 在其中載入中介軟體函數、定義一些路由，並且將路由器模組裝載在主要應用程式中的路徑。
```
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
```

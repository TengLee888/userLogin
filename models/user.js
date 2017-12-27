require('dotenv').config();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected");
  } else {
    console.log("Error while connecting with database");
    throw err
  }
});


function User(user){
  this.username = user.username;
  this.password = user.password;
};


User.getUserNumByName = function getUserNumByName(username, callback) {
  //使用username 來檢查是否有資料
  var cmd = "select COUNT(1) AS num from user info where username = ?";
  connection.query(cmd, [username], function (err, result) {
    if (err) {
      return;
    }
    connection.release();
    //查詢結果使用 callback 呼叫，並將 err, result 參數帶入
    callback(err,result);
  });
};
//透過帳號取得使用者資料
User.getUserByUserName = function getUserNumByName(username, callback) {
  var cmd = "select * from user where username = ?";
  connection.query(cmd, [username], function (err, result) {
    if (err) {
      return;
    }
    connection.release();
    callback(err,result);
  });
};

User.saveUser = function saveUser(user) {
  var cmd = "INSERT INTO users (username, password) VALUES (? , ?)";
  console.log('saveUser: ' , user);
  connection.query(cmd, [user.username , user.password] , function (err,result) {
    if (err) {
      return;
    }
    // connection.release(); //TODO:好像要用createPool
    // callback(err,result);
  });
};


module.exports = User;

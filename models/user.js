require('dotenv').config();
var mysql = require('mysql');
var DB_NAME=
DB_HOST=
DB_USER=
DB_PASS=
var connection = mysql.createConnection({
  // host     : process.env.DB_HOST,
  // user     : process.env.DB_USER,
  // password : process.env.DB_PASS,
  // database : process.env.DB_NAME
  host     : '66.147.244.172',
  user     : 'infinjm0_tenglee',
  password : 'Harvest888!!!',
  database : 'infinjm0_memonotedb'
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
  this.email = user.email;
};



//儲存使用者資訊
User.prototype.saveUser = function saveUser(user) {
  //要存入資料故的使用者檔案
  // var user = {
  //   username = this.username,
  //   password = this.password,
  //   email = this.email
  // }
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




module.exports = User;

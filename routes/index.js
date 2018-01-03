//書上的例子，嘗試整合中
require('dotenv').config();
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// var User = require('../models/user.js')


// Database
var dbName ='heroku_xj85pq2p'
var url ='mongodb://tenglee:Harvest888!!!@ds113282.mlab.com:13282/heroku_xj85pq2p'
// var url = process.env.DB_URL;
// var dbName = process.env.DB_NAME
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


function User(user){
  this.email = user.email;
  this.password = user.password;
};


// mainPage
router.get('/' , function(req , res){
  res.render('index')
});







// 用戶註冊
router.get('/reg' , function(req , res){
  res.render('reg')
});
router.post('/reg' , function(req , res){
  console.log('req.body: ',req.body);
  var email = req.body.email;
  var password = req.body.password;
  var passwordRepeat = req.body.passwordRepeat
  if(password !== passwordRepeat){
    // req.flash('error' , '兩次輸入的密碼不一致')
    // res.send('兩次輸入的密碼不一致')
    console.log('兩次輸入的密碼不一致');
    return res.redirect('/reg')
  }


  //建立秘密碼的md5值
  // var md5 = crypto.createHash('md5')
  // var password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    email: email,
    password: password
  })


  // Use connect method to connect to the server
  MongoClient.connect(url, function(err,client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);

    //檢查用戶名是否已存在
    db.collection('users').findOne({email:email}, function(err, result) {
      if (err) throw err;
      console.log("result: " , result);
      if(!result){
        console.log(result, "此信箱尚未註冊");
        insertDocuments(db , function(){
          db.close();
        })
        // res.redirect('/');
      }

      console.log(result, "此信箱已註冊");
      db.close();
      // res.redirect('/login');
    });


  // var findDocuments = function(db, callback) {
  //   var collection = db.collection('users');
  //   collection.find({email: '123465236'}).toArray(function(err, docs) {
  //     assert.equal(err, null);
  //     console.log("Found the following records");
  //     console.log(docs);
  //     if(docs == []){
  //       console.log(" 此信箱尚未註冊");
  //       // insertDocuments()
  //     }else{
  //       console.log(" 此信箱已註冊");
  //     }
  //     callback(docs);
  //   });
    // console.log(result)
    // if(result){
    //   console.log(" 此信箱已註冊");
    //   // req.flash('error' , '此信箱已註冊');
    //   // res.send('此信箱已註冊');  //傳回login page
    // }else{
    //   console.log("開始註冊");
    //   // insertDocuments(db, function() {
    //   // });
    // }
    // callback(result);
  })


  // 如果不存在則新增用戶
  // 輸入資料  Insert a Document
  var insertDocuments = function(db, callback) {
    var collection = db.collection('users');
    collection.insertOne(
      newUser,
      function(err, result) {
        console.log("Inserted documents into the collection: " , newUser);
        res.redirect('/')
        callback(result);
      }
    );
  };
});




//   // 如果不存在則新增用戶
//   newUser.save(function(err, user){
//     if(err){
//       req.flash('error' , err);
//       return res.redirect('/reg'); //reg page
//     }
//     req.session.user = user; //使用者存入ssession
//     req.flash('sucess' , '註冊成功!');
//     res.redirect('/'); //註冊成功傳回主頁
//   })
// });






// 用戶登陸
router.get('/login',function(req,res){
  res.render('login');
});
// return res.redirect('/'); //回到主頁
// router.post('/login' , function(req , res){
//
// });
//
//
// //發表筆記
// router.get('/post' , function(req , res){
//
// });
//
// router.post('/post' , function(req , res){
//
// });
//
//
// // 登出
// router.get('/' , function(req , res){
//
// });
//

module.exports = router;

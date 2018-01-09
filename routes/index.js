//書上的例子，嘗試整合中
require('dotenv').config();
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// var User = require('../models/user.js')


// Database
var url = process.env.DB_URL;
var dbName = process.env.DB_NAME
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');




function User(user){
  this.email = user.email;
  this.password = user.password;
};




// 儲存使用者資訊
User.prototype.save = function(callback) {
  //存入使用者的檔案
  //當newUser的時候初始化
  var user = {
    email: this.email,
    password: this.password
  }

  //打開資料庫
  MongoClient.connect(url, function(err,client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);
    var collection = db.collection('users');
    //註冊使用者資料
    collection.insertOne(
      user,
      function(err, result) {
        console.log("Inserted user information into the database: " , user);
        callback(null , user); //成功！err為null, 傳回儲存後的使用者資訊
      }
    );
  });
};




//讀取使用者資料
User.get = function(email , callback){
  MongoClient.connect(url, function(err,client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db(dbName);

    //檢查用戶名是否已存在
    db.collection('users').findOne({email:email}, function(err, result) {
      if (err) {
        db.close();
        return callback(err);
      }
      console.log("result: " , result);
      if(!result){
        db.close();
        console.log("email尚未註冊");
        // insertDocuments(db , function(){
        // })
      }
      db.close();
      console.log("email已註冊");
      return callback(null , result) //成功，傳回查詢的使用者資訊
    });
  });
}


var dataFront = {
  redirect :'',
  msg:''
}

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
    dataFront.msg = '兩次輸入的密碼不一致';
    dataFront.redirect =  '/reg'
    return res.send(dataFront)
  }


  //建立秘密碼的md5值
  // var md5 = crypto.createHash('md5')
  // var password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    email: email,
    password: password
  })


  //檢查用戶是否存在
  User.get(newUser.email , function(err , user){
    if(user){
      dataFront.msg = '該信箱已註冊';
      dataFront.redirect =  '/login'
      return res.send(dataFront)
    }
  })

  //不存在則新增增加用戶
  newUser.save(function(err , user){
    if(user){
      console.log('新增用戶');
      dataFront.msg = '註冊成功';
      dataFront.redirect =  '/'
      return res.send(dataFront)
    }
  })



  //成功版本，嘗試做callback
  // Use connect method to connect to the server
  // MongoClient.connect(url, function(err,client) {
  //   assert.equal(null, err);
  //   console.log("Connected successfully to server");
  //   var db = client.db(dbName);
  //
  //   //檢查用戶名是否已存在
  //   db.collection('users').findOne({email:email}, function(err, result) {
  //     if (err) throw err;
  //     console.log("result: " , result);
  //     if(!result){
  //       console.log(result, "此信箱尚未註冊");
  //       insertDocuments(db , function(){
  //         db.close();
  //       })
  //       // return res.redirect('/')
  //     }
  //
  //     console.log(result, "此信箱已註冊");
  //     // return res.redirect('/login')
  //     db.close();
  //   });

  // var insertDocuments = function(db, callback) {
  //   var collection = db.collection('users');
  //   collection.insertOne(
  //     newUser,
  //     function(err, result) {
  //       console.log("Inserted user information into the database: " , newUser);
  //       callback(result);
  //     }
  //   );
  // };

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

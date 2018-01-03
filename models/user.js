// var mongodb = require('./db')


function User(user){
  this.email = user.email;
  this.password = user.password;
};

module.exports = User;




User.prototype.save = function (callback) {
  //要存入資料故的使用者檔案
  var user = {
    email: this.email,
    password: this.password
  }
}




//打開資料庫
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  if(err){
    // return callback(err)  //TODO:這樣寫也行？
    return console.log('Error:'+ err);
  }
  console.log("Connected successfully to server");
  const db = client.db(dbName);


  // 讀取user集合
  db.collection('users' , function(err , collection){
    if(err){
      mongodb.close();
      return console.log('Error:'+ err);
    }
    //將使用者資料插入 users集合
    collection.insert(users , {
      safe: true
    } , function(err , user){
      mongodb.close();
      if(err){
        return console.log('Error:'+ err);
      }
      // callback(null , user[0]); //成功，err為null, 並回傳儲存後的使用者文檔
    });
  });
});



//讀取使用者資訊
User.get = function(name , callback){
  //打開資料庫
  mongodb.open(function(err , db){
    if(err){
      // return callback(err);
      return err
    }
    // 讀取user集合
    db.collection('users' , function(err , collection){
      if(err){
        mongodb.close();
        // return callback(err);
        return err
      }
      //查詢用戶名(name key)value為name的筆記
      collection.findOne({
        name:name
      }, function(err , user){
        if(err){
          // return callback(err);
          return err
        }
        callback(null , user); //成功，傳回查詢的使用者資訊
      })
    })
  })
}

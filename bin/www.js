#!/usr/bin/ env node
var express = require('express');
var app = express();

var debug = require('debug')('blog');  //TODO:待改
var app = require('../app');
app.set('port' , process.env.PORT || 3000);
var server = app.listen(app.get('port'), function(){
  debug('Express server listening on port ' + server.address().port);
})

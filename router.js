var express = require('express');
var router = express.Router();
var host = 'http://localhost:8000'
router.post('/', function(req, res) {
  res.header('Access-Control-Allow-Origin', host);
  res.json({ message: 'Login Sucess' });
});

module.exports = router;

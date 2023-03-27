var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({status: 'success', message: 'Welcome to the Neural Classify API'});
});

module.exports = router;

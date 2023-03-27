var express = require('express');
var router = express.Router();

router.post('/signup', require('../controllers/users').register);
router.post('/login', require('../controllers/users').login);

module.exports = router;

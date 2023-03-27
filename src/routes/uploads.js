var express = require('express');
const TokenValidation = require('../middlewares/auth');
var router = express.Router();

router.post('/dataset', TokenValidation, require('../controllers/uploads').uploadImage);
router.get('/', TokenValidation,  require('../controllers/uploads').getUploads);

module.exports = router;

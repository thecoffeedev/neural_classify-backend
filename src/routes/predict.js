var express = require('express');
// const ImageUpload = require('../middlewares/multer');
var router = express.Router();

router.post('/predict-all', require('../controllers/predict').predictAll);
router.post('/predict-model', require('../controllers/predict').predictModel);

module.exports = router;

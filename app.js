var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var predictRouter = require('./src/routes/predict');
var uploadRouter = require('./src/routes/uploads');

var app = express();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './predict-uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });

const storageTrain = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dataset-uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const uploadTrain = multer({ storage: storageTrain });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', image: req.file.filename });
});


app.post('train-upload', uploadTrain.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', image: req.file.filename });
});

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/predict', predictRouter);
app.use('/api/v1/uploads', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;

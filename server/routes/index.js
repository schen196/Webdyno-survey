var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET Create Survey page. */
router.get('/create', function(req, res, next) {
  res.render('index', { title: 'Create' });
});

/* GET survey page. */
router.get('/surveys', function(req, res, next) {
  res.render('index', { title: 'Surveys' });
});



module.exports = router;

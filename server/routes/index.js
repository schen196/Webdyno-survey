var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../models/survey');

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

module.exports = router;

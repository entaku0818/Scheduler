var express = require('express');
var router = express.Router();
const fs = require('fs');
const { facility_schedule } = require('../models/');
const moment = require('moment');

router.use(function(req, res, next) {
	//"Access-Control-Allow-Origin"をall許可する
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  
})


module.exports = router;

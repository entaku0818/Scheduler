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
router.get('/:facilityId/:date', function(req, res, next) {



	facility_schedule.findAll({
		where: {
			facilityId: req.params.facilityId,
			start: {gte: req.params.date,lte: moment(req.params.date).add("days", 1).format("YYYY-MM-DD")}
		},
		raw: true
	}).then(function(result) {
			res.contentType('application/json');
			res.send(JSON.stringify({status:0, facility:result}));
	});
});

router.post('/', function(req, res, next) {
    // パラメータ名、nameを出力
		var data = req.body;
		console.log(data);

		var start = moment(data['start']).format();
		var end = moment(data['end']).format();



		    fs.writeFile('./add.json', JSON.stringify(data, null, '    '));

				var exec = require('child_process').exec;


				exec('casperjs ./facility_add.js', function(err, stdout, stderr){
				  if (err) {
				    console.error(err);
				    res.status(500).send('エラー');
				    return;
				  }
				  console.log(stdout);
					if (stdout.indexOf('OK') != -1) {

					}else{
					}

				  if (stderr) {
				    console.error(stderr);
				  }

				});


				facility_schedule.findAll({
					where: {
						$or: [
							{start: {gte: start,lt: end}},
							{end: {gt: start,lte: end}}
						]
					},
					raw: true
				}).then(function(result) {
					console.log(result.length);
					if(result.length > 0){
						res.contentType('application/json');
						res.send(JSON.stringify({status:1, test:"すでに予約が入っています(泣)"}));
					}else{
						facility_schedule.create(data)
							.error(function(err) {
								//エラー時の処理
								console.log(err);
								res.send('よやくしっぱい！！');
							})
							.then(function(result) {
								//成功時の処理
								res.contentType('application/json');
								res.send(JSON.stringify({status:0, test:"予約完了しました！！！"}));
							});
					}
				});





})

router.delete('/:facilityId', function(req, res, next) {


			res.contentType('application/json');
			res.send(JSON.stringify({status:0, test:"削除します(仮)"}));
});


module.exports = router;

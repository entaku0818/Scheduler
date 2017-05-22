var express = require('express');
var router = express.Router();
const fs = require('fs');
const { Scheduler } = require('../models/');

/* GET home page. */
router.get('/', function(req, res, next) {

	console.log(Scheduler.findAll());
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    // リクエストボディを出力

    // パラメータ名、nameを出力
		var data = req.body;
		console.log(data);

		Scheduler.create(data)
    .error(function(err) {
          //エラー時の処理
          console.log(err);
    })
    .success(function(result) {
          //成功時の処理
          console.log(result);
    });

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
				res.send('予約完了しました！！！');
			}else{
				res.send('よやくしっぱい！！');
			}

		  if (stderr) {
		    console.error(stderr);
		  }

		});
})


module.exports = router;

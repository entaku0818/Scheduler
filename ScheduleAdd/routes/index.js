var express = require('express');
var router = express.Router();
const fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    // リクエストボディを出力

    // パラメータ名、nameを出力
		var data = req.body;
		console.log(data);


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

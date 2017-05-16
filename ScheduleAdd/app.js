const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const app = express();
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'template', 'main.tmpl'));
const compiled = _.template(TEMPLATE);
const PORT = process.env.PORT || 3100;
const HOSTNAME = '0.0.0.0';
// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	//"Access-Control-Allow-Origin"をall許可する
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.get('/', (req, res) => {
	  var data = req.body;
		console.log(req.body);
		res.send(compiled({data: data}));
});



app.post('/add', function(req, res) {
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

app.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

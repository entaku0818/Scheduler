var casper = require("casper").create();

//フェイスブックにログインする

casper.start("https://dn.ap-com.co.jp/cgi-bin/dneo/dneo.cgi?cmd=schindex&log=on#cmd=schweekgrp&gid=205", function(){
  //ログイン
	this.echo("開始");

  this.fill('#inputfrm', { UserID: 'endo', _word: 'soccer00' }, true);

		this.echo("ロード中");
		this.wait(5000, function() {
				this.capture('login_done.png');
				this.click('#jsch-tab-schdaygrp > a');
		});
});


casper.then(function(){
		this.wait(5000, function() {
			this.capture('scheduleURL.png');

			var html = this.evaluate(function(){

				return document.querySelector("html").outerHTML;
	    });
 			var list = this.evaluate(function(){

				return document.querySelector('#jsch-schweekgrp').outerHTML;
	    });
	    // Save HTML




	    var fs = require('fs');
	    fs.write('./html.html', html, 'w');
		});
});

//結果のキャプチャ

casper.run();

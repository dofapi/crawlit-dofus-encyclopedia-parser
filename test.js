var express = require('express');
var app = express();
var cheerio = require('cheerio');
var Horseman = require("node-horseman");
var horseman = new Horseman();

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req, res, next) {
	var url = "http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements";
	//var url = "https://www.sosnoob.com/";
	page = 1;
	horseman
		.on('error', console.error)
		.open(url + '?page=' + page)
		.evaluate(function() {
		  try{
			var itemsData = [];
			$('tr').each(function(index, element){
			   var item = {}; // all the data of this item
			   itemsData.push($(this).html);
				//$(this).find(td).each(function(index, element){
				  // var item = {}; // all the data of this item
				//});
			 });
			 return itemsData;
		  }catch (err) {
			  return [err];
		  }
		 //return articleData;
		})
		.then((htmlRes) => {
			response = htmlRes;
			console.log(response);
		})
		.log()
		.close()
});
	
app.listen(3000, function () {
	console.log('Crawlit listening on port 3000!')
});

var Horseman = require("node-horseman");
var fs = require('fs');
var Promise = require('bluebird');
//var gi = require('./getItems');

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
//crawl();


function crawl() {
	var crawlers = [];
	for (var page = 1; page <= 12; page++) {
		crawlers.push(getData(page));
	}
	Promise.all(crawlers).then(values => { 
		var result = concatToOneArray(values);
		console.log(result);
		fs.appendFileSync('amuletUrl.json', JSON.stringify(result), 'utf8');
		//gi.getItems();
	});
}

function getData(page) {
	return new Promise(function(resolve, reject) {
		new Horseman({
			injectJquery: true
		})
		.open('http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id[0]=1&' + 'page=' + page)
		.html('tbody')
		.evaluate(function () {
			var links = [];
			$('tr').each(function(i, tr){
				var link = 'http://www.dofus-touch.com' + $(this).find( "td:eq( 0 )" ).find('a').attr('href');
				links.push(link);				
			});
			links.shift();
			//console.log(links);
			return links;
		})
		//.log()
		.then((htmlRes) => {
			resolve(htmlRes);
		})
		.close();
	});	
}

function concatToOneArray(arrToConvert) {
	var newArr = [];
	for(var i = 0; i < arrToConvert.length; i++)
	{
		newArr = newArr.concat(arrToConvert[i]);
	}
	return newArr;
}
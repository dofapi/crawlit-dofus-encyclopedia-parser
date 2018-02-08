var Horseman = require("node-horseman");
var fs = require('fs');
var Promise = require('bluebird');
var gi = require('./getItems');

crawl();


function crawl() {
	var crawlers = [];
	for (var page = 1; page <= 2; page++) {
		crawlers.push(getData(page));
	}
	Promise.all(crawlers).then(values => { 
		fs.appendFileSync('links.json', JSON.stringify(values), 'utf8');
		gi.getItems();
	});
}

function getData(page) {
	return new Promise(function(resolve, reject) {
		new Horseman({
			injectJquery: true
		})
		.open('http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements' + '?page=' + page)
		.html('tbody')
		.evaluate(function () {
			var links = [];
			$('tr').each(function(i, tr){
				var link = 'http://www.dofus-touch.com' + $(this).find( "td:eq( 0 )" ).find('a').attr('href');
				links.push(link);				
			});
			links.shift();
			console.log(links);
			return links;
		})
		.log()
		.then((htmlRes) => {
			resolve(htmlRes);
		})
		.close();
	});	
}
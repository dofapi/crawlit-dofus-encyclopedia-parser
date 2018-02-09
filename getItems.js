var Horseman = require("node-horseman");
var fs = require('fs');
var Promise = require('bluebird');

getItems();

function getItems() {
	var crawlers = [];
	var links = getLinksFromFile();
	//console.log(obj);
	links.forEach((urls) => {
		//crawlers.push(getData(page));
		urls.forEach((url) => {
			crawlers.push(getData(url));
		});
	});
	Promise.all(crawlers).then(values => { 
		console.log(values);
		fs.appendFileSync('items.json', JSON.stringify(values), 'utf8');
		//gi.getItems();
	});
    //return Date();
};

function getData(url) {
	return new Promise(function(resolve, reject) {
		new Horseman({
			injectJquery: true
		})
		.open(url)
		.html('div.ak-encyclo-detail-right.ak-nocontentpadding')
		.evaluate(function () {
			var items = [];
			var itemo;
			$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-list-element').each(function(i, element){
				itemo = $(this).find( "div.ak-title" ).text().trim();
				var item = $(this).find( "div.ak-title" ).text().trim();
				items.push(item);				
			});
			//links.shift();
			//console.log(items);
			return items;
		})
		//.log()
		.then((htmlRes) => {
			//console.log(htmlRes);
			resolve(htmlRes);
		})
		.close();
	});	
}

function getLinksFromFile() {
	var jsonFile = fs.readFileSync("links.json", "utf8");
	obj = JSON.parse(jsonFile);
	return obj;
}
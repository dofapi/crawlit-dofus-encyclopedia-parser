var Horseman = require("node-horseman");
var fs = require('fs');
var Promise = require('bluebird');

getItems();

function getItems() {
	var crawlers = [];
	var links = getLinksFromFile();
	//console.log(obj);
	links.forEach((urls) => {
		urls.forEach((url) => {
			crawlers.push(getData(url));
		});
	});
	Promise.all(crawlers).then(values => { 
		console.log(values);
		//fs.appendFileSync('items.json', JSON.stringify(values), 'utf8');
	});
};

function getData(url) {
	return new Promise(function(resolve, reject) {
		new Horseman({
			injectJquery: true
		})
		.open(url)
		.html('div.ak-encyclo-detail-right.ak-nocontentpadding')
		.evaluate(function () {
			var type = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-type.col-xs-6').find('span').text().trim();
			var name = $('h1.ak-return-link').text().trim();
			var description = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel:first').find('div.ak-panel-content').text().trim();
			var lvl = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-level.col-xs-6.text-right').text().trim().replace(/\D/g,'');
			var imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src');
			var panoplyUrl = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href');
			var item = {
				name: name,
				description: description,
				lvl: lvl,
				type: type,
				imgUrl: imgUrl,
				url: document.URL,
				panoplyUrl: 'http://www.dofus-touch.com' + panoplyUrl
			}
			item["stats"] = [];
			$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-list-element').each(function(i, element){
				item["stats"].push($(this).find( "div.ak-title" ).text().trim());
			});
			return item;
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
	var jsonFile = fs.readFileSync("links2.json", "utf8");
	obj = JSON.parse(jsonFile);
	return obj;
}
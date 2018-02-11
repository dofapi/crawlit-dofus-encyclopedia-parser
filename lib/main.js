var fs = require('fs');
var fsPath = require('fs-path');
var Promise = require('bluebird');
var gi = require('./getItems');
var cm = require('./cmd');
var Nightmare = require('nightmare');
var nightmare = new Nightmare();
var CLI = require('clui'),
    Spinner = CLI.Spinner;

var url;
var itemCategory;

main();

function main(){
	cm.cmd();
}

var crawl = exports.crawl = function(cmdResponse) {
	var countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
	countdown.start();
	var crawlers = [];
	cmdResponse = JSON.parse(cmdResponse);
	maxPage = cmdResponse.pages;
	itemCategory = cmdResponse.category;
	switch (cmdResponse.category) {
	  case 'helmet':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=16&';
		// console.log(url);
		break;
	  case 'cloak':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=17&';
		// console.log(url);
		break;
	  case 'amulet':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id[0]=1&';
		// console.log(url);
		break;
	  case 'boot':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=11&';
		// console.log(url);
		break;
	  case 'ring':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=9&';
		// console.log(url);
		break;
	  case 'belt':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=10&';
		// console.log(url);
		break;
	  case 'backpack':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=81&';
		// console.log(url);
		break;
	  case 'shield':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=82&';
		// console.log(url);
		break;
	  case 'trophy':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=151&';
		// console.log(url);
		break;
	  case 'dofus':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=23&';
		// console.log(url);
		break;
	  default:
		console.log('Sorry, we are out of ' + cmdResponse.category + '.');
	}
	for (var page = 1; page <= maxPage; page++) {
		crawlers.push(getData(page));
	}
	Promise.all(crawlers).then(values => { 
		var result = concatToOneArray(values);
		gi.getItems(result, function(items){
			fsPath.writeFile('../data/'+itemCategory + '.json', JSON.stringify(items), function(err){
				if (err) console.log(err);
				console.log('\n End of crawled data and file '+itemCategory+'.json was generated');
				process.exit();
			});
		});
		
	});
}

function getData(page) {
	return new Promise(function(resolve, reject) {
		new Nightmare()
		.goto(url + 'page=' + page)
		.inject('js', './dependencies/jquery.min.js')
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
		.end()
		.then((htmlRes) => {
			resolve(htmlRes);
		});
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
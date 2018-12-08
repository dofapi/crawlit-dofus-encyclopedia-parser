var fs = require('fs');
var resume = require('./resume-crawler/resume');
var ge = require('./item-crawler/getEquipments');
var gw = require('./item-crawler/getWeapons');
var gs = require('./item-crawler/getSets');
var gm = require('./item-crawler/getMounts');
var gp = require('./item-crawler/getPets');
var gr = require('./item-crawler/getResources');
var gmn = require('./item-crawler/getMonsters');
var gc = require('./item-crawler/getConsumables');

var CLI = require('clui'), Progress = CLI.Progress;

var currentPosition = 0, progressbarPosition = 0;
var itemsList = [];
var gCategory, gLinks;
var thisProgressBar = new Progress(20);

var getItems = exports.getItems = function (category, links, game) {
	gGame = game, gCategory = category, gLinks = links;
	if (currentPosition == 0 && fs.existsSync('./data/links/resume.json')) {
		var itemsResumed = JSON.parse(fs.readFileSync('./data/' + game + '/' + category + '.json', 'utf8'));
		itemsList = itemsResumed;
	}
	return new Promise(async function (resolve, reject) {
		while (currentPosition < links.length) {
			try {
				let item = await getData(links[currentPosition]);
				itemsList.push(item);
				if (progressbarPosition >= links.length * 0.05) {
					progressbarPosition = 0;
					console.log(thisProgressBar.update(currentPosition, links.length));
				}
				progressbarPosition++;
				currentPosition++;
			} catch (err) {
				console.log('\x1b[31m%s\x1b[0m', '/!\\Broken promise from getItems in getItems.js'), console.log(err);
			}
		}
		console.log(thisProgressBar.update(100, 100));
		resolve(itemsList);
	});
};

function getData(url) {
	var categoryPromise;
	var safeUrl = encodeURI(url);
	switch (true) {
		case /\b(weapons|armes)\b/gi.test(safeUrl):
			categoryPromise = gw.getWeapons(safeUrl);
			break;
		case /\b(equipment|equipements)\b/gi.test(safeUrl):
			categoryPromise = ge.getEquipments(safeUrl);
			break;
		case /\b(sets|panoplies)\b/gi.test(safeUrl):
			categoryPromise = gs.getSets(safeUrl);
			break;
		case /\b(mounts|montures)\b/gi.test(safeUrl):
			categoryPromise = gm.getMounts(safeUrl);
			break;
		case /\b(pets|familiers)\b/gi.test(safeUrl):
			categoryPromise = gp.getPets(safeUrl);
			break;
		case /\b(resources|ressources)\b/gi.test(safeUrl):
			categoryPromise = gr.getResources(safeUrl);
			break;
		case /\b(consumables|consommables)\b/gi.test(safeUrl):
			categoryPromise = gc.getConsumables(safeUrl);
			break;
    case /\b(monsters|monstres)\b/gi.test(safeUrl):
      categoryPromise = gmn.getMonsters(safeUrl);
      break;
		default:
			console.log('\x1b[31m%s\x1b[0m', 'Sorry, we are out of ' + url + '.');
	}
	return categoryPromise.then(function (item) {
		return item;
	}).catch(function (err) {
		if (err.statusCode == '404') {
			getItems(gCategory, gLinks, gGame);
		} else if (err.statusCode == '429') {
			resume.switchErrorHandler(err.statusCode, gCategory, currentPosition, gLinks, itemsList, gGame);
		} else if (err.code == 'ETIMEDOUT') {
			resume.switchErrorHandler(err.code, gCategory, currentPosition, gLinks, itemsList, gGame);
		} else if (err.message == 'Error: read ECONNRESET') {
			resume.switchErrorHandler(err.message, gCategory, currentPosition, gLinks, itemsList, gGame);
		} else if (err.message == 'Error: unable to verify the first certificate') {
			resume.switchErrorHandler(err.message, gCategory, currentPosition, gLinks, itemsList, gGame);
		} else {
			console.log(err);
			console.log('\x1b[31m%s\x1b[0m', '/!\\Broken promise all');
			resume.switchErrorHandler(err, gCategory, currentPosition, gLinks, itemsList, gGame);
		}
	});
}
var fs = require('fs');
var resume = require('./resume-crawler/resume');
var ge = require('./item-crawler/getEquipments');
var gw = require('./item-crawler/getWeapons');
var gs = require('./item-crawler/getSets');
var gm = require('./item-crawler/getMounts');
var gp = require('./item-crawler/getPets');
var gr = require('./item-crawler/getResources');
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
				wait(2000);
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
	switch (true) {
		case /\b(weapons|armes)\b/gi.test(url):
			categoryPromise = gw.getWeapons(url);
			break;
		case /\b(equipment|equipements)\b/gi.test(url):
			categoryPromise = ge.getEquipments(url);
			break;
		case /\b(sets|panoplies)\b/gi.test(url):
			categoryPromise = gs.getSets(url);
			break;
		case /\b(mounts|montures)\b/gi.test(url):
			categoryPromise = gm.getMounts(url);
			break;
		case /\b(pets|familiers)\b/gi.test(url):
			categoryPromise = gp.getPets(url);
			break;
		case /\b(resources|ressources)\b/gi.test(url):
			categoryPromise = gr.getResources(url);
			break;
		case /\b(consumables|consommables)\b/gi.test(url):
			categoryPromise = gc.getConsumables(url);
			break;
		default:
			console.log('\x1b[31m%s\x1b[0m', 'From getItems : Sorry, we are out of ' + url + '.');
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

function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}
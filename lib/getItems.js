const fs = require('fs');
const resume = require('./resume-crawler/resume');
const ge = require('./item-crawler/getEquipments');
const gw = require('./item-crawler/getWeapons');
const gs = require('./item-crawler/getSets');
const gm = require('./item-crawler/getMounts');
const gp = require('./item-crawler/getPets');
const gr = require('./item-crawler/getResources');
const gmn = require('./item-crawler/getMonsters');
const gc = require('./item-crawler/getConsumables');
const gpr = require('./item-crawler/getProfessions');
const gh = require('./item-crawler/getHarnesses');
const gcl = require('./item-crawler/getClasse');

const CLI = require('clui'), Progress = CLI.Progress;

let currentPosition = 0, progressbarPosition = 0;
let itemsList = [];
let gCategory, gLinks, gGame;
const thisProgressBar = new Progress(20);

const getItems = exports.getItems = function (category, links, game) {
	gGame = game, gCategory = category, gLinks = links;
	if (currentPosition == 0 && fs.existsSync('./data/links/resume.json')) {
		const itemsResumed = JSON.parse(fs.readFileSync('./data/' + game + '/' + category + '.json', 'utf8'));
		itemsList = itemsResumed;
	}
	return new Promise(async function (resolve, reject) {
		while (currentPosition < links.length) {
			try {
				wait(2000); // Limitation bypassed by this delay per request
				const item = await getData(links[currentPosition]);
				if (item !== null && typeof item !== 'undefined') itemsList.push(item); // To avoid adding an null/undefined item
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
	let categoryPromise;
	url = encodeURI(url);

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
	case /\b(professions|metiers)\b/gi.test(url):
		categoryPromise = gpr.getProfessions(url);
		break;
	case /\b(monsters|monstres)\b/gi.test(url):
		categoryPromise = gmn.getMonsters(url);
		break;
	case /\b(harnesses|harnachements)\b/gi.test(url):
		categoryPromise = gh.getHarnesses(url);
		break;
	case /\b(classe|classes)\b/gi.test(url):
		categoryPromise = gcl.getClasse(url);
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
	const d = new Date();
	let d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}

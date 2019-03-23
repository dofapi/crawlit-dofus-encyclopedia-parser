const fs = require('fs');
const resume = require('./resume-crawler/resume');
const getters = require('./conf/getters.conf');
const gItemList = require('./conf/items.conf.json');

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

	for (let i = 0; i < gItemList.categories.french.length; i++) {

		let category = gItemList.categories.english[i] === "equipment" ? "equipments" : gItemList.categories.english[i];
		let regex = new RegExp("\\b(" + gItemList.categories.english[i] + "|" + gItemList.categories.french[i] + ")\\b");
		let methodCategory = "get" + uppercaseFirstLetter(category);
		if (regex.test(url)) {
			categoryPromise = window["getters"][methodCategory][methodCategory](url);
			// categoryPromise = "getters." + methodCategory + "." + methodCategory + "(" + url + ")";
		}
		// console.log(categoryPromise);
	}
	// process.exit();
	if (categoryPromise === null || typeof (categoryPromise) == "undefined") console.log('\x1b[31m%s\x1b[0m', 'From getItems : Sorry, we are out of ' + url + '.'), process.exit();

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

function uppercaseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
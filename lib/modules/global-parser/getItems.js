const fs = require('fs');
import errorHandler from '../../services/errorHandler';
import { wait } from '../../services/utils';
import saveDataProgression from '../category-parsers/services/parser-backup';
import gItemList from '../../conf/items.conf';
import { Progress } from 'clui';

let currentPosition = 0, progressbarPosition = 0;
let itemsList = [];
let gCategory, gLinks, gGame;
const thisProgressBar = new Progress(20);

function getItems(category, links, game) {
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
	}).catch(err => new errorHandler(err));
}

function getData(url) {
	let categoryPromise;
	url = encodeURI(url);

	gItemList.categories.forEach(item => {
		try {
			const category = item.lang.en === 'equipment' ? 'equipments' : item.lang.en;
			const regex = new RegExp('\\b(' + category + '|' + item.lang.fr + ')\\b');
			if (regex.test(url)) categoryPromise = item.function(url);
		} catch (error) {
			new errorHandler(error);
		}
	});
	if (categoryPromise === null || typeof (categoryPromise) == 'undefined') console.log('\x1b[31m%s\x1b[0m', 'From getItems : Sorry, we are out of ' + url + '.'), process.exit();

	return categoryPromise.then(function (item) {
		return item;
	}).catch(function (err) {
		new errorHandler(err);
		if (err.statusCode == '404') getItems(gCategory, gLinks, gGame);
		else saveDataProgression(gCategory, currentPosition, gLinks, itemsList, gGame);
	});
}

export default getItems;
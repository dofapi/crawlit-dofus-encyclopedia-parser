import fs from 'fs';
import errorHandler from '../../services/errorHandler';
import { wait } from '../../services/utils';
import saveDataProgression from './services/parser-backup';
import { Progress } from 'clui';
import { gameConfParserSwitcher } from './services/utils';

let currentPosition = 0, progressbarPosition = 0, itemsList = [], gCategory, gLinks, gGame;
const thisProgressBar = new Progress(20), PARSING_SPEED = 1000;

function getItems(category, links, game) {
	gGame = game, gCategory = category, gLinks = links;
	if (currentPosition == 0 && fs.existsSync('./data/links/resume.json')) {
		const itemsResumed = JSON.parse(fs.readFileSync('./data/' + game + '/' + category + '.json', 'utf8'));
		itemsList = itemsResumed;
	}
	return new Promise(async function (resolve, reject) {
		while (currentPosition < links.length) {
			try {
				wait(PARSING_SPEED); // Limitation bypassed by this delay per request
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

	// Game to load depends on cmdResponse from cli choices
	const gParserList = gameConfParserSwitcher(gGame);
	gParserList.categories.forEach(item => {
		try {
			const regex = new RegExp('\\b(' + item.lang.en + '|' + item.lang.fr + ')\\b');
			if (regex.test(url)) categoryPromise = item.function(url);
		} catch (error) {
			new errorHandler(error);
		}
	});
	if (categoryPromise === null || typeof (categoryPromise) == 'undefined') new errorHandler({ name: 'getItems', message: 'From getItems : Sorry, categoryPromise contain no parsing function' });

	return categoryPromise.then(function (item) {
		return item;
	}).catch(function (err) {
		if (err.statusCode == '404') return null;
		else saveDataProgression(gCategory, currentPosition, gLinks, itemsList, gGame);
		new errorHandler(err);
	});
}

export default getItems;
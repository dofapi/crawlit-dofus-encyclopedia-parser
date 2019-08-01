const request = require('request-promise-native');
import fs from 'fs';
import { writeFileSync } from '../../services/utils';
import getItems from './getItems';
import { gameUrlListSwitcher } from './services/utils';
import { Spinner } from 'clui';
import errorHandler from '../../services/errorHandler';
import { mongoImport, requestOpts, parseEachPageLinksClass, parseEachPageLinksSpell, maxItemControl } from './services/utils';

const NB_ITEM_PER_PAGE = 96;
const initData = {
	url: null,
	globalUrl: null,
	itemCategory: null,
	game: null,
	maxItem: null,
	all: true,
	links: [],
	$: null
};

/**
 * Function which initialize the parsing process (global var, urls, category to parse...)
 * @param {Object} cmdResponse response list returned from the interactive shell
 */
function parserInit(cmdResponse) {
	const countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
	countdown.start();

	initData.game = cmdResponse.game;
	initData.maxItem = cmdResponse.maxItem;
	initData.all = cmdResponse.all;
	initData.itemCategory = cmdResponse.category;
	initData.url = gameUrlListSwitcher(cmdResponse);
	initData.globalUrl = initData.url.substring(0, initData.url.indexOf('.com/') + 4);
	requestOpts.url = initData.url;
}

/**
 * Function responsible for fetching all item's links and put them in a file
 */
async function getPagesLinks() {
	initData.$ = await request(requestOpts).catch(err => new errorHandler(err));
	console.log(initData.maxItem);
	initData.maxItem = maxItemControl(initData); // In order to prevent from empty value of realMaxItem when there is only 1 page & to avoird overpassing real maxitem value

	if (initData.itemCategory == 'classe') {
		initData.links = initData.links.concat(parseEachPageLinksClass(initData));
	}
	else if (initData.itemCategory == 'spell') {
		const class_links = parseEachPageLinksClass(initData).map(url => {
			requestOpts.url = url;
			return request(requestOpts).catch(err => new errorHandler(err));
		});

		for (let i = 0 ; i < class_links.length ; i++) {
			const $ = await class_links[i];
			initData.links = initData.links.concat(
				parseEachPageLinksSpell(initData.globalUrl, $)
			);
		}

		initData.links = initData.links.slice(0, initData.maxItem);
	}
	else {
		const nbPageToParse = Math.ceil(initData.maxItem / NB_ITEM_PER_PAGE);
		for (let page = 1; page <= nbPageToParse; page++) {
			requestOpts.url = initData.url + '&page=' + page;
			const $ = await request(requestOpts).catch(err => new errorHandler(err));
			parseEachPageLinks($);
		}
	}

	writeFileSync('./data/links/' + initData.itemCategory + '_links.json', JSON.stringify(initData.links));
	console.log('DONE!')
	console.log('\x1b[36m%s\x1b[0m', '\n SUCCESS : all item(s) links crawled.');
	console.log('\x1b[36m%s\x1b[0m', '\n START of item(s) crawling.');
}

/**
 * Function which analize page per page (one at a time) items links and put them in an array (links[])
 * @param {String} $ html page to analize
 */
function parseEachPageLinks($) {
	$('tbody').find('tr').each(function (i, tr) {
		if (!initData.all) if (initData.links.length >= initData.maxItem) return false;
		const link = initData.globalUrl + $(this).find('td').eq(1).find('a').attr('href');
		initData.links.push(link);
	});
}

/**
 * Main parsing process which launch dedicated parsing function in term of categories
 * @param {String} category
 * @param {Array} links
 * @param {String} game
 * @returns
 */
async function parserProcess(category, links, game) {
	try {
		const items = await getItems(category, links, game);
		category = category.replace(/ /g, '');
		if (fs.existsSync('./data/links/resume.json')) fs.unlinkSync('./data/links/resume.json');
		if (fs.existsSync('./data/links/' + category + '_links.json')) fs.unlinkSync('./data/links/' + category + '_links.json');
		writeFileSync('./data/' + game + '/' + category + '.json', JSON.stringify(items, null, 4));
		mongoImport(category, game);
		return { 'numberItemParsed': items.length, 'categoryName': category };
	} catch (err) {
		new errorHandler(err);
	}
}

export { parserProcess, parserInit, getPagesLinks };

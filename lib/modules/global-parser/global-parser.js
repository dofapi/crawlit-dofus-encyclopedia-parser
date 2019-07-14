const request = require('request-promise-native');
import fs from 'fs';
import { writeFileSync } from '../../services/utils';
import getItems from './getItems';
import { gameUrlListSwitcher } from './services/utils';
import { Spinner } from 'clui';
import errorHandler from '../../services/errorHandler';
import { mongoImport, requestOpts } from './services/utils';

let url = null, globalUrl, itemCategory, game, maxItem = 1, all = true;
const NB_ITEM_PER_PAGE = 96, links = [];

/**
 * Function which initialize the parsing process (global var, urls, category to parse...)
 * @param {Object} cmdResponse response list returned from the interactive shell
 */
function parserInit(cmdResponse) {
	const countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
	countdown.start();

	game = cmdResponse.game;
	maxItem = cmdResponse.maxItem;
	all = cmdResponse.all;
	itemCategory = cmdResponse.category;
	url = gameUrlListSwitcher(cmdResponse);
	globalUrl = url.substring(0, url.indexOf('.com/') + 4);
	requestOpts.url = url;
}

/**
 * Function responsible for fetching all item's links and put them in a file
 */
async function getPagesLinks() {
	const $ = await request(requestOpts).catch(err => new errorHandler(err));
	// In order to prevent from empty value of realMaxItem when there is only 1 page
	const realMaxItem = Number($('div.ak-list-info > strong').text()) === 0 ? $('div.ak-container.ak-panel.main-object-list.ak-nocontentpadding tbody > tr').length : Number($('div.ak-list-info > strong').text());
	if (maxItem >= realMaxItem || all === true) maxItem = realMaxItem; // security line to avoid overpasing the real amont of items & to take care about 'all' value if true

	const nbPageToParse = Math.ceil(maxItem / NB_ITEM_PER_PAGE);
	for (let page = 1; page <= nbPageToParse; page++) {
		requestOpts.url = url + '&page=' + page;
		const $ = await request(requestOpts).catch(err => new errorHandler(err));
		parseEachPageLinks($);
	}
	writeFileSync('./data/links/' + itemCategory + '_links.json', JSON.stringify(links));
	console.log('\x1b[36m%s\x1b[0m', '\n SUCCESS : all item(s) links crawled.');
	console.log('\x1b[36m%s\x1b[0m', '\n START of item(s) crawling.');
}

/**
 * Function which analize page per page (one at a time) items links and put them in an array (links[])
 * @param {String} $ html page to analize
 */
function parseEachPageLinks($) {
	// warning, classe is not a classic encyclopedia
	if (itemCategory == 'classe') {
		$('.ak-content-sections').find('.ak-section').each(function (i, div) {
			if (!all) if (links.length >= maxItem) return false;
			const link = globalUrl + $(this).find('a').attr('href');
			links.push(link);
		});
	} else {
		$('tbody').find('tr').each(function (i, tr) {
			if (!all) if (links.length >= maxItem) return false;
			const link = globalUrl + $(this).find('td').eq(1).find('a').attr('href');
			links.push(link);
		});
	}
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
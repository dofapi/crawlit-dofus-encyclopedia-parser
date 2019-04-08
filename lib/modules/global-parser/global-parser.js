const request = require('request-promise-native');
import fs from 'fs';
import { writeFileSync } from '../../services/utils';
import getItems from './getItems';
import { gameUrlListSwicher } from './services/utils';
import { Spinner } from 'clui';
import errorHandler from '../../services/errorHandler';
import { mongoImport, requestOpts } from './services/utils';

let url, globalUrl, itemCategory, game, maxItem = 1, all = true;

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

function parserInit(cmdResponse) {
	const countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
	countdown.start();

	game = cmdResponse.game;
	maxItem = cmdResponse.maxItem;
	all = cmdResponse.all;
	itemCategory = cmdResponse.category;
	const urlList = gameUrlListSwicher(game);
	if (cmdResponse.language == 'french') {
		url = urlList.urlSwitcher(itemCategory);
	} else if (cmdResponse.language == 'english') {
		url = urlList.urlSwitcherEn(itemCategory);
	}
	globalUrl = url.substring(0, url.indexOf('.com/') + 4);
	requestOpts.url = url;
}

async function getPageLinks() {
	const $ = await request(requestOpts).catch(err => new errorHandler(err));
	const links = [];

	// warning, classe is not a classic encyclopedia
	if (itemCategory == 'classe') {
		$('.ak-content-sections').find('.ak-section').each(function (i, div) {
			if (!all) if (i >= maxItem) return false;
			const link = globalUrl + $(this).find('a').attr('href');
			links.push(link);
		});
	} else {
		$('tbody').find('tr').each(function (i, tr) {
			if (!all) if (i >= maxItem) return false;
			const link = globalUrl + $(this).find('td').eq(1).find('a').attr('href') + '?size=3000';
			links.push(link);
		});
	}

	writeFileSync('./data/links/' + itemCategory + '_links.json', JSON.stringify(links));
	console.log('\x1b[36m%s\x1b[0m', '\n SUCCESS : all item(s) links crawled.');
	console.log('\x1b[36m%s\x1b[0m', '\n START of item(s) crawling.');
}

export { parserProcess, parserInit, getPageLinks };
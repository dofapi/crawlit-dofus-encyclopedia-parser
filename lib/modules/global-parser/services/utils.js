import fs from 'fs';
import cheerio from 'cheerio';
import errorHandler from '../../../services/errorHandler';
import globalConf from '../../../conf/global.conf';
import { writeFileSync } from '../../../services/utils';

const requestOpts = {
	url: '',
	method: 'GET',
	transform: function (body) {
		return cheerio.load(body);
	}
};

/**
 * For mongo format import /!\
 */
function mongoImport(category, game) {
	try {
		let items = fs.readFileSync(process.cwd() + '/data/' + game + '/' + category + '.json', 'utf8');
		items = items.replace(/,{"_id"/g, '{"_id"');
		items = items.replace(/,null/g, '');
		items = items.replace(/[']/g, '\u2019'); // To replace single quote in description by unicode character
		items = items.replace(/[.]/g, '\u002e'); // To replace dot in description by unicode character
		items = items.substring(1, items.length - 1);
		writeFileSync(process.cwd() + '/data/' + game + '/mongo/' + category + '_mongo.json', items);
	} catch (error) {
		new errorHandler(error);
	}
}

/**
 * To choose a conf file corresponding to user's game choice
 * Game to load depends on cmdResponse from cli choices
 */
function gameConfParserSwitcher(game) {
	try {
		const parserList = globalConf.games[game] && globalConf.games[game].conf;
		if (!parserList) throw { name: 'gameConfParserSwitcher', message: 'No game corresponding to ' + game + ' in global.conf.js' };
		return parserList;
	} catch (error) {
		new errorHandler(error);
	}
}

/**
 * To choose a list url file corresponding to user's game choice
 * Game to load depends on cmdResponse from cli choices
 */
function gameUrlListSwitcher(cmdResponse) {
	try {
		const url = globalConf.games &&
			globalConf.games[cmdResponse.game] &&
			globalConf.games[cmdResponse.game].languages &&
			globalConf.games[cmdResponse.game].languages[cmdResponse.language] &&
			globalConf.games[cmdResponse.game].languages[cmdResponse.language][cmdResponse.category];

		if (!url) throw { name: 'gameUrlListSwitcher', message: 'No game corresponding in global.conf.js' };
		return url;
	} catch (error) {
		new errorHandler(error);
	}
}

/**
 * Because "Class" is not a generic category, we need a dedicated method to init it & parse it
 * @param {Object} init contain all init variable
 * @returns {Array} Return an array which contain links of all class
 */
function parseEachPageLinksClass(init) {
	const links = [];
	init.$('.ak-content-sections').find('.ak-section').each(function (i, div) {
		if (!init.all) if (links.length >= init.maxItem) return false;
		const link = init.globalUrl + init.$(this).find('a').attr('href');
		links.push(link);
	});

	return links;
}

/**
 * TODO
 */
function parseEachPageLinksSpell(globalUrl, $) {
	const links = [];

	$('.ak-spell a').each(function(i, a) {
		links.push(globalUrl + $(a).attr('href'));
	});

	return links;
}

/**
 * Security to take care of not overpass real maxItem value
 * @param {Object} init contain all init variable
 * @returns {Number} Return the real maxItem in case of overpassing the real value
 */
function maxItemControl(init) {
	if (init.itemCategory == 'classe') {
		const realMaxItem = Number(init.$('.ak-content-sections').find('.ak-section').length);
		if (init.maxItem >= realMaxItem || init.all === true) init.maxItem = realMaxItem; // security line to avoid overpasing the real amont of items & to take care about 'all' value if true
	}
	else if (init.itemCategory != 'spell') {
		const realMaxItem = Number(init.$('div.ak-list-info > strong').text()) === 0 ? init.$('tbody > tr').length : Number(init.$('div.ak-list-info > strong').text());
		if (init.maxItem >= realMaxItem || init.all === true) init.maxItem = realMaxItem; // security line to avoid overpasing the real amont of items & to take care about 'all' value if true
	}
	return init.maxItem;
}

export { mongoImport, requestOpts, gameConfParserSwitcher, gameUrlListSwitcher, parseEachPageLinksClass, parseEachPageLinksSpell, maxItemControl };

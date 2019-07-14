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

// For mongo format import /!\
function mongoImport(category, game) {
	try {
		let items = fs.readFileSync(process.cwd() + '/data/' + game + '/' + category + '.json', 'utf8');
		items = items.replace(/,{"_id"/g, '{"_id"');
		items = items.replace(/,null/g, '');
		items = items.substring(1, items.length - 1);
		writeFileSync(process.cwd() + '/data/' + game + '/mongo/' + category + '_mongo.json', items);
	} catch (error) {
		new errorHandler(error);
	}
}

// To choose a conf file corresponding to user's game choice
function gameConfParserSwitcher(game) {
	// Game to load depends on cmdResponse from cli choices
	try {
		const parserList = globalConf.games[game] && globalConf.games[game].conf;
		if (!parserList) throw { name: 'gameConfParserSwitcher', message: 'No game corresponding to ' + game + ' in global.conf.js' };
		return parserList;
	} catch (error) {
		new errorHandler(error);
	}
}

// To choose a conf file corresponding to user's game choice
function gameUrlListSwitcher(cmdResponse) {
	// Game to load depends on cmdResponse from cli choices
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

export { mongoImport, requestOpts, gameConfParserSwitcher, gameUrlListSwitcher };
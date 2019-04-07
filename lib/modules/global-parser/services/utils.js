import fs from 'fs';
import cheerio from 'cheerio';
import errorHandler from '../../../services/errorHandler';
import globalConf from '../../../conf/global.conf';

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
		fs.writeFileSync(process.cwd() + '/data/' + game + '/mongo/' + category + '_mongo.json', items);
	} catch (error) {
		new errorHandler(error);
	}
}

// To choose a conf file corresponding to user's game choice
function gameSwicher(game) {
	// Game to load depends on cmdResponse from cli choices
	let parserList = undefined;
	try {
		globalConf.games.forEach(gameConf => { if (game == gameConf.key) parserList = gameConf.conf; });
		if (!parserList) throw { name: 'gameSwitcherError', message: 'No game corresponding to ' + game + ' for ' + game + '.conf.js' };
	} catch (error) {
		new errorHandler(error);
	}
	return parserList;
}


export { mongoImport, requestOpts, gameSwicher };
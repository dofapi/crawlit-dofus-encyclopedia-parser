import * as fs from 'fs';
import * as fsPath from 'fs-path';
import cheerio from 'cheerio';
import errorHandler from '../../../services/errorHandler';

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
		fsPath.writeFileSync(process.cwd() + '/data/' + game + '/mongo/' + category + '_mongo.json', items);
	} catch (error) {
		new errorHandler(error);
	}
}

export { mongoImport, requestOpts };
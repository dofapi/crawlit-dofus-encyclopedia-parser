const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import Mount from '../models/mount.model';
import { effectParse, descriptionParse } from '../services/parser-helpers';

let body = '';

function getMounts(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Mount instance initializations with Item global structure ///////
		const mount = new Mount(descriptionParse(body, url));
		mount.level = 100;

		/// //// Effects & condtions parse ///////
		const $akContainer = $('div.ak-nocontentpadding').eq(1).find('div.row');

		if (typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-md-6').each(function (i, element) {
				const infoCategory = $(this).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				categorySwitch(mount, infoCategory, $(this).html());
			});
		}
		return mount;
	});
}

function characteristicParse(mount, body) {
	const $ = cheerio.load(body);
	$('div.ak-container.ak-panel').eq(0).find('div.ak-list-element').each(function (i, element) {
		const spanTxt = $(this).find('div.ak-title').find('span').text();
		$(this).find('div.ak-title').find('span').remove();
		const characteristic = $(this).find('div.ak-title').text().trim() + ' ' + spanTxt;
		const elt = characteristic.substring(0, characteristic.indexOf(':')).trim();
		const subElement = characteristic.substring(characteristic.indexOf(':') + 1, characteristic.length).trim();
		const groupeElement = { [elt]: subElement };
		mount.characteristic = groupeElement;
	});
}

function categorySwitch(mount, infoCategory, body) {
	switch (infoCategory) {
	case 'effets':
		mount.statistics = effectParse(body);
		break;
	case 'effects':
		mount.statistics = effectParse(body);
		break;
	case 'characteristics':
		characteristicParse(mount, body);
		break;
	case 'caracteristiques':
		characteristicParse(mount, body);
		break;
	default:
		console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}

export default getMounts;
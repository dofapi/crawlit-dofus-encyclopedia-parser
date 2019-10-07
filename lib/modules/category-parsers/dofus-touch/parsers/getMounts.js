const request = require('request-promise-native');
const cheerio = require('cheerio');
const { getId, getElement, getDate, sanatizer } = require('../services/format-helpers');
const { effectParse, recipeParse, descriptionParse } = require('../services/parser-helpers');

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
let item = {};
let body = '';

const getMounts = exports.getMounts = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Description parse ///////
		item = descriptionParse(body, url);
		item.lvl = 100;

		/// //// Tabs initializations ///////
		item['statistics'] = [];
		item['characteristics'] = [];

		/// //// Effects & condtions parse ///////
		const $akContainer = $('div.ak-nocontentpadding').eq(1).find('div.row');

		if (typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-md-6').each(function (i, element) {
				const infoCategory = $(this).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				categorySwitch(infoCategory, $(this).html());
			});
		}
		return item;
	});
};

function characteristicParse(body) {
	const $ = cheerio.load(body);
	$('div.ak-container.ak-panel').eq(0).find('div.ak-list-element').each(function (i, element) {
		const spanTxt = $(this).find('div.ak-title').find('span').text();
		$(this).find('div.ak-title').find('span').remove();
		const characteristics = $(this).find('div.ak-title').text().trim() + ' ' + spanTxt;
		const elt = characteristics.substring(0, characteristics.indexOf(':')).trim();
		const subElement = characteristics.substring(characteristics.indexOf(':') + 1, characteristics.length).trim();
		const groupeElement = { [elt]: subElement };
		item['characteristics'].push(groupeElement);
	});
}

function categorySwitch(infoCategory, body) {
	const $ = cheerio.load(body);
	switch (infoCategory) {
	case 'effets':
		item['statistics'] = effectParse(body);
		break;
	case 'effects':
		item['statistics'] = effectParse(body);
		break;
	case 'characteristics':
		characteristicParse(body);
		break;
	case 'caracteristiques':
		characteristicParse(body);
		break;
	default:
		console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}
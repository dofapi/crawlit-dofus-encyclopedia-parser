const request = require('request-promise');
const cheerio = require('cheerio');
const { getId, getElement, getDate, sanatizer } = require('./helpers');
const { effectParse, recipeParse, descriptionParse } = require('./parsing-service/helpers');

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
		item['stats'] = [];
		item['characteristic'] = [];

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
		const characteristic = $(this).find('div.ak-title').text().trim() + ' ' + spanTxt;
		const elt = characteristic.substring(0, characteristic.indexOf(':')).trim();
		const subElement = characteristic.substring(characteristic.indexOf(':') + 1, characteristic.length).trim();
		const groupeElement = { [elt]: subElement };
		item['characteristic'].push(groupeElement);
	});
}

function categorySwitch(infoCategory, body) {
	const $ = cheerio.load(body);
	switch (infoCategory) {
	case 'effets':
		item['stats'] = effectParse(body);
		break;
	case 'effects':
		item['stats'] = effectParse(body);
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
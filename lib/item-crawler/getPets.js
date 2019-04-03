const request = require('request-promise');
const cheerio = require('cheerio');
const { sanatizer } = require('./helpers');
const { effectParse, descriptionParse, statsRequest } = require('./parsing-service/helpers');

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
let item = {};
let body = '';

const getPets = exports.getPets = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(async function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Description parse ///////
		item = descriptionParse(body, url);

		/// //// Tabs initializations ///////
		item['stats'] = [];
		item['condition'] = [];
		item['maxstats'] = [];

		/// //// Effects & Condtions & Characteristics parse ///////
		const $akContainer = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel');
		if (!url.includes('dofus-touch')) item['stats'] = effectParse(await statsRequest(url)); // Because Dofus-Touch is using old static pet's stats

		if (typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-sm-6').each(function (i, element) {
				if ($(this).find('div.ak-container.ak-panel').eq(1).html() !== null) {
					categorySwitch($(this).find('div.ak-container.ak-panel').eq(1).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''), $(this).find('div.ak-container.ak-panel').eq(1).html());
				}
				const infoCategory = $(this).find('div.ak-container.ak-panel').eq(0).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				categorySwitch(infoCategory, $(this).html());
			});
		}
		return item;
	});
};

function conditionParse(body) {
	const $ = cheerio.load(body);
	let condition = $('div.ak-container.ak-panel').eq(0).find('div.ak-list-element').find('div.ak-title').remove('br').text().trim();
	condition = sanatizer(condition);
	let conditionTab = condition.split('et');
	conditionTab = conditionTab.map(function (string) {
		return sanatizer(string).trim();
	});
	item['condition'] = conditionTab;
}

function maxParse(body) {
	const $ = cheerio.load(body);
	$('div.ak-list-element').each(function (i, element) {
		const max = $(this).find('div.ak-title').text().trim();
		item['maxstats'].push(max);
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
	case 'effets maximum sous hormone':
		maxParse(body);
		break;
	case 'conditions':
		conditionParse(body);
		break;
	default:
		console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}
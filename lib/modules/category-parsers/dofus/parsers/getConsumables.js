const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import Consumable from '../models/consumable.model';
import { sanatizer } from '../services/format-helpers';
import { effectParse, recipeParse, descriptionParse } from '../services/parser-helpers';

let body = '';

function getConsumables(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Consumable instance initializations with Item global structure ///////
		const consumable = new Consumable(descriptionParse(body, url));

		/// //// Effects & condtions parse ///////
		const $akContainer = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel');
		if (typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-sm-6').each(function (i, element) {
				const infoCategory = $(this).find('div.ak-panel-title').text().trim().toLowerCase();
				categorySwitch(infoCategory, $(this).html());
			});
		}

		/// //// Recipes parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			consumable.recipe = recipeParse(body);
		}
		return consumable;
	});
}

function conditionParse(consumable, body) {
	const $ = cheerio.load(body);
	let condition = $('div.ak-container.ak-panel.no-padding').find('div.ak-list-element').find('div.ak-title').remove('br').text().trim();
	condition = sanatizer(condition);
	let conditionTab = condition.split('et');
	conditionTab = conditionTab.map(function (string) {
		return sanatizer(string).trim();
	});
	consumable.conditions = conditionTab;
}

function categorySwitch(consumable, infoCategory, body) {
	switch (infoCategory) {
	case 'effets':
		consumable.statistics = effectParse(body);
		break;
	case 'effects':
		consumable.statistics = effectParse(body);
		break;
	case 'conditions':
		conditionParse(body);
		break;
	default:
		console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}

export default getConsumables;
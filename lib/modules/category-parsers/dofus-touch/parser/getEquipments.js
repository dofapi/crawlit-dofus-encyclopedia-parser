const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import Equipment from '../model/equipment.model';
import { sanatizer } from '../services/format-helpers';
import { effectParse, recipeParse, descriptionParse } from '../services/parser-helpers';

let body = '';

function getEquipments(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Equipment instance initializations with Item global structure ///////
		const equipment = new Equipment(descriptionParse(body, url));

		/// //// Tabs initializations ///////
		equipment.setId = 0;

		/// //// Sets parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href') !== 'undefined') {
			equipment.setId = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href').replace(/\D/g, '');
		}

		/// //// Effects & condtions parse ///////
		const $akContainer = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel');
		if (typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-sm-6').each(function (i, element) {
				const infoCategory = $(this).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				categorySwitch(equipment, infoCategory, $(this).html());
			});
		}

		/// //// Recipes parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			equipment.recipe = recipeParse(body);
		}
		return equipment;
	});
}

function conditionParse(equipment, body) {
	const $ = cheerio.load(body);
	let condition = $('div.ak-container.ak-panel.no-padding').find('div.ak-list-element').find('div.ak-title').remove('br').text().trim();
	condition = sanatizer(condition);
	let conditionTab = condition.split('et');
	conditionTab = conditionTab.map(function (string) {
		return sanatizer(string).trim();
	});
	equipment.condition = conditionTab;
}

function categorySwitch(equipment, infoCategory, body) {
	const $ = cheerio.load(body);

	switch (infoCategory) {
	case 'effets':
		equipment.stats = effectParse(body);
		break;
	case 'effects':
		equipment.stats = effectParse(body);
		break;
	case 'conditions':
		conditionParse(equipment, body);
		break;
        // default:
        // 	console.log('From getEquipments : Sorry, there is no ' + infoCategory + '.');
	}
}

export default getEquipments;
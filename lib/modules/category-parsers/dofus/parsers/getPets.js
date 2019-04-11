const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import Pet from '../models/pet.model';
import { sanatizer } from '../services/format-helpers';
import { effectParse, statsRequest, descriptionParse } from '../services/parser-helpers';

let body = '';

function getPets(url) {
	requestOpts.url = url;
	return request(requestOpts).then(async function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Pet instance initializations with Item global structure ///////
		const pet = new Pet(descriptionParse(body, url));

		/// //// Effects & Condtions & Characteristics parse ///////
		const $akContainer = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel');
		pet.statistics = effectParse(await statsRequest(url));

		if (typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-sm-6').each(function (i, element) {
				if ($(this).find('div.ak-container.ak-panel').eq(1).html() !== null) {
					categorySwitch($(this).find('div.ak-container.ak-panel').eq(1).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''), $(this).find('div.ak-container.ak-panel').eq(1).html());
				}
				const infoCategory = $(this).find('div.ak-container.ak-panel').eq(0).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				categorySwitch(infoCategory, $(this).html());
			});
		}
		return pet;
	});
}

function conditionParse(pet, body) {
	const $ = cheerio.load(body);
	let condition = $('div.ak-container.ak-panel').eq(0).find('div.ak-list-element').find('div.ak-title').remove('br').text().trim();
	condition = sanatizer(condition);
	let conditionTab = condition.split('et');
	conditionTab = conditionTab.map(function (string) {
		return sanatizer(string).trim();
	});
	pet.conditions = conditionTab;
}

async function categorySwitch(pet, infoCategory, body) {
	switch (infoCategory) {
	case 'conditions':
		conditionParse(pet, body);
		break;
        // default:
        // 	console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}

export default getPets;
const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import Weapon from '../models/weapon.model';
import { sanatizer } from '../services/format-helpers';
import { effectParse, recipeParse, descriptionParse } from '../services/parser-helpers';

let body = '';

function getWeapons(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Weapon instance initializations with Item global structure ///////
		const weapon = new Weapon(descriptionParse(body, url));

		/// //// Sets parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href') !== 'undefined') {
			weapon.setId = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href').replace(/\D/g, '');
		}

		/// //// Effects & Condtions & Characteristics parse ///////
		const $akContainer = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel');
		if (typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-sm-6').each(function (i, element) {
				if ($(this).find('div.ak-container.ak-panel').eq(1).html() !== null) {
					categorySwitch($(this).find('div.ak-container.ak-panel').eq(1).find('div.ak-panel-title').text().trim().toLowerCase(), $(this).find('div.ak-container.ak-panel').eq(1).html());
				}
				const infoCategory = $(this).find('div.ak-container.ak-panel').eq(0).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				categorySwitch(weapon, infoCategory, $(this).html());
			});
		}

		/// //// Recipes parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			weapon.recipe = recipeParse(body);
		}
		return weapon;
	});
}

function conditionParse(weapon, body) {
	const $ = cheerio.load(body);
	let condition = $('div.ak-panel-content').find('div.ak-list-element').find('div.ak-title').remove('br').text().trim();
	condition = sanatizer(condition);
	let conditionTab = condition.split('et');
	conditionTab = conditionTab.map(function (string) {
		return sanatizer(string).trim();
	});
	weapon.conditions = conditionTab;
}

function characteristicParse(weapon, body) {
	const $ = cheerio.load(body);
	$('div.ak-container.ak-panel.no-padding').eq(0).find('div.ak-list-element').each(function (i, element) {
		const spanTxt = $(this).find('div.ak-title').find('span').text();
		$(this).find('div.ak-title').find('span').remove();
		const characteristic = $(this).find('div.ak-title').text().trim() + ' ' + spanTxt;
		const elt = characteristic.substring(0, characteristic.indexOf(':')).trim();
		const subElement = characteristic.substring(characteristic.indexOf(':') + 1, characteristic.length).trim();
		const groupeElement = { [elt]: subElement };
		weapon.characteristic = groupeElement;
	});
}

function categorySwitch(weapon, infoCategory, body) {
	switch (infoCategory) {
	case 'effets':
		weapon.statistics = effectParse(body);
		break;
	case 'effects':
		weapon.statistics = effectParse(body);
		break;
	case 'characteristics':
		characteristicParse(weapon, body);
		break;
	case 'caracteristiques':
		characteristicParse(weapon, body);
		break;
	case 'conditions':
		conditionParse(weapon, body);
		break;
        // default:
        // 	console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}

export default getWeapons;
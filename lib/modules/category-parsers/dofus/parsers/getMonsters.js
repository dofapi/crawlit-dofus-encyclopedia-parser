const request = require('request-promise-native');
import requestOpts from '../services/utils';
import Monster from '../models/monster.model';
import { getElement, getId } from '../services/format-helpers';
import { monsterParse } from '../services/parser-helpers';

let body = '';

function getMonsters(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Monster instance initializations with Item global structure ///////
		const monster = new Monster(monsterParse(body, url));

		/// //// Stats and resistances parse ///////
		$('div.ak-encyclo-detail-right').find('div.ak-container.ak-panel').each(function (i, element) {
			const stat = $(this).find('div.ak-panel-title').text().trim();
			const statToTest = stat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			/// //// Stats parse ///////
			let groupeElement;
			const statistics = [];
			if (statToTest.includes('caracteristiques') || statToTest.includes('characteristics')) {
				$(this).find('div.ak-list-element').each(function (i, elt) {
					const stat = $(this).find('div.ak-title').text().trim();
					let element = getElement(stat);
					element = element.charAt(0).toUpperCase() + element.slice(1);
					element = element.split(':')[0].trim();
					const numbers = [];
					stat.replace(/(-?\d[\d\.]*)/g, function (x) {
						const n = Number(x); if (x == n) { numbers.push(x); }
					});
					if (typeof numbers[1] == 'undefined') groupeElement = { [element]: { 'min': Number(numbers[0]), 'max': null } };
					else groupeElement = { [element]: { 'min': Number(numbers[0]), 'max': Number(numbers[1]) } };
					statistics.push(groupeElement);
				});
				monster.statistics = statistics;
			}
			/// //// Resistances parse ///////
			if (statToTest.includes('résistances') || statToTest.includes('resistances')) {
				const resistances = [];
				$(this).find('div.ak-list-element').each(function (i, elt) {
					const stat = $(this).find('div.ak-title').text().trim();
					let element = getElement(stat);
					element = element.charAt(0).toUpperCase() + element.slice(1);
					element = element.split(':')[0].trim();
					const numbers = [];
					stat.replace(/(-?\d[\d\.]*)/g, function (x) {
						const n = Number(x); if (x == n) { numbers.push(x); }
					});
					if (typeof numbers[1] == 'undefined') groupeElement = { [element]: { 'min': Number(numbers[0]), 'max': null } };
					else groupeElement = { [element]: { 'min': Number(numbers[0]), 'max': Number(numbers[1]) } };
					resistances.push(groupeElement);
				});
				monster.resistances = resistances;
			}
		});

		/// //// Areas and drops parse ///////
		$('div.ak-container.ak-panel').each(function (i, elt) {
			const drops = [];
			const stat = $(this).find('div.ak-panel-title').text().trim();
			const statToTest = stat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			/// //// Areas parse ///////
			if (statToTest.includes('zones') || statToTest.includes('areas')) {
				monster.areas = $(this).find('div.ak-panel-content').text().trim().split(', ');
			}
			/// //// Drops parse ///////
			if (statToTest.includes('butins') || statToTest.includes('drops')) {
				$(this).find('div.ak-container.ak-content-list.ak-displaymode-image-col').find('div.ak-list-element').each(function (i, element) {
					const imgUrl = $(this).find('div.ak-image').find('img').attr('src');
					let dropUrl = $(this).find('a').attr('href');
					let id = null;
					if (dropUrl !== undefined) {
						id = getId(dropUrl);
						dropUrl = 'https://www.dofus.com' + dropUrl;
					}
					else {
						id = null;
						dropUrl = null;
					}
					const name = $(this).find('div.ak-content').find('div.ak-title').text().trim();
					let dropPercent = $(this).find('div.ak-text').find('div.ak-drop-percent').text().trim().split(' - ');
					if (dropPercent[1] == undefined) {
						dropPercent[0] = dropPercent[0].substring(0, dropPercent[0].length - 2);
						dropPercent = { 'min': Number(dropPercent[0]), 'max': null };
					}
					else {
						dropPercent[1] = dropPercent[1].substring(0, dropPercent[1].length - 2);
						dropPercent = { 'min': Number(dropPercent[0]), 'max': Number(dropPercent[1]) };
					}
					drops.push({ 'ankamaId': id, 'url': dropUrl, 'imgUrl': imgUrl, 'name': name, 'dropPercent': dropPercent });
				});
				
				if(monster.drops == undefined) {
					monster.drops = drops;
				} else {
					monster.drops.push(drops);
				}
			}
		});

		return monster;
	});
}

export default getMonsters;
const request = require('request-promise');
const cheerio = require('cheerio');
const { getId, getElement, getDate, sanatizer } = require('./helpers');
const { effectParse, recipeParse, descriptionParse, monsterParse } = require('./parsing-service/helpers');

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
let item = {};
let body = '';

const getMonsters = exports.getMonsters = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Monster parse ///////
		item = monsterParse(body, url);

		/// //// Tabs initializations ///////
		item['stats'] = [];
		item['resistances'] = [];
		item['areas'] = [];
		item['drops'] = [];

		/// //// Stats and resistances parse ///////
		$('div.ak-encyclo-detail-right').find('div.ak-container.ak-panel').each(function (i, element) {
			const stat = $(this).find('div.ak-panel-title').text().trim();
			const statToTest = stat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			/// //// Stats parse ///////
			let groupeElement;
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
					if (typeof numbers[1] == 'undefined') groupeElement = { [element]: { 'from': numbers[0] } };
					else groupeElement = { [element]: { 'from': numbers[0], 'to': numbers[1] } };
					item['stats'].push(groupeElement);
				});
			}
			/// //// Resistances parse ///////
			if (statToTest.includes('résistances') || statToTest.includes('resistances')) {
				$(this).find('div.ak-list-element').each(function (i, elt) {
					const stat = $(this).find('div.ak-title').text().trim();
					let element = getElement(stat);
					element = element.charAt(0).toUpperCase() + element.slice(1);
					element = element.split(':')[0].trim();
					const numbers = [];
					stat.replace(/(-?\d[\d\.]*)/g, function (x) {
						const n = Number(x); if (x == n) { numbers.push(x); }
					});
					if (typeof numbers[1] == 'undefined') groupeElement = { [element]: { 'from': numbers[0] } };
					else groupeElement = { [element]: { 'from': numbers[0], 'to': numbers[1] } };
					item['resistances'].push(groupeElement);
				});
			}
		});

		/// //// Areas and drops parse ///////
		$('div.ak-container.ak-panel').each(function (i, elt) {
			const stat = $(this).find('div.ak-panel-title').text().trim();
			const statToTest = stat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			/// //// Areas parse ///////
			if (statToTest.includes('zones') || statToTest.includes('areas')) {
				item['areas'] = $(this).find('div.ak-panel-content').text().trim().split(', ');
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
						dropPercent = { 'from': dropPercent[0] };
					}
					else {
						dropPercent[1] = dropPercent[1].substring(0, dropPercent[1].length - 2);
						dropPercent = { 'from': dropPercent[0], 'to': dropPercent[1] };
					}
					item['drops'].push({ '_id': id, 'url': dropUrl, 'imgUrl': imgUrl, 'name': name, 'dropPercent': dropPercent });
				});
			}
		});

		return item;
	});
};

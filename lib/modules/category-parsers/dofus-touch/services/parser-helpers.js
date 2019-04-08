const request = require('request-promise-native');
import cheerio from 'cheerio';
import { getId, getElement, getDate, sanatizer } from './format-helpers';

const requestStatsOpts = {
	url: '',
	method: 'POST',
	headers: {
		'cache-control': 'no-cache',
		'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'x-pjax-container': '.ak-item-details-container',
		'x-pjax': 'true',
		'x-requested-with': 'XMLHttpRequest'
	},
	body: 'level=100&_pjax=.ak-item-details-container',
	transform: function (body) {
		return cheerio.load(body);
	}
};

module.exports = {
	effectParse: (body) => {
		const item = [];
		const $ = cheerio.load(body);
		$('div.ak-list-element').each(function (i, elt) {
			let groupeElement;
			let stat = $(this).find('div.ak-title').text().trim();
			const statToTest = stat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			if (statToTest.includes('title') || statToTest.includes('titre') || statToTest.includes('attitude') || statToTest.includes('emote') ||
                statToTest.includes('echangeable') || statToTest.includes('exchangeable') || statToTest.includes('lie au') || statToTest.includes('linked to')) {
				if (statToTest.includes('title') || statToTest.includes('titre')) item.push({ 'title': stat.split(':')[1].trim() });
				else if (statToTest.includes('attitude') || statToTest.includes('emote')) item.push({ 'emote': stat });
				else if (statToTest.includes('echangeable') || statToTest.includes('exchangeable')) item.push({ 'exchangeable': getDate(stat) });
				else if (statToTest.includes('lie au') || statToTest.includes('linked to')) item.push({ 'linked': true });
			} else {
				stat = $(this).find('div.ak-title').text().trim();
				let element = getElement(stat);
				element = element.charAt(0).toUpperCase() + element.slice(1);
				const numbers = [];
				stat.replace(/(-?\d[\d\.]*)/g, function (x) {
					const n = Number(x); if (x == n) { numbers.push(x); }
				});
				if (typeof numbers[1] == 'undefined') groupeElement = { [element]: { 'min': numbers[0], 'max': null } };
				else groupeElement = { [element]: { 'min': numbers[0], 'max': numbers[1] } };
				item.push(groupeElement);
			}
		});
		return item;
	},

	recipeParse: (body) => {
		const item = [];
		const $ = cheerio.load(body);
		$('div.ak-container.ak-panel.ak-crafts').find('div.ak-panel-content').find('div.ak-container.ak-content-list').find('div.ak-column').each(function (i, element) {
			const setUrl = 'https://www.dofus-touch.com' + $(this).find('div.ak-title').find('a').attr('href');
			const setId = $(this).find('div.ak-title').find('a').attr('href').replace(/\D/g, '');
			const setImage = $(this).find('div.ak-image').find('a').find('span.ak-linker').find('img').attr('src').replace('dofus/ng/img/../../../', '');
			const setQuantity = $(this).find('div.ak-front').text().replace(/\x/g, '').trim();
			const setName = $(this).find('div.ak-content').find('div.ak-title').find('a').find('span.ak-linker').text().trim();
			const setType = $(this).find('div.ak-content').find('div.ak-text').text().trim();
			const setlevel = $(this).find('div.ak-aside').text().replace(/\D/g, '').trim();

			const groupeElement = {
				[setName]: {
					'ankamaId': parseInt(setId, 10),
					'url': setUrl,
					'imgUrl': setImage,
					'type': setType,
					'level': parseInt(setlevel, 10),
					'quantity': parseInt(setQuantity, 10)
				}
			};
			item.push(groupeElement);
		});
		return item;
	},

	descriptionParse: (body, url) => {
		let type = null;
		let description = null;
		let level = null;
		const $ = cheerio.load(body);
		const itemId = getId(url);
		const $typeSelector = $('div.ak-encyclo-block-info').find('div.ak-encyclo-detail-type').find('span');
		if ($typeSelector.html() !== null) type = $typeSelector.text().trim();
		else type = $('div.ak-encyclo-detail-right').find('div.ak-encyclo-detail-type').text().trim().split(':')[1].trim();
		const name = $('h1.ak-return-link').text().trim();
		const $descriptor = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel').first().find('div.ak-panel-content');
		const $levelSelector = $('div.ak-encyclo-detail-right').find('div.ak-encyclo-detail-level.col-xs-6.text-right');
		if (typeof $descriptor !== 'undefined') description = $descriptor.text().trim(), description = sanatizer(description);
		if (typeof $levelSelector !== 'undefined') level = $levelSelector.text().trim().replace(/\D/g, '');
		const imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src').replace('dofus/ng/img/../../../', '');

		const item = {
			_id: null,
			ankamaId: itemId,
			name: name,
			type: type,
			imgUrl: imgUrl,
			url: url
		};
		if ($descriptor.html() !== null) item.description = description;
		if ($levelSelector.html() !== null) item.level = parseInt(level, 10);
		return item;
	},

	monsterParse: (body, url) => {
		let type = null;
		const $ = cheerio.load(body);
		const itemId = getId(url);
		const $typeSelector = $('div.ak-encyclo-block-info').find('div.ak-encyclo-detail-type').find('span');
		if ($typeSelector.html() !== null) type = $typeSelector.text().trim();
		else type = $('div.ak-encyclo-detail-right').find('div.ak-encyclo-detail-type').text().trim().split(':')[1].trim();
		const name = $('h1.ak-return-link').text().trim();
		let imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src');
		if (imgUrl == undefined) {
			imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('data-src');
		}
		if (imgUrl != undefined) {
			imgUrl = imgUrl.replace('dofus/ng/img/../../../', '');
		}
		const monstre = {
			_id: null,
			ankamaId: itemId,
			name: name,
			type: type,
			imgUrl: imgUrl,
			url: url
		};
		return monstre;
	},

	// Because of AJAX call with forms for pet's statistics
	statsRequest: async (url) => {
		requestStatsOpts.url = url;
		const $ = await request(requestStatsOpts);
		/// //// Local initialization ///////
		const body = $.html();
		// console.log(body);
		return body;
	},

	getCategoryType: (type) => {
		let glType = null;
		switch (true) {
		case /\b(chapeau|hat)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(cloak|cape)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(amulet|amulette)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(boots|bottes)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(ring|anneau)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(belt|ceinture)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(backpack|sac a dos)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(shield|bouclier)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(trophy|trophee)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(pet|familier)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\bdofus\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(objet d'apparat|ceremonial item)\b/gi.test(type):
			glType = 'equipments';
			break;
		case /\b(sword|epee)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(dagger|dague)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(axe|hache)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(bow|arc)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(hammer|marteau)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(pickaxe|pioche)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(scythe|faux)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(shovel|pelle)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(soul stone|pierre d'ame)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(staff|baton)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(tool|outil)\b/gi.test(type):
			glType = 'weapons';
			break;
		case /\b(wand|baguette)\b/gi.test(type):
			glType = 'weapons';
			break;
		default:
			console.log('\x1b[31m%s\x1b[0m', 'Sorry, we are out of ' + type + '.');
		}
		return glType;
	}
};

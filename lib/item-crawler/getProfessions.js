const request = require('request-promise');
const cheerio = require('cheerio');

const { getId, sanatizer } = require('./helpers');

const RECIPES = 'recipes';
const RECIPES_FR = 'recettes';
const HARVESTS = 'harvests';
const HARVESTS_FR = 'recoltes';

/**
 * Parse professions from Dofus encyclopedia
 * @param url {String} [Required]
 * @return {*}
 */
exports.getProfessions = function (url) {

	const requestOpts = {
		url: url,
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	const domain = getDomain(url);

	return request(requestOpts).then(function ($) {
		/* Global initializations */
		const body = $.html();

		// console.log(typeof body);

		/*  Profession standard values parse */
		const item = professionStandardParse(body, url);

		/* Tabs initializations */
		item[RECIPES] = [];
		item[HARVESTS] = [];

		/* Harvests & Recipes parse */
		const $akContainer = $('div.ak-container.ak-tabs-container');

		if (typeof $akContainer !== 'undefined') {
			$akContainer.find('ul.ak-container.nav.nav-tabs.ak-tabs>li').each(function (i, element) {
				categorySwitch(item, domain, $(this).eq(0).text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''), $akContainer.find('div.ak-container.ak-tabs-body.tab-content>div').eq(i).html());
			});
		}

		return item;
	});
};

/**
 * Extract domain from url
 * @example https://www.example.com from https://www.example.com/example.html
 * @param url {String} [Required]
 * @return {String}
 */
function getDomain(url) {
	const match = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/.exec(url);
	return match[0];
}

/**
 * Parse and define all standard values for a profession
 * @param body {String} [Required]
 * @param url {String} [Required]
 * @return {Object}
 */
function professionStandardParse(body, url) {
	const $ = cheerio.load(body);
	const item = {};

	const $akContainer = $('div.ak-container.ak-panel>div.ak-panel-content>div.row.ak-nocontentpadding');

	const itemId = getId(url);
	const name = $('h1.ak-return-link').text().trim();
	const imgUrl = $akContainer.find('img.img-responsive').attr('src').replace('img/../', '');

	const $descriptor = $akContainer.find('div.ak-panel-content>p');
	if (typeof $descriptor !== 'undefined') item.description = sanatizer($descriptor.text().trim());

	item._id = itemId;
	item.name = name;
	item.imgUrl = imgUrl;
	item.url = url;

	return item;
}

/**
 * Parse and define harvests and/or recipes for a profession
 * @param type {String} [Required]
 * @param profession {Object} [Required]
 * @param domain {String} [Required]
 * @param body {String} [Required]
 */
function professionTypeParse(type, profession, domain, body) {
	const $ = cheerio.load(body);
	const $tbody = $('tbody>tr');

	if (typeof $tbody !== 'undefined') {
		$tbody.each(function () {
			const item = {};
			$(this).find('td').each(function (index) {
				switch (index) {
				case 0:
					item.imgUrl = $(this).find('img').attr('src').replace('dofus/ng/img/../../../', '');
					break;
				case 1:
					const link = $(this).find('a');
					item.name = link.text().trim();
					item.url = domain + link.attr('href');
					item._id = getId(item.url);
					break;
				case 2:
					item.lvl = parseInt($(this).text().trim(), 10);
					break;
				case 3:
					item.location = $(this).text().trim().split(', ');
					break;
				}
			});
			profession[type].push(item);
		});
	}
}

/**
 * Choose the right path between harvests and recipes
 * @param item {Object} [Required]
 * @param domain {String} [Required]
 * @param infoCategory {String} [Required]
 * @param body {String} [Required]
 */
function categorySwitch(item, domain, infoCategory, body) {
	switch (infoCategory) {
	case HARVESTS_FR:
	case HARVESTS:
		professionTypeParse(HARVESTS, item, domain, body);
		break;
	case RECIPES_FR:
	case RECIPES:
		professionTypeParse(RECIPES, item, domain, body);
		break;
	}
}
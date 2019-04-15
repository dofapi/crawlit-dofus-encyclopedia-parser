const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import Idol from '../models/idol.model';
import { recipeParse, descriptionParse } from '../services/parser-helpers';

let body = '';

function getIdols(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		// Global initializations
		body = $.html();

		// Description parse
		// This functions doesn't return description for idols
		// but we can use it to initialize
		const idol = new Idol(descriptionParse(body, url));
		idol.level = Number($('.ak-encyclo-detail-level').text().replace(/^\D+/g, '').trim());

		parseIdolsUtils(idol, body);

		// Stat Parse
		idol.statistics = parseIdolsStat(body);

		// Recipe Parse
		if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			idol.recipe = recipeParse(body);
		}

		return idol;
	});
}

function parseIdolsUtils(idol, body) {
	const $ = cheerio.load(body);
	const $div = $('.ak-nocontentpadding')[1].children;
	for (let i = 0; i < $div.length; i++) {
		if ($div[i].type !== 'div') {
			$div.splice(i, 1);
		}
	}
	for (let i = 0; i < $div.length; i++) {
		for (let j = 0; j < $div[i].children.length; j++) {
			const $actual = $div[i].children[j];
			if ($actual.type == 'tag' && $actual.name == 'div' && $actual.attribs.class == 'ak-panel-content') {
				if (i == 0) {
					idol.description = $actual.children[0].data.replace(/\n/g, '');
				} else if (i == 2) {
					idol.spell = $actual.children[0].data.replace(/\n/g, '');
				}
			}
		}
	}
}

function parseIdolsStat(body) {
	const $ = cheerio.load(body);
	const stats = [];
	$('.ak-displaymode-col').find('div.ak-list-element').each(function (i, elem) {
		const str = $(this).find('.ak-title').text().replace(/\n/g, '');
		stats[stats.length] = {
			name: str.replace(/[0-9]/g, '').trim(),
			power: Number(str.replace(/^\D+/g, ''))
		};
	});
	return stats;
}

export default getIdols;

const request = require('request-promise-native');
const cheerio = require('cheerio');
const { getId } = require('../services/format-helpers');
const { effectParse, descriptionParse, getCategoryType } = require('../services/parser-helpers');

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
let set = {};
let body = '';

exports.getSets = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Description parse ///////
		set = descriptionParse(body, url);

		/// //// Tabs initializations ///////
		set['bonus'] = [];

		/// //// Linked Items parse ///////
		set['equipment_id'] = [];
		set['weapon_id'] = [];
		$('div.ak-container.ak-panel.ak-set-composition.ak-nocontentpadding').find('div.ak-panel-content').find('tr').each(function (i, element) {
			const id = getId($(this).find('td').eq(1).find('a').attr('href'));
			const glType = getCategoryType($(this).find('td').eq(1).find('div.ak-item-type-info').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
			switch (glType) {
			case 'equipments':
				set['equipment_id'].push(id);
				break;
			case 'weapons':
				set['weapon_id'].push(id);
				break;
			}
		});

		/// //// Bonus Set parse ///////
		$('div.ak-encyclo-detail-right').find('div.set-bonus-list').each(function (i, element) {
			const nbBonus = {
				number: i + 1,
				url: $(this).attr('href'),
				statistics: effectParse($(this).html())
			};
			set['bonus'].push(nbBonus);
		});
		return set;
	});
};
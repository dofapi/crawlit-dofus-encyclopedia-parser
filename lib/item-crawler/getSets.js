var request = require('request-promise');
var cheerio = require('cheerio');
var { getId, getElement, sanatizer } = require('./helpers');
var { effectParse, recipeParse, descriptionParse, getCategoryType } = require('./parsing-service/helpers');

var requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
var set = {};
var body = '';

var getSets = exports.getSets = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/////// Global initializations ///////
		body = $.html();

		/////// Description parse ///////
		set = descriptionParse(body, url);

		/////// Tabs initializations ///////
		set["bonus"] = [];

		/////// Linked Items parse ///////
		set['equipment_id'] = [];
		set['weapon_id'] = [];
		$('div.ak-container.ak-panel.ak-set-composition.ak-nocontentpadding').find('div.ak-panel-content').find('tr').each(function (i, element) {
			var id = getId($(this).find('td').eq(1).find('a').attr('href'));
			var glType = getCategoryType($(this).find('td').eq(1).find('div.ak-item-type-info').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
			set[glType].push(id);
		});
		// if (set['equipment_id'].length == 0) delete set['equipment_id'];
		// if (set['weapons'].length == 0) delete set['weapons'];

		/////// Bonus Set parse ///////
		$('div.ak-encyclo-detail-right').find('div.set-bonus-list').each(function (i, element) {
			var nbBonus = {
				number: i + 1,
				url: $(this).attr('href'),
				stats: effectParse($(this).html())
			}
			set["bonus"].push(nbBonus);
		});
		return set;
	});
}
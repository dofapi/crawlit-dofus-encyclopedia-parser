const request = require('request-promise-native');
import requestOpts from '../services/utils';
import Set from '../models/set.model';
import { getId } from '../services/format-helpers';
import { effectParse, getCategoryType, descriptionParse } from '../services/parser-helpers';

let body = '';

function getSets(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Set instance initializations with Item global structure ///////
		const set = new Set(descriptionParse(body, url));

		$('div.ak-container.ak-panel.ak-set-composition.ak-nocontentpadding').find('div.ak-panel-content').find('tr').each(function (i, element) {
			const id = getId($(this).find('td').eq(1).find('a').attr('href'));
			const glType = getCategoryType($(this).find('td').eq(1).find('div.ak-item-type-info').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
			switch (glType) {
			case 'equipments':
				set.equipment_id = id;
				break;
			case 'weapons':
				set.weapon_id = id;
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
			set.bonus = nbBonus;
		});
		return set;
	});
}

export default getSets;
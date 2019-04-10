const request = require('request-promise-native');
import requestOpts from '../services/utils';
import Harness from '../models/harness.model';
import { recipeParse, descriptionParse } from '../services/parser-helpers';

let body = '';

function getHarnesses(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Description parse ///////
		const harness = new Harness(descriptionParse(body, url));

		/// //// Recipes parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			harness.recipe = recipeParse(body);
		}
		return harness;
	});
}

export default getHarnesses;
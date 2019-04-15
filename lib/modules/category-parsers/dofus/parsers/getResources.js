const request = require('request-promise-native');
import requestOpts from '../services/utils';
import { recipeParse, descriptionParse } from '../services/parser-helpers';
import Resource from '../models/resource.model';

let body = '';

function getResources(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Resource instance initializations with Item global structure ///////
		const resource = new Resource(descriptionParse(body, url));

		/// //// Recipes parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			resource.recipe = recipeParse(body);
		}
		return resource;
	});
}

export default getResources;
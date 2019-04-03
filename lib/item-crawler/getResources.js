const request = require('request-promise');
const cheerio = require('cheerio');
const { effectParse, recipeParse, descriptionParse } = require('./parsing-service/helpers');

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
let item = {};
let body = '';

const getResources = exports.getResources = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/// //// Global initializations ///////
		body = $.html();

		/// //// Description parse ///////
		item = descriptionParse(body, url);

		/// //// Tabs initializations ///////
		item['recipe'] = [];

		/// //// Recipes parse ///////
		if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			item['recipe'] = recipeParse(body);
		}
		return item;
	});
};
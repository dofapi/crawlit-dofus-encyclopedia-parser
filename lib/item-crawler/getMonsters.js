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

		return item;
	});
};
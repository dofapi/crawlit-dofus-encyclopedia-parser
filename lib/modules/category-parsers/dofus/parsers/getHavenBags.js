import request from 'request-promise-native';
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import HavenBag from '../models/havenbag.model';
import { normalizeText } from '../services/format-helpers';
import { descriptionParse } from '../services/parser-helpers';

const tabMapping = {
	'meuble': parseFurnitures,
	'furniture': parseFurnitures,
	'decoration': parseDecors,
	'decor': parseDecors,
	'sol': parseGrounds,
	'ground': parseGrounds,
};

let body = '';

function getHavenBags(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		// Global initializations
		body = $.html();

		// Description parse
		// This functions doesn't return description for haven bags
		// but we can use it to initialize
		const havenBag = new HavenBag(descriptionParse(body, url));
		
		const $tabs = $('div.ak-havenbags-tabs').find('div.ak-tab');
		
		$tabs.each(function (i, element) {
			const tab = $(element);
			const tabId = tab.attr('id');

			const tabName = normalizeText($(body).find('a[href="#' + tabId + '"]').text());

			const tabFunction = typeof tabMapping[tabName] !== 'undefined' ? tabMapping[tabName] : null;

			if (tabFunction) {
				tabFunction(havenBag, tab);
			}
		});

		return havenBag;
	});
}

function parseFurnitures(havenBag, tabContainer) {
	havenBag.furnitures = extractFurnitures(tabContainer);
}

function parseDecors(havenBag, tabContainer) {
	havenBag.decors = extractFurnitures(tabContainer);
}

function parseGrounds(havenBag, tabContainer) {
	havenBag.grounds = extractFurnitures(tabContainer);
}

function extractFurnitures(tabContainer) {
	const furnitures = [];

	tabContainer.find('div.ak-furniture-container').each(function (i, element) {
		const $ = cheerio.load(tabContainer);
		const imgUrl = $(element).find('img').attr('src');

		furnitures.push(imgUrl);
	});

	return furnitures;
}

export default getHavenBags;


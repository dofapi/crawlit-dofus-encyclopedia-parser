const request = require('request-promise-native');
import requestOpts from '../services/utils';
import cheerio from 'cheerio';
import Class from '../model/class.model';

let body = '';

function getClasses(url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		// Global initializations
		body = $.html();

		/// //// Class instance initializations with Item global structure ///////
		const classEntity = new Class(classeParsingInit(body, url));

		// Role Parsing
		classEntity.role = roleParser(body);

		// Spell Parsing
		classEntity.spell = spellListParser(body);
		return classEntity;
	});
}

function classeParsingInit(body, url) {
	const $ = cheerio.load(body);
	const classeId = url.split('-')[0].replace(/^\D+/g, '');
	const name = url.split('-')[1].charAt(0).toUpperCase() + url.split('-')[1].slice(1);
	const imgUrl = $('.ak-entitylook').attr('src');
	const description = $('.ak-breed-description').text();
	return {
		_id: null,
		ankamaId: Number(classeId),
		name: name,
		type: 'classe',
		imgUrl: imgUrl,
		url: url,
		description: description
	};
}

function roleParser(body) {
	const $ = cheerio.load(body);
	const role = [];
	$('.ak-breed-roles-illu').find('span').each((i, elem) => {
		role[role.length] = elem.children[0].data;
	});
	return role;
}

function spellListParser(body) {
	const $ = cheerio.load(body);
	const spell = [];
	$('.ak-spell-list-row').each((i, div) => {
		let base = $(div).find('.ak-spell').not('.ak-variant').find('span').text();
		let variant = $(div).find('.ak-variant').find('span').text();
		base = base.split('\n');
		variant = variant.split('\n');
		if (base[0] == '') {
			base.splice(0, 1);
			variant.splice(0, 1);
		}
		for (let i = 0; i < base.length; i++) {
			spell[spell.length] = {
				name: base[i],
				variant: variant[i]
			};
		}
	});
	return spell;
}

export default getClasses;
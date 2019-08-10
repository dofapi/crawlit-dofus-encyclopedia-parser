const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import Class from '../models/class.model';
import { statsRequest } from '../services/parser-helpers';

async function getClasses(url) {
	requestOpts.url = url;
	const $ = await request(requestOpts);

	// Class instance initializations with Item global structure & Generic properties 
	const classEntity = new Class(classeParsingInit($, url));

	// Specific properties Parsing
	classEntity.roles = roleParser($);
	classEntity.spells = spellListParser($);
	classEntity.maleImg = $('.ak-entitylook').attr('src');
	classEntity.femaleImg = await cheerio.load(await statsRequest(url + '/1-F'))('img').attr('src');

	return classEntity;
}

function classeParsingInit($, url) {
	const classeId = url.split('-')[0].replace(/^\D+/g, '');
	const name = url.split('-')[1].charAt(0).toUpperCase() + url.split('-')[1].slice(1);
	const description = $('.ak-breed-description').text();
	return {
		_id: null,
		ankamaId: Number(classeId),
		name: name,
		type: 'classe',
		url: url,
		description: description
	};
}

function roleParser($) {
	const role = [];
	$('.ak-breed-roles-illu').find('span').each((i, elem) => {
		role[role.length] = elem.children[0].data;
	});
	return role;
}

function spellListParser($) {
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
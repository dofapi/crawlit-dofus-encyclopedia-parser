const request = require('request-promise-native');
import cheerio from 'cheerio';
import requestOpts from '../services/utils';
import { getQueryString } from '../../../../services/utils';
import Spell from '../models/spell.model';
import { statsRequest } from '../services/parser-helpers';

async function getSpells(url) {
	requestOpts.url = url;
	const $ = await request(requestOpts);
	const queryString = getQueryString(url);
	const level = parseInt(queryString['level']);

	if (!levelExists($, level))
		return null;

	const spellEntity = new Spell(spellParsingInit($, url));
	spellEntity.caracs.pa = parsePa($);
	spellEntity.caracs.po = parsePo($);
	spellEntity.required_level = parseRequiredLevel($);
	spellEntity.imgUrl = $('.ak-spell-details-illu img').attr('src');
	updateCaracs($, spellEntity.caracs);
	return spellEntity;
}

function levelExists($, level) {
	return $('.ak-spell-details-level-selector a').length >= level;
}

function spellParsingInit($, url) {
	const name = $('.ak-spell-name').text().split('\n')[1];
	const queryString = getQueryString(url);

	return {
		_id: null,
		ankamaId: queryString.id,
		name: name,
		type: 'spell',
		level: parseInt(queryString.level),
		url: url,
		description: $('.ak-spell-description').text()
	};
}

function parsePa($) {
	return parseInt($('.ak-spell-po-pa').text().split('/')[1].split('PA')[0]);
}

function parsePo($) {
	let range = $('.ak-spell-po-pa')
		.text()
		.split('/')[0]
		.split('PO')[0]
		.split('-')
		.map(x => parseInt(x));

	if (range.length == 1)
		range = [0, range[0]];

	return range;
}

function parseRequiredLevel($) {
	return parseInt($('.ak-spell-details-level .ak-selected').text());
}

const caracsConf = {
	'Probabilité de coup critique': [
		'critical',
		x => parseInt(x.split('%')[0])
	],
	'Nb. de tours entre deux lancers': ['cooldown', parseInt],
	'Nb. de lancers par tour': ['per_turn_cast', parseInt],
	'Nb. de lancers par tour par joueur': ['per_player_turn_cast', parseInt],
	'Portée modifiable': ['changeable_range', x => x == 'Oui'],
	'Ligne de vue': ['line_of_sight', x => x == 'Oui'],
	'Lancer en ligne': ['line_cast', x => x == 'Oui'],
	'Cellules libres': ['free_cell', x => x == 'Oui'],
	'Zone d\'effet': ['zone', x => x],
};

function updateCaracs($, caracs) {
	$('.ak-spell-details-other .ak-main-content').each((i, div) => {
		const title = $(div).find('.ak-title').text().trim();
		
		if (caracsConf[title]) {
			const key = caracsConf[title][0];
			const val = caracsConf[title][1]($(div).find('.ak-aside,.ak-text').text().trim());
			caracs[key] = val;
		}
		else {
			console.log(`No reference for title '${title}'`);
		}
	})
}

export default getSpells;

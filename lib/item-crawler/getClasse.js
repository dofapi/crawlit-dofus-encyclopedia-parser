const request = require('request-promise');
const cheerio = require('cheerio');
const { getId, getElement, getDate, sanatizer } = require('./helpers');
const { effectParse, recipeParse, descriptionParse } = require('./parsing-service/helpers');

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
let item = {};
let body = '';

const getClasse = exports.getClasse = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		// Global initializations
		body = $.html();

		// Parsing Initializations
		item = classeParsingInit(body, url);

    // Tabs initializations //
		item['role'] = [];
		item['spell'] = [];

    // Role Parsing
    item['role'] = roleParser(body);

		// Spell Parsing
    item['spell'] = spellListParser(body);
		return item;
	});
};

function classeParsingInit(body, url) {
  const $ = cheerio.load(body);
  const classeId = url.split('-')[0].replace( /^\D+/g, '');
  const name = url.split('-')[1].charAt(0).toUpperCase() + url.split('-')[1].slice(1);
  const imgUrl = $('.ak-entitylook').attr('src');
  const description = $('.ak-breed-description').text();
  return {
    _id: Number(classeId),
    name: name,
    type: 'classe',
    imgUrl: imgUrl,
    url: url,
    description: description
  };
}

function roleParser(body) {
  const $ = cheerio.load(body);
  let role = [];
  $('.ak-breed-roles-illu').find('span').each((i, elem) => {
    role[role.length] = elem.children[0].data;
  });
  return role;
}

function spellListParser(body) {
  const $ = cheerio.load(body);
  let spell = [];
  $('.ak-spell-list-row').each((i, div) => {
    let base = $(div).find('.ak-spell').not('.ak-variant').find('span').text();
    let variant = $(div).find('.ak-variant').find('span').text();
    base = base.split('\n');
    variant = variant.split('\n');
    if (base[0] == '') {
      base.splice(0, 1);
      variant.splice(0, 1);
    }
    for (var i = 0; i < base.length; i++) {
      spell[spell.length] = {
        name: base[i],
        variant: variant[i]
      }
    }
  })
  return spell;
}

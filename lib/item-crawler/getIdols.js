const request = require('request-promise');
const cheerio = require('cheerio');
const { recipeParse, descriptionParse } = require('./parsing-service/helpers');

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};
let item = {};
let body = '';

const getIdols = exports.getIdols = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		// Global initializations
		body = $.html();

		// Description parse
    // This functions doesn't return description for idols
    // but we can use it to initialize
		item = descriptionParse(body, url);
    parseIdolsUtils(body);

		// Tabs initializations
		item['stats'] = [];
		item['recipe'] = [];

    // Stat Parse
		parseIdolsStat(body);

    // Recipe Parse
    if (typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
			item['recipe'] = recipeParse(body);
		}

		return item;
	});
};

function parseIdolsUtils(body) {
  const $ = cheerio.load(body);
  let $div = $('.ak-nocontentpadding')[1].children;
  for (var i = 0; i < $div.length; i++) {
    if ($div[i].type !== 'div') {
      $div.splice(i, 1);
    }
  }
  for (var i = 0; i < $div.length; i++) {
    for (var j = 0; j < $div[i].children.length; j++) {
      const $actual = $div[i].children[j];
      if ($actual.type == 'tag' && $actual.name == 'div' && $actual.attribs.class == 'ak-panel-content') {

        if (i == 0) {
          item.description = $actual.children[0].data.replace(/\n/g, '');
        } else if (i == 2) {
          item.spell = $actual.children[0].data.replace(/\n/g, '');
        }
      }
    }
  }
}

function parseIdolsStat(body) {
	const $ = cheerio.load(body);
	$('.ak-displaymode-col').find('div.ak-list-element').each(function (i, elem) {
		const str = $(this).find('.ak-title').text().replace(/\n/g, '');
		item.stats[item.stats.length] = {
			name: str.replace(/[0-9]/g, ''),
			power: Number(str.replace( /^\D+/g, ''))
		};
	});
}

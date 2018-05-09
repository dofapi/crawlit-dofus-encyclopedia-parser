var request = require('request-promise');
var cheerio = require('cheerio');
var { getId, getElement, getDate, sanatizer } = require('./helpers');
var { effectParse, recipeParse, descriptionParse } = require('./parsing-service/helpers');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};
var item = {};
var body = '';

var getMounts = exports.getMounts = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/////// Global initializations ///////
		body = $.html();

		/////// Description parse ///////
		item = descriptionParse(body, url);
		item.lvl = 60;

		/////// Tabs initializations ///////
		item["stats"] = [];
		item["characteristic"] = [];

		/////// Effects & condtions parse ///////
		var $akContainer = $('div.ak-rides-details').eq(0).find('div.row');
		if(typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-md-6').each(function(i, element){
				var infoCategory = $(this).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
				categorySwitch(infoCategory, $(this).html());
			});
		}
		return item;
	});
}

function characteristicParse(body) {
	var $ = cheerio.load(body);
	$('div.ak-container.ak-panel').eq(0).find('div.ak-list-element').each(function(i, element){	
		var spanTxt = $(this).find( "div.ak-title" ).find("span").text();
		$(this).find( "div.ak-title" ).find("span").remove();
		var characteristic = $(this).find( "div.ak-title" ).text().trim() + ' ' + spanTxt;
		var element = characteristic.substring(0, characteristic.indexOf(":")).trim();
		var subElement = characteristic.substring(characteristic.indexOf(":")+1, characteristic.length).trim();
		var groupeElement = {[element]: subElement};
		item["characteristic"].push(groupeElement);
	});
}

function categorySwitch(infoCategory, body) {
	var $ = cheerio.load(body);
	switch (infoCategory) {
	    case 'effets':
	      item["stats"] = effectParse(body);
	      break;
	    case 'effects':
	      item["stats"] = effectParse(body);
	      break;
	    case 'characteristics':
	      characteristicParse(body);
	      break;
	    case 'caracteristiques':
	      characteristicParse(body);
	      break;
	      console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}
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

var getWeapons = exports.getWeapons = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		/////// Global initializations ///////
		body = $.html();

		/////// Description parse ///////
		item = descriptionParse(body, url);

		/////// Tabs initializations ///////
		item["stats"] = [];
		item["characteristic"] = [];
		item["condition"] = [];
		item["recipe"] = [];
		item["set"] = [];

		/////// Sets parse ///////
		if(typeof $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href') !== 'undefined') {
			var setId = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href').replace(/\D/g,'');
			item.set = setId;
		}

		/////// Effects & Condtions & Characteristics parse ///////
		var $akContainer = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel');
		if(typeof $akContainer.eq(1) !== 'undefined') {
			$akContainer.eq(1).find('div.col-sm-6').each(function(i, element){
				if($(this).find('div.ak-container.ak-panel').eq(1).html() !== null) {
					categorySwitch($(this).find('div.ak-container.ak-panel').eq(1).find('div.ak-panel-title').text().trim().toLowerCase(), $(this).find('div.ak-container.ak-panel').eq(1).html());
				}
				var infoCategory = $(this).find('div.ak-container.ak-panel').eq(0).find('div.ak-panel-title').text().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
				categorySwitch(infoCategory, $(this).html());
			});
		}

		/////// Recipes parse ///////
        if(typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
            item["recipe"] = recipeParse(body);;
        }

		return item;
	});
}

function conditionParse(body) {
	var $ = cheerio.load(body);
	var condition = $('div.ak-panel-content').find('div.ak-list-element').find( "div.ak-title" ).remove("br").text().trim();
	condition = sanatizer(condition);
	var conditionTab = condition.split('et');
	conditionTab = conditionTab.map(function(string) {
  		return sanatizer(string).trim();
	});
	item["condition"] = conditionTab;
}

function characteristicParse(body) {
	var $ = cheerio.load(body);
	$('div.ak-container.ak-panel.no-padding').eq(0).find('div.ak-list-element').each(function(i, element){	
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
	    case 'conditions':
	      conditionParse(body);
	      break;  
	      console.log('Sorry, we are out of ' + infoCategory + '.');
	}
}
var request = require('request-promise');
var cheerio = require('cheerio');
var { getId, getElement, getDate, sanatizer } = require('./helpers');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};
var item = {};

var getEquipments = exports.getEquipments = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {

		/////// Description parse ///////
		var body = $.html();
		descriptionParse(body, url);

		/////// Tabs initializations ///////
		item["stats"] = [];
		item["condition"] = [];
		item["recipe"] = [];
		item["set"] = [];

		/////// Sets parse ///////
		if(typeof $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href') !== 'undefined') {
			var setId = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href').replace(/\D/g,'');
			item.set = setId;
		}

		/////// Effects & condtions parse ///////
		if(typeof $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel').eq(1) !== 'undefined') {
			$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel').eq(1).find('div.col-sm-6').each(function(i, element){
				var infoCategory = $(this).find('div.ak-panel-title').text().trim().toLowerCase();
				console.log(infoCategory);
				switch (infoCategory) {
				    case 'effets':
				      effectParse($(this).html());
				      break;
				    case 'effects':
				      effectParse($(this).html());
				      break;
				    case 'conditions':
				      conditionParse($(this).html());
				      break;
				      console.log('Sorry, we are out of ' + infoCategory + '.');
				}
			});
		}

		/////// Recipes parse ///////
        if(typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
        	var body = $.html();
            recipeParse(body);
        }
		return item;
	});
}

function effectParse(body) {
	var $ = cheerio.load(body);
	$('div.ak-list-element').each(function(i, element){
		var stat = $(this).find( "div.ak-title" ).text().trim();
		var statToTest = stat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
		if (statToTest.includes('title') || statToTest.includes('titre') || statToTest.includes('attitude') || statToTest.includes('emote') || 
		statToTest.includes('echangeable') || statToTest.includes('exchangeable') || statToTest.includes('lie au') || statToTest.includes('linked to')) {
			if (statToTest.includes('title') || statToTest.includes('titre')) item["stats"].push({'title': stat.split(':')[1].trim()});
			else if (statToTest.includes('attitude') || statToTest.includes('emote')) item["stats"].push({'emote': stat});
			else if (statToTest.includes('echangeable') || statToTest.includes('exchangeable')) item["stats"].push({'exchangeable': getDate(stat)});
			else if (statToTest.includes('lie au') || statToTest.includes('linked to')) item["stats"].push({'linked': true});
		}else {
			var stat = $(this).find( "div.ak-title" ).text().trim();
			var element = getElement(stat);
			element = element.charAt(0).toUpperCase() + element.slice(1);
			var numbers = [];
			stat.replace(/(-?\d[\d\.]*)/g, function( x ) { 
				var n = Number(x); if (x == n) { numbers.push(x); }  
			});
			if(typeof numbers[1] == 'undefined') var groupeElement = {[element]: numbers[0]};
			else var groupeElement = {[element]: {'from': numbers[0], 'to': numbers[1]}};
			console.log(groupeElement);
			item["stats"].push(groupeElement);
		}
	});
}

function conditionParse(body) {
	var $ = cheerio.load(body);
	var condition = $('div.ak-container.ak-panel.no-padding').find('div.ak-list-element').find( "div.ak-title" ).remove("br").text().trim();
	var conditionTab = condition.split('et\n');
	console.log(conditionTab);
	console.log(conditionTab.map(function(string) {
  		return sanatizer(string);
	}));
	item["condition"] = conditionTab;
}

function recipeParse(body) {
	var $ = cheerio.load(body);
	$('div.ak-container.ak-panel.ak-crafts').find('div.ak-panel-content').find('div.ak-container.ak-content-list').find('div.ak-column').each(function(i, element){
	    var setUrl = 'https://www.dofus-touch.com' + $(this).find('div.ak-title').find('a').attr('href');
	    var setId = $(this).find('div.ak-title').find('a').attr('href').replace(/\D/g,'');
	    var setImage = $(this).find('div.ak-image').find('a').find('span.ak-linker').find('img').attr('src').replace('dofus/ng/img/../../../', '');
	    var setQuantity = $(this).find('div.ak-front').text().replace(/\x/g,'').trim();
	    var setName = $(this).find('div.ak-content').find('div.ak-title').find('a').find('span.ak-linker').text().trim();
	    var setType = $(this).find('div.ak-content').find('div.ak-text').text().trim();
	    var setLvl = $(this).find('div.ak-aside').text().replace(/\D/g,'').trim();

	    var groupeElement = {[setName]: {
	        'id': setId, 
	        'url': setUrl,
	        'imgUrl': setImage,
	        'type': setType,
	        'lvl': setLvl,
	        'quantity': setQuantity
	    }};
	    item["recipe"].push(groupeElement);
	});
}

function descriptionParse(body, url) {
	var $ = cheerio.load(body);
	var itemId = getId(url);
	var type = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-type.col-xs-6').find('span').text().trim();
	var name = $('h1.ak-return-link').text().trim();
	var description = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel').first().find('div.ak-panel-content').text().trim();
	var lvl = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-level.col-xs-6.text-right').text().trim().replace(/\D/g,'');
	var imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src').replace('dofus/ng/img/../../../', '');
	
	item = {
		id: itemId,
		name: name,
		description: description,
		lvl: lvl,
		type: type,
		imgUrl: imgUrl,
		url: url
	}
}
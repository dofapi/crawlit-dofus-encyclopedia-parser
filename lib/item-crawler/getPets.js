var request = require('request-promise');
var cheerio = require('cheerio');
var { getId, getElement } = require('helpers');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var getPets = exports.getPets = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		var itemId = getId(url);
		var type = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-type.col-xs-6').find('span').text().trim();
		var name = $('h1.ak-return-link').text().trim();
		var description = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel').first().find('div.ak-panel-content').text().trim();
		var lvl = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-level.col-xs-6.text-right').text().trim().replace(/\D/g,'');
		var imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src').replace('dofus/ng/img/../../../', '');
		
		var item = {
			id: itemId,
			name: name,
			description: description,
			lvl: lvl,
			type: type,
			imgUrl: imgUrl,
			url: url
		}
		
		item["stats"] = [];
		item["condition"] = [];
		item["maxstats"] = [];

		if ($('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(1).find('div.ak-container.ak-panel.no-padding').eq(1).text() !== '') {
			$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(1).find('div.ak-container.ak-panel.no-padding').eq(0).find('div.ak-list-element').each(function(i, element){
				var condition = $(this).find( "div.ak-title" ).remove("br").text().trim();
				var conditionTab = condition.split('et\n');
				item["condition"] = conditionTab;
			});
			$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(1).find('div.ak-container.ak-panel.no-padding').eq(1).find('div.ak-list-element').each(function(i, element){	
				var maxstats = $(this).find( "div.ak-title" ).text().trim();
				item["maxstats"].push(maxstats);
			});
		}else {
			$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(1).find('div.ak-container.ak-panel.no-padding').eq(0).find('div.ak-list-element').each(function(i, element){	
				var maxstats = $(this).find( "div.ak-title" ).text().trim();
				item["maxstats"].push(maxstats);
			});
		}
		$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(0).find('div.ak-list-element').each(function(i, element){
			var stat = $(this).find( "div.ak-title" ).text().trim();
			var element = getElement(stat);
			element = element.charAt(0).toUpperCase() + element.slice(1);
			var numbers = [];
			stat.replace(/(-?\d[\d\.]*)/g, function( x ) { 
				var n = Number(x); if (x == n) { numbers.push(x); }  
			});
			var groupeElement = {[element]: {'from': numbers[0], 'to': numbers[1]}};
			item["stats"].push(groupeElement);
		});
		return item;
	});
}
var request = require('request-promise');
var cheerio = require('cheerio');
var { getId, getElement } = require('helpers');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var getEquipments = exports.getEquipments = function (url) {
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
        item["recipe"] = [];
        item["set"] = [];
		if(typeof $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href') !== 'undefined') {
			var setUrl = 'https://www.dofus-touch.com' + $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href');
			var setId = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href').replace(/\D/g,'');
			var setName = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').text();
			item.set = {
				id: setId,
				url: setUrl,
				name: setName
			}
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
		$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(1).find('div.ak-container.ak-panel.no-padding').eq(1).find('div.ak-list-element').each(function(i, element){
			var condition = $(this).find( "div.ak-title" ).remove("br").text().trim();
			var conditionTab = condition.split('et\n');
			item["condition"] = conditionTab;
		});

        if(typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
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
                    'name': setName,
                    'url': setUrl,
                    'imgUrl': setImage,
                    'type': setType,
                    'lvl': setLvl,
                    'quantity': setQuantity
                }};
                item["recipe"].push(groupeElement);
            });
        }
		return item;
	});
}
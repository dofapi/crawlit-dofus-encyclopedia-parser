var request = require('request-promise');
var cheerio = require('cheerio');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var getEquipments = exports.getEquipments = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		var itemId = url.replace(/\D/g,'');
		var type = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-type.col-xs-6').find('span').text().trim();
		var name = $('h1.ak-return-link').text().trim();
		var description = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel').first().find('div.ak-panel-content').text().trim();
		var lvl = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-level.col-xs-6.text-right').text().trim().replace(/\D/g,'');
		var imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src').replace('dofus/ng/img/../../../', '');
		
		var item = {
			item_identifiant: itemId,
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
		if(typeof $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href') !== 'undefined') {
			var setUrl = 'https://www.dofus-touch.com' + $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href');
			var setId = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href').replace(/\D/g,'');
			var setName = $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').text();
			item.set = {
				id: setId,
				url: setUrl,
				name: setName
			}
		}else {
			item["set"] = [];
		}
		$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(0).find('div.ak-list-element').each(function(i, element){
			var stat = $(this).find( "div.ak-title" ).text().trim();
			var element = stat.replace(/de|à|[()]|to|and|(-?\d[\d\.]*)/gi, '').trim();
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


        $('div.ak-panel-intro').next('div.ak-container.ak-content-list.ak-displaymode-image-col').find('div.ak-list-element').each(function(i, element){

            var compoId = $(this).find('div.ak-image').find('a').attr('href').replace(/\D/g,'');
            var numberCompo = $(this).find( "div.ak-front" ).text().trim();

            var groupeElement = {'id': compoId, 'number': numberCompo.replace(/\D/g,'') };
            item["recipe"].push(groupeElement);
        });
		return item;
	});
}
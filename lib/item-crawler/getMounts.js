var request = require('request-promise');
var cheerio = require('cheerio');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var getMounts = exports.getMounts = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		var itemId = url.replace(/\D/g,'');
		var type = $('div.ak-encyclo-detail').find('div.ak-encyclo-detail-type.col-xs-6').find('span').text().trim();
		var name = $('h1.ak-return-link').text().trim();
		var imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src').replace('dofus/ng/img/../../../', '');
		
		var item = {
			id: itemId,
			name: name,
			lvl: '60',
			type: type,
			imgUrl: imgUrl,
			url: url
		}
		
		item["stats"] = [];
		item["characteristic"] = [];
		$('div.ak-encyclo-detail').find('div.ak-rides-details').find('div.row').eq(1).find('div.col-md-6').eq(0).find('div.ak-list-element').each(function(i, element){
			var stat = $(this).find( "div.ak-title" ).text().trim();
			var element = stat.replace(/(-?\d+) ((de|à|[()]|to|and)? (-?\d+))?/gi, '').trim();
			element = element.charAt(0).toUpperCase() + element.slice(1);
			var numbers = [];
			stat.replace(/(-?\d[\d\.]*)/g, function( x ) { 
				var n = Number(x); if (x == n) { numbers.push(x); }  
			});
			var groupeElement = {[element]: {'from': numbers[0], 'to': numbers[1]}};
			item["stats"].push(groupeElement);
		});
		$('div.ak-encyclo-detail').find('div.ak-rides-details').find('div.row').eq(1).find('div.col-md-6').eq(1).find('div.ak-list-element').each(function(i, element){
			var spanTxt = $(this).find( "div.ak-title" ).find("span").text();
			$(this).find( "div.ak-title" ).find("span").remove();
			var characteristic = $(this).find( "div.ak-title" ).text().trim() + ' ' + spanTxt;
			var element = characteristic.substring(0, characteristic.indexOf(":")).trim();
			var subElement = characteristic.substring(characteristic.indexOf(":")+1, characteristic.length).trim();
			var groupeElement = {[element]: subElement};
			item["characteristic"].push(groupeElement);
		});
		return item;
	});
}
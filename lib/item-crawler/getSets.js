var request = require('request-promise');
var cheerio = require('cheerio');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var getSets = exports.getSets = function (url) {
	requestOpts.url = url;
	return request(requestOpts).then(function ($) {
		var itemId = url.replace(/\D/g,'');
		var type = 'Panoplie'
		var name = $('h1.ak-return-link').text().trim();
		var lvl = $('div.ak-encyclo-detail-right').find('div.ak-encyclo-detail-level.col-xs-6.text-right').text().trim().replace(/\D/g,'');
		var imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src').replace('dofus/ng/img/../../../', '');
		
		var set = {
			id: itemId,
			name: name,
			lvl: lvl,
			type: type,
			imgUrl: imgUrl,
			url: url
		}
		
		set["bonus"] = [];
		set["items"] = [];
		$('div.ak-nocontentpadding').find('div.ak-item-list-preview').find('a').each(function(i, element){
			var item = {
				id: $(this).attr('href').replace(/\D/g,''),
				// name: $(this).attr('href').substr($(this).attr('href').lastIndexOf('/') + 1).replace(/[0-9]/g, '').replace('-', ' ').trim(),
				url: $(this).attr('href')
			}
			set["items"].push(item);
		});
		// var currentNbBonus = 0;
		$('div.ak-encyclo-detail-right').find('div.set-bonus-list').each(function(i, element){
			var stats = []
			$(this).find('div.ak-list-element').each(function(i, element){
				// currentNbBonus ++;
				var bonus = $(this).find( "div.ak-title" ).text().trim();
				if (bonus.includes('title') || bonus.includes('titre') || bonus.includes('attitude')) {
					if (bonus.includes('title') || bonus.includes('titre')) stats.title = bonus.split(':')[1].trim();
					else stats.attitude = bonus;
				}else {
					var element = bonus.replace(/de|à|[()]|to|and|(-?\d[\d\.]*)/gi, '').trim();
					element = element.charAt(0).toUpperCase() + element.slice(1);
					var numbers = [];
					bonus.replace(/(-?\d[\d\.]*)/g, function( x ) { 
						var n = Number(x); if (x == n) { numbers.push(x); }  
					});
					var groupeElement = {[element]: {'from': numbers[0], 'to': numbers[1]}};
					stats.push(groupeElement);
				}
			});
			var nbBonus = {
				number: i + 1,
				url: $(this).attr('href'),
				stats: stats
			}
			set["bonus"].push(nbBonus);
		});
		return set;
	});
}
var request = require('request-promise');
var cheerio = require('cheerio');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var getMounts = exports.getMounts = function (url) {
	return new Promise(function(resolve, reject) {
		requestOpts.url = url;
		request(requestOpts).then(function ($) {
			try {
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
					item["stats"].push(stat);
				});
				$('div.ak-encyclo-detail').find('div.ak-rides-details').find('div.row').eq(1).find('div.col-md-6').eq(1).find('div.ak-list-element').each(function(i, element){
					var spanTxt = $(this).find( "div.ak-title" ).find("span").text();
					$(this).find( "div.ak-title" ).find("span").remove();
					var characteristic = $(this).find( "div.ak-title" ).text().trim() + ' ' + spanTxt;
					item["characteristic"].push(characteristic);
				});
				return item;
			} catch(err){
				return [err];
			}
		})
		.then((htmlRes) => {
			// console.log(htmlRes);
			resolve(htmlRes);
		});
	});
}
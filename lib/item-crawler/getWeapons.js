var Nightmare = require('nightmare');
var nightmare = new Nightmare();

var getWeapons = exports.getWeapons = function (url) {
	return new Promise(function(resolve, reject) {
	nightmare
		.goto(url)
		.inject('js', 'node_modules/jquery/dist/jquery.min.js')
		.evaluate(function () {
			try {
				var itemId = document.URL.replace(/\D/g,'');
				var type = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-type.col-xs-6').find('span').text().trim();
				var name = $('h1.ak-return-link').text().trim();
				var description = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-container.ak-panel:first').find('div.ak-panel-content').text().trim();
				var lvl = $('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.ak-encyclo-detail-level.col-xs-6.text-right').text().trim().replace(/\D/g,'');
				var imgUrl = $('div.ak-encyclo-detail-illu').find('img').attr('src').replace('dofus/ng/img/../../../', '');
				
				var item = {
					id: itemId,
					name: name,
					description: description,
					lvl: lvl,
					type: type,
					imgUrl: imgUrl,
					url: document.URL
				}
				
				item["stats"] = [];
				item["condition"] = [];
				if(typeof $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href') !== 'undefined') {
					var setUrl = 'http://www.dofus-touch.com' + $('div.ak-container.ak-panel.ak-crafts').next('div.ak-container.ak-panel').find('div.ak-panel-title').find('a').attr('href');
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
				item["characteristic"] = [];
				$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(1).find('div.ak-container.ak-panel.no-padding').eq(0).find('div.ak-list-element').each(function(i, element){	
					var spanTxt = $(this).find( "div.ak-title" ).find("span").text();
					$(this).find( "div.ak-title" ).find("span").remove();
					var characteristic = $(this).find( "div.ak-title" ).text().trim() + ' ' + spanTxt;
					item["characteristic"].push(characteristic);
				});

				$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(0).find('div.ak-list-element').each(function(i, element){
					var stat = $(this).find( "div.ak-title" ).text().trim();
					item["stats"].push(stat);
				});

				$('div.ak-encyclo-detail-right.ak-nocontentpadding').find('div.col-sm-6').eq(1).find('div.ak-container.ak-panel.no-padding').eq(1).find('div.ak-list-element').each(function(i, element){
					var condition = $(this).find( "div.ak-title" ).remove("br").text().trim();
					item["condition"].push(condition);
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
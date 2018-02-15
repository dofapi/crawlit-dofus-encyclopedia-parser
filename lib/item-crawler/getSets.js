var Nightmare = require('nightmare');
var nightmare = new Nightmare();

var getSets = exports.getSets = function (url) {
	return new Promise(function(resolve, reject) {
	nightmare
		.goto(url)
		.inject('js', 'node_modules/jquery/dist/jquery.min.js')
		.evaluate(function () {
			try {
				var itemId = document.URL.replace(/\D/g,'');
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
					url: document.URL
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
						stats.push(bonus);
						
					});
					var nbBonus = {
						number: i + 1,
						url: $(this).attr('href'),
						stats: JSON.stringify(stats)
					}
					set["bonus"].push(nbBonus);
				});
				return set;
			} catch(err){
				console.log('error getSets');
				return [err];
			}
		})
		.then((htmlRes) => {
			// console.log(htmlRes);
			resolve(htmlRes);
		});
	});
}
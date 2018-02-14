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
				var type = $('div.ak-encyclo-detail-right').find('div.ak-encyclo-detail-type.col-xs-6').find('span').text().trim();
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
				return set;
			} catch(err){
				return [err];
			}
		})
		.then((htmlRes) => {
			console.log(htmlRes);
			resolve(htmlRes);
		});
	});
}
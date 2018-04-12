var request = require('request-promise');
var cheerio = require('cheerio');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var getResources = exports.getResources = function (url) {
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
        return item;
    });
}
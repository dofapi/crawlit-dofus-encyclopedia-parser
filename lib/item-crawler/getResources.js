var request = require('request-promise');
var cheerio = require('cheerio');
var { effectParse, recipeParse, descriptionParse } = require('./parsing-service/helpers');

var requestOpts = {
    url: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};
var item = {};
var body = '';

var getResources = exports.getResources = function (url) {
    requestOpts.url = url;
    return request(requestOpts).then(function ($) {
        /////// Global initializations ///////
        body = $.html();

        /////// Description parse ///////
        item = descriptionParse(body, url);

        /////// Tabs initializations ///////
        item["recipe"] = [];
        
        /////// Recipes parse ///////
        if(typeof $('div.ak-container.ak-panel.ak-crafts') !== 'undefined') {
            item["recipe"] = recipeParse(body);;
        }
        return item;
    });
}
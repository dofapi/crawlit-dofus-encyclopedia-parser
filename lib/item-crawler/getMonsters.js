var request = require('request-promise');
var cheerio = require('cheerio');
var { getId, getElement, getDate, sanatizer } = require('./helpers');
var { effectParse, recipeParse, descriptionParse, monsterParse } = require('./parsing-service/helpers');

var requestOpts = {
  url: '',
  transform: function (body) {
    return cheerio.load(body);
  }
};
var item = {};
var body = '';

var getMonsters = exports.getMonsters = function (url) {
  requestOpts.url = url;
  return request(requestOpts).then(function ($) {
    /////// Global initializations ///////
    body = $.html();

    /////// Monster parse ///////
    item = monsterParse(body, url);

    return item;
  });
}
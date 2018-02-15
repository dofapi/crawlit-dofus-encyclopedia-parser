var fs = require('fs');
var Promise = require('bluebird');
var ge = require('./item-crawler/getEquipments');
var gw = require('./item-crawler/getWeapons');
var gs = require('./item-crawler/getSets');
var Nightmare = require('nightmare');
var nightmare = new Nightmare();

var CLI = require('clui'),
    Progress = CLI.Progress;

var currentPosition = 0;
var itemsList = [];
var thisProgressBar = new Progress(20);

var getItems = exports.getItems = function(links, back) {
	getData(links[currentPosition],back, function(item,back){
		itemsList.push(item);
		console.log(thisProgressBar.update(currentPosition, links.length));
		currentPosition++;
        // any more items in array?
        if(currentPosition < links.length) {
         	getItems(links, back);   
        }else {
			back(itemsList);
		}
	});
};

function getData(url, back, callback) {
	var categoryPromise;
	switch (true) {
		case /\barmes\b/gi.test(url):
			categoryPromise = gw.getWeapons(url);
			break;
		case /\bweapons\b/gi.test(url):
			categoryPromise = gw.getWeapons(url);
			break;
		case /\bequipments\b/gi.test(url):
			categoryPromise = ge.getEquipments(url);
			break;
		case /\bequipements\b/gi.test(url):
			categoryPromise = ge.getEquipments(url);
			break;
		case /\bsets\b/gi.test(url):
			categoryPromise = gs.getSets(url);
			break;
		case /\bpanoplies\b/gi.test(url):
			categoryPromise = gs.getSets(url);
			break;

	  	default:
		console.log('Sorry, we are out of ' + url + '.');
	}
	categoryPromise.then(
	    function(item) {
	      callback(item, back);
	    }).catch(
	      function(err) {
	        console.log("promesse rompue");
	        console.log(err);
			process.exit();
	      });
}

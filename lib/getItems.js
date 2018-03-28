var fs = require('fs');
var request = require('request-promise');
var ge = require('./item-crawler/getEquipments');
var gw = require('./item-crawler/getWeapons');
var gs = require('./item-crawler/getSets');
var gm = require('./item-crawler/getMounts');
var gp = require('./item-crawler/getPets');
var gr = require('./item-crawler/getResources');

var CLI = require('clui'),
    Progress = CLI.Progress;

var currentPosition = 0;
var progressbarPosition = 0;
var itemsList = [];
var thisProgressBar = new Progress(20);
var options = {
    method: 'POST',
    uri: '',
    body: '',
    resolveWithFullResponse : true,
    json: true // Automatically stringifies the body to JSON
};

var getItems = exports.getItems = function(links, back) {
	getData(links[currentPosition],back, function(item){
		itemsList.push(item);
		if (progressbarPosition >= links.length * 0.05) {
			progressbarPosition = 0;
			console.log(thisProgressBar.update(currentPosition, links.length));
		}
		progressbarPosition++;
		currentPosition++;
        if(currentPosition < links.length) { // any more items in array?
         	getItems(links, back);   
        }else {
        	console.log(thisProgressBar.update(100, 100));
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
		case /\bequipment\b/gi.test(url):
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
		case /\bmounts\b/gi.test(url):
			categoryPromise = gm.getMounts(url);
			break;
		case /\bmontures\b/gi.test(url):
			categoryPromise = gm.getMounts(url);
			break;
		case /\bpets\b/gi.test(url):
			categoryPromise = gp.getPets(url);
			break;
		case /\bfamiliers\b/gi.test(url):
			categoryPromise = gp.getPets(url);
			break;
        case /\bresources\b/gi.test(url):
            categoryPromise = gr.getResources(url);
            break;
        case /\bressources\b/gi.test(url):
            categoryPromise = gr.getResources(url);
            break;

	  	default:
	  		console.log('\x1b[31m%s\x1b[0m' ,'Sorry, we are out of ' + url + '.');
	}
	categoryPromise.then(function(item) {
    	callback(item);
    }).catch(function(err) {
        if (err.statusCode == '404') {
        	console.log('\x1b[33m%s\x1b[0m' ,'\n Error 404 detected ! Maybe empty item (Encyclopedia error).');
        	callback();
        }else if(err.statusCode == '429') {
        	console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Error 429 detected ! Too many request, be careful Ankama can ban your IP. /!\\ Never parse more than 20 pages/hour');
        	process.exit();
        }else {
        	console.log(err);
        	console.log('\x1b[31m%s\x1b[0m' ,'/!\\Broken promise all');
        	process.exit();
        }
      });
}

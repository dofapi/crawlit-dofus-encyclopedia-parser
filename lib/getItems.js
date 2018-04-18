var fs = require('fs');
var fsPath = require('fs-path');
var request = require('request-promise');
var ge = require('./item-crawler/getEquipments');
var gw = require('./item-crawler/getWeapons');
var gs = require('./item-crawler/getSets');
var gm = require('./item-crawler/getMounts');
var gp = require('./item-crawler/getPets');
var gr = require('./item-crawler/getResources');
var gc = require('./item-crawler/getConsumables');

var CLI = require('clui'),
    Progress = CLI.Progress;

var currentPosition = 0;
var progressbarPosition = 0;
var itemsList = [];
var gCategory;
var gLinks; 
var thisProgressBar = new Progress(20);
var options = {
    method: 'POST',
    uri: '',
    body: '',
    resolveWithFullResponse : true,
    json: true // Automatically stringifies the body to JSON
};

var getItems = exports.getItems = function(category, links, back) {
	gCategory = category;
	gLinks = links;
	if (currentPosition == 0) {
		if(fs.existsSync('./data/links/resume.json')) {
			var itemsResumed = JSON.parse(fs.readFileSync('./data/'+category+'.json', 'utf8'));
			itemsList = itemsResumed;
		}
	}
	// if(currentPosition == 10) limitCrossed(gCategory, currentPosition, gLinks, itemsList);
	getData(links[currentPosition],back, function(item){
		itemsList.push(item);
		if (progressbarPosition >= links.length * 0.05) {
			progressbarPosition = 0;
			console.log(thisProgressBar.update(currentPosition, links.length));
		}
		progressbarPosition++;
		currentPosition++;
		if(currentPosition < links.length) getItems(category, links, back); // any more items in array?
		else console.log(thisProgressBar.update(100, 100)), back(itemsList);
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
        case /\bconsumables\b/gi.test(url):
            categoryPromise = gc.getConsumables(url);
            break;
        case /\bconsommables\b/gi.test(url):
            categoryPromise = gc.getConsumables(url);
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
        	console.log('\x1b[31m%s\x1b[0m' ,'\n/!\\Error 429 detected ! You reached maximum request per hour, over pass it will provoke a ban IP from Ankama. Resume the parsing after 1h !');
        	limitCrossed(gCategory, currentPosition, gLinks, itemsList);
        }else if(err.code == 'ETIMEDOUT') {
        	console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Error ETIMEDOUT detected ! Your connexion took too much time to respond');
        	limitCrossed(gCategory, currentPosition, gLinks, itemsList);
        }else if(err.message == 'Error: read ECONNRESET') {
        	console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Error ECONNRESET detected ! Connexion shutdown or reset, verify your internet connexion !');
        	limitCrossed(gCategory, currentPosition, gLinks, itemsList);
        }else if(err.message == 'Error: unable to verify the first certificate') {
        	console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Error ECONNABORTED detected ! Connexion shutdown, verify your internet connexion !');
        	limitCrossed(gCategory, currentPosition, gLinks, itemsList);
        }else {
        	console.log(err);
			console.log('\x1b[31m%s\x1b[0m' ,'/!\\Broken promise all');
			limitCrossed(gCategory, currentPosition, gLinks, itemsList);
        }
      });
}

function limitCrossed(category, lastIndex, links, items) {
	if(fs.existsSync('./data/links/resume.json')) fs.unlinkSync('./data/links/resume.json');
	links = links.slice(lastIndex);
	var resume = {'category': category, links: links};
	
	category = category.replace(/ /g,'');
	fsPath.writeFile('./data/' + category + '.json', JSON.stringify(items), function(err){
		if (err) console.log(err);
		fsPath.writeFile('./data/links/resume.json', JSON.stringify(resume), function(err){
			if (err) console.log(err);
			console.log('\x1b[33m%s\x1b[0m' ,'/!\\However, don\'t worry: if your relaunch it, the app will resume the parsing from last item parsed ;)');
			console.log('\x1b[33m%s\x1b[0m' ,'\n INFO : ' +items.length+ ' item(s) were crawled.');
			setTimeout(process.exit(),4000);
		});
	});
}
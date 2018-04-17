var fs = require('fs');
var fsPath = require('fs-path');
var gi = require('./getItems');
var cm = require('./cli-view/cmd');
var sw = require('./cli-view/cmdSwitch');
var request = require('request-promise');
var cheerio = require('cheerio');
var CLI = require('clui'),
    Spinner = CLI.Spinner;


var url;
var globalUrl;
var itemCategory;
var maxItem = 1;
var requestOpts = {
    url: '',
    method: 'GET',
    transform: function (body) {
        return cheerio.load(body);
    }
};

main();

function main() {
	asciiArt();
	var ifResume = fs.existsSync('./data/links/resume.json') ? true : false;
	cm.getCategory(ifResume).then(
		function(cmdResponse) {
			if(cmdResponse == "yes") resumeLastParse();
			else crawlerInit(cmdResponse);
		}).catch(
		function(err) {
			console.log('\x1b[31m%s\x1b[0m' ,'/!\\Broken promise from cmd resume');
			console.log(err);
			process.exit();
		});
}

function crawlerInit (cmdResponse) {
	cmdResponse = JSON.parse(cmdResponse);
	var countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
	countdown.start();
	maxItem = cmdResponse.maxItem;
	itemCategory = cmdResponse.category;
	cmdResponse.language ==  'french' ? url = sw.cmdSwitch(itemCategory) : url = sw.cmdSwitchEn(itemCategory);
	cmdResponse.game ==  'dofus' ? url = url : url = url.replace('https://www.dofus.com', 'https://www.dofus-touch.com');
	globalUrl = url.substring(0, url.indexOf(".com/") + 4);
	requestOpts.url = url;
	getPageLinks();
}

function getPageLinks() {
	return request(requestOpts).then(function ($) {
		var links = [];
		$('tbody').find('tr').each(function(i, tr){
			if(i >= maxItem) return false;
			var link = globalUrl + $(this).find('td').eq(1).find('a').attr('href');
			links.push(link);
		});
		return links;
	}).then(function(links) {
		fsPath.writeFile('./data/links/' + itemCategory + '_links.json', JSON.stringify(links), function(err){
			if (err) console.log(err);
			console.log('\x1b[36m%s\x1b[0m' ,'\n SUCCESS : all item(s) links crawled.');
			console.log('\x1b[36m%s\x1b[0m' ,'\n START of item(s) crawling.');
			getItems(itemCategory, getLinksFromFile());
		});
	}).catch(function(err) {
	    console.log('\x1b[31m%s\x1b[0m' ,'/!\\Broken promise from getPageLinks');
	    console.log(err);
		process.exit();
	  });
}

function getItems(category, links) {
	gi.getItems(category, links, function(items){
		if(fs.existsSync('./data/links/resume.json')) fs.unlinkSync('./data/links/resume.json');
		category = category.replace(/ /g,'');
		fsPath.writeFile('./data/' + category + '.json', JSON.stringify(items), function(err){
			if (err) console.log(err);
			console.log('\x1b[32m%s\x1b[0m' ,'\n SUCCESS : ' +items.length+ ' item(s) were crawled.');
			console.log('\x1b[33m%s\x1b[0m' ,'File ' + category +'.json' + ' was generated under "data/" folder.');
			process.exit();
		});
	});
}

function getLinksFromFile() {
	var links = JSON.parse(fs.readFileSync('./data/links/' + itemCategory + '_links.json', 'utf8'));
	return links;
}

function resumeLastParse() {
	var resume = JSON.parse(fs.readFileSync('./data/links/resume.json', 'utf8'));
	getItems(resume.category, resume.links);
}

function asciiArt() {
	console.log(' ▄████████    ▄████████    ▄████████  ▄█     █▄   ▄█        ▄█      ███     ');
	console.log('███    ███   ███    ███   ███    ███ ███     ███ ███       ███  ▀█████████▄ ');
	console.log('███    █▀    ███    ███   ███    ███ ███     ███ ███       ███▌    ▀███▀▀██ ');
	console.log('███         ▄███▄▄▄▄██▀   ███    ███ ███     ███ ███       ███▌     ███   ▀ ');
	console.log('███        ▀▀███▀▀▀▀▀   ▀███████████ ███     ███ ███       ███▌     ███     ');
	console.log('███    █▄  ▀███████████   ███    ███ ███     ███ ███       ███      ███     ');
	console.log('███    ███   ███    ███   ███    ███ ███ ▄█▄ ███ ███▌    ▄ ███      ███     ');
	console.log('████████▀    ███    ███   ███    █▀   ▀███▀███▀  █████▄▄██ █▀      ▄████▀   ');
	console.log('             ███    ███                          ▀                          ');
}
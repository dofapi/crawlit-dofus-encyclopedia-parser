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
var currentPage = 1;
var pageslinks = [];
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
	cm.getCategory().then(
    function(cmdResponse) {
      crawlerInit(cmdResponse);
    }).catch(
      function(err) {
        console.log('\x1b[31m%s\x1b[0m' ,'/!\\Broken promise from cmd');
        console.log(err);
		process.exit();
      });
}

function crawlerInit (cmdResponse) {
	cmdResponse = JSON.parse(cmdResponse);
	var countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
	countdown.start();
	maxPage = cmdResponse.pages;
	currentPage = cmdResponse.fromPage;
	itemCategory = cmdResponse.category;
	cmdResponse.language ==  'french' ? url = sw.cmdSwitch(itemCategory) : url = sw.cmdSwitchEn(itemCategory);
	cmdResponse.game ==  'dofus' ? url = url : url = url.replace('https://www.dofus.com', 'https://www.dofus-touch.com');
	globalUrl = url.substring(0, url.indexOf(".com/") + 4);
	requestOpts.url = url;
	var realMaxPagePromise	= request(requestOpts).then(function ($) {
		var realMaxPage = $('div.text-center.ak-pagination.hidden-xs').find('ul.ak-pagination.pagination.ak-ajaxloader li:last-child').prev().prev().text().trim();
		return realMaxPage;
	});
	getAllLinks(realMaxPagePromise);
}

function getAllLinks(realMaxPagePromise) {
	realMaxPagePromise.then(
    function(realMaxPage) {
    	if (realMaxPage == '') {
    		realMaxPage = 1;
    	}
		if (realMaxPage >= maxPage && currentPage <= maxPage) {
			var callback =  function(values) {
				pageslinks.push(values);
				currentPage++;
		        if(currentPage <= maxPage) {
		         	getPageLinks(currentPage, callback); 
		        }else {
					pageslinks = concatToOneArray(pageslinks);
					console.log('\x1b[36m%s\x1b[0m' ,'\n SUCCESS : all item(s) links crawled.');
					console.log('\x1b[36m%s\x1b[0m' ,'\n START of item(s) crawling.');
					getItems(pageslinks);
				}
			}
			getPageLinks(currentPage, callback);
		}else {
				console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Max page of this category is ' + realMaxPage + ' so '+ maxPage + ' is to much :(');
				process.exit();
		}

    }).catch(
      function(err) {
        console.log(err);
        console.log('\x1b[31m%s\x1b[0m' ,'/!\\Broken promise from getAllLinks');
		process.exit();
      });
}

function getPageLinks(currentPage, callback) {
	requestOpts.url = url + 'page=' + currentPage;
	return request(requestOpts).then(function ($) {
		var links = [];
		$('tbody').find('tr').each(function(i, tr){
			var link = globalUrl + $(this).find('td').eq(1).find('a').attr('href');
			links.push(link);
		});
		return links;
	}).then(function(val) {
		callback(val);
	}).catch(function(err) {
	    console.log('\x1b[31m%s\x1b[0m' ,'/!\\Broken promise from getPageLinks');
	    console.log(err);
		process.exit();
	  });
}

function getItems(pageslinks) {
	gi.getItems(pageslinks, function(items){
		itemCategory = itemCategory.replace(/ /g,'');
		fsPath.writeFile('./data/' + itemCategory + '.json', JSON.stringify(items), function(err){
			if (err) console.log(err);
			console.log('\x1b[32m%s\x1b[0m' ,'\n SUCCESS : ' +pageslinks.length+ ' item(s) were crawled.');
			console.log('\x1b[33m%s\x1b[0m' ,'File ' + itemCategory +'.json' + ' was generated under "data/" folder.');
			process.exit();
		});
	});
}

function concatToOneArray(arrToConvert) {
	var newArr = [];
	for(var i = 0; i < arrToConvert.length; i++) {
		newArr = newArr.concat(arrToConvert[i]);
	}
	const noDuplicateItemArray = newArr.filter((val,id,array) => array.indexOf(val) == id);
	return noDuplicateItemArray;
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
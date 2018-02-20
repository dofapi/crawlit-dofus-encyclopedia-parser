var fs = require('fs');
var fsPath = require('fs-path');
var figlet = require('figlet');
var gi = require('./getItems');
var cm = require('./cli-view/cmd');
var sw = require('./cli-view/cmdSwitch');
var request = require('request-promise');
var cheerio = require('cheerio');
var CLI = require('clui'),
    Spinner = CLI.Spinner;

var url;
var itemCategory;
var currentPage = 1;
var pageslinks = [];
var requestOpts = {
    url: '',
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
        console.log("promesse rompue");
        console.log(err);
		process.exit();
      });
}

function crawlerInit (cmdResponse) {
	cmdResponse = JSON.parse(cmdResponse);
	var countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
	countdown.start();
	maxPage = cmdResponse.pages;
	itemCategory = cmdResponse.category;
	url = sw.cmdSwitch(itemCategory);

	var realMaxPagePromise	= new Promise(function(resolve, reject) {
		requestOpts.url = url;
		request(requestOpts).then(function ($) {
			var realMaxPage = $('div.text-center.ak-pagination.hidden-xs').find('ul.ak-pagination.pagination.ak-ajaxloader li:last-child').prev().prev().text().trim();
			resolve(realMaxPage);
		});
	});
	getAllLinks(realMaxPagePromise);
}

function getAllLinks(realMaxPagePromise) {
	realMaxPagePromise.then(
    function(realMaxPage) {
    	if (realMaxPage == '') {
    		realMaxPage = 1;
    	}
		if (realMaxPage >= maxPage) {
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
				console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Max page of this category is ' + realMaxPage + ' so '+ cmdResponse.pages + ' is to much :(');
				process.exit();
		}

    }).catch(
      // Promesse rejetée
      function(err) {
        console.log("promesse rompue");
        console.log(err);
		process.exit();
      });
}

function getPageLinks(currentPage, callback) {
	return new Promise(function(resolve, reject) {
		requestOpts.url = url + 'page=' + currentPage;
		request(requestOpts).then(function ($) {
			var links = [];
			$('tbody').find('tr').each(function(i, tr){
				var link = 'http://www.dofus-touch.com' + $(this).find('td').eq(1).find('a').attr('href');
				links.push(link);				
			});
			resolve(links);
		});
	}).then(
    function(val) {
    	callback(val);
    }).catch(
      // Promesse rejetée
      function(err) {
        console.log("promesse rompue");
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
	return newArr;
}

function asciiArt() {
	console.log(figlet.textSync('Crawlit', {
      font: 'Delta Corps Priest 1',
      horizontalLayout: 'default',
      verticalLayout: 'default'
  }));
}
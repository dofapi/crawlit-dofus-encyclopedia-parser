var fs = require('fs');
var fsPath = require('fs-path');
var Promise = require('bluebird');
var figlet = require('figlet');
var gi = require('./getItems');
var cm = require('./cmd');
var sw = require('./cmdSwitch');
var Nightmare = require('nightmare');
var nightmare = new Nightmare();

var CLI = require('clui'),
    Spinner = CLI.Spinner;

var url;
var itemCategory;
var currentPage = 1;
var pageslinks = [];

main();

function main() {
	asciiArt();
	cm.getCategory().then(
    // On affiche un message avec la valeur
    function(cmdResponse) {
      crawl(cmdResponse);
    }).catch(
      // Promesse rejetée
      function(err) {
        console.log("promesse rompue");
        console.log(err);
		process.exit();
      });
}

var crawl = exports.crawl = function(cmdResponse) {
	cmdResponse = JSON.parse(cmdResponse);
	var countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
	countdown.start();
	maxPage = cmdResponse.pages;
	itemCategory = cmdResponse.category;
	url = sw.cmdSwitch(itemCategory);

	var realMaxPagePromise	= new Promise(function(resolve, reject) {
		new Nightmare()
		.goto(url)
		.inject('js', 'node_modules/jquery/dist/jquery.min.js')
		.evaluate(function () {
			var realMaxPage = $('div.text-center.ak-pagination.hidden-xs').find('ul.ak-pagination.pagination.ak-ajaxloader li:last-child').prev().prev().text().trim();
			return realMaxPage;
		})
		.end()
		.then((realMaxPage) => {
			resolve(realMaxPage);
		});
	});
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
		         	getData(currentPage, callback); 
		        }else {
					pageslinks = concatToOneArray(pageslinks);
					gi.getItems(pageslinks, function(items){
						itemCategory = itemCategory.replace(/ /g,'');
						fsPath.writeFile('./data/' + itemCategory + '.json', JSON.stringify(items), function(err){
							if (err) console.log(err);
							console.log('\x1b[33m%s\x1b[0m' ,'\n SUCCESS : ' +pageslinks.length+ ' item(s) were crawled.');
							console.log('\x1b[33m%s\x1b[0m' ,'File ' + itemCategory +'.json' + ' was generated under "data/" folder.');
							process.exit();
						});
					});
				}
			}
			getData(currentPage, callback);
		}else {
				console.log('\x1b[33m%s\x1b[0m' ,'\n /!\\ Max page of this category is ' + realMaxPage + ' so '+ cmdResponse.pages + ' is to much :(');
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

function getData(currentPage, callback) {
	return new Promise(function(resolve, reject) {
		new Nightmare()
		.goto(url + 'page=' + currentPage)
		.inject('js', 'node_modules/jquery/dist/jquery.min.js')
		.evaluate(function () {
			var links = [];
			$('tr').each(function(i, tr){
				var link = 'http://www.dofus-touch.com' + $(this).find( "td:eq( 0 )" ).find('a').attr('href');
				links.push(link);				
			});
			links.shift();
			return links;
		})
		.end()
		.then((htmlRes) => {
			resolve(htmlRes);
		});
	}).then(
    // On affiche un message avec la valeur
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
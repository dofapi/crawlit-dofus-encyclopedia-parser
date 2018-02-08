var express = require('express');
var app = express();
var cheerio = require('cheerio');
var Horseman = require("node-horseman");
var horseman = new Horseman({
        injectJquery: true
    });
var fs = require('fs');

/*
app.set('view engine', 'pug');
app.set('views', './views')
app.get('/', function(req, res, next) {
	//crawl();
	res.render('index', { title: 'Success', message: 'Operation done !'});
});

app.listen(3000, function () {
  console.log('Crawlit listening on port 3000!')
});
*/

crawl();


function crawl() {
	var url = "http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements";
	const pages = [];
	items = [];
	var currentPage = 0;
	for (var page = 1; page <= 3; page++) {
		currentPage ++;
		var response;
		horseman
			.open(url + '?page=' + page)
			.html('tbody')
			.evaluate(function () {
				var links = [];
				$('tr').each(function(i, tr){
					var link = 'http://www.dofus-touch.com' + $(this).find( "td:eq( 0 )" ).find('a').attr('href');
					links.push(link);
					//fs.appendFileSync('links.txt', link + '\n');					
				});
				links.shift();
				console.log(links);
				return links;
			})
			.log()
			.then((htmlRes) => {
				response = htmlRes;
				//console.log(response);
				var file_name = 'links'+page+'.json';
				fs.appendFileSync(file_name, JSON.stringify(response), 'utf8');
				/*
				if(currentPage == 1) {
					fs.appendFileSync('links.json', JSON.stringify(response), 'utf8');
				} else {
					/*fs.readFileSync('links.json', function (err, data) {
					var json = JSON.parse(data)
					json.push(response)

					fs.writeFile("links.json", JSON.stringify(json))
				});
					fs.readFile('links.json', 'utf8', function readFileCallback(err, data){
						if (err){
							console.log(err);
						} else {
						obj = JSON.parse(data); //now it an object
						obj.push(response); //add some data
						json = JSON.stringify(obj); //convert it back to json
						fs.writeFile('links.json', json, 'utf8', callback); // write it back 
					}});
				}*/
				
				//fs.appendFileSync('links.json', JSON.stringify(response));*/
			})
			//.log()
			.close();	
	};
}


function saveItem(item) {
	items.push(item);
}
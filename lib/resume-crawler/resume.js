var fs = require('fs');
var fsPath = require('fs-path');

var switchErrorHandler = exports.switchErrorHandler = function (errorMsg, category, lastIndex, links, items, game) {
	if(fs.existsSync('./data/links/resume.json')) fs.unlinkSync('./data/links/resume.json');
	links = links.slice(lastIndex);
	var resume = {'category': category, links: links, game: game};
	category = category.replace(/ /g,'');

	switch (errorMsg) {
		case '429':
			console.log('\x1b[31m%s\x1b[0m' ,'\n/!\\Error 429 detected ! You reached maximum request per hour, over pass it will provoke a ban IP from Ankama. Resume the parsing after 1h !');
			console.log('\x1b[33m%s\x1b[0m' ,'/!\\However, don\'t worry: if your relaunch it, the app will resume the parsing from last item parsed ;)');
			saveData(category, items, resume, game);
			wait(4000);
			process.exit();
			break;
		case 'ETIMEDOUT':
			console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Error ETIMEDOUT detected ! Your connexion took too much time to respond.');
			saveData(category, items, resume, game);
			console.log('\x1b[33m%s\x1b[0m' ,'/!\\However, don\'t worry: if your relaunch it, the app will resume the parsing from last item parsed ;)');
			wait(4000);
			process.exit();
			break;
		case 'Error: read ECONNRESET':
			console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Error ECONNRESET detected ! Connexion shutdown or reset, verify your internet connexion !');
			saveData(category, items, resume, game);
			console.log('\x1b[33m%s\x1b[0m' ,'/!\\However, don\'t worry: if your relaunch it, the app will resume the parsing from last item parsed ;)');
			wait(4000);
			process.exit();
			break;
		case 'Error: unable to verify the first certificate':
			console.log('\x1b[31m%s\x1b[0m' ,'\n /!\\ Error ECONNABORTED detected ! Connexion shutdown, verify your internet connexion !');
			console.log('\x1b[33m%s\x1b[0m' ,'/!\\However, don\'t worry: if your relaunch it, the app will resume the parsing from last item parsed ;)');
			saveData(category, items, resume, game);
			wait(4000);
			process.exit();
			break;
		default:
			saveData(category, items, resume, game);
			process.exit();
	}
}

function saveData(category, items, resume, game) {
	fsPath.writeFileSync('./data/' + game + '/' + category + '.json', JSON.stringify(items));
	fsPath.writeFileSync('./data/links/resume.json', JSON.stringify(resume));
	console.log('\x1b[33m%s\x1b[0m' ,'\n INFO : ' +items.length+ ' item(s) were crawled.');
}

function wait(ms){
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while(d2-d < ms);
}
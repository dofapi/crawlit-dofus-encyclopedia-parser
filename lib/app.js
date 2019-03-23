#!/usr/bin/env node

const fs = require('fs');
const fsPath = require('fs-path');

const gi = require('./getItems');
const cm = require('./cli-view/cmd');
const sw = require('./cli-view/cmdSwitch');
const request = require('request-promise');
const cheerio = require('cheerio');
const CLI = require('clui'), Spinner = CLI.Spinner;

let url, globalUrl, itemCategory, game;
let maxItem = 1;
let all = true;
const requestOpts = {
	url: '',
	method: 'GET',
	transform: function (body) {
		return cheerio.load(body);
	}
};

(async function main() {
	asciiArt();
	if (!process.platform === 'win32') arboInit();
	const ifResume = fs.existsSync('./data/links/resume.json') ? true : false;
	try {
		const cmdResponse = await cm.getCategory(ifResume);
		if (cmdResponse == 'yes') resumeLastParse();
		else crawlerInit(cmdResponse);
	} catch (err) {
		if (err) console.log('\x1b[31m%s\x1b[0m', '/!\\Broken promise from cmd resume'), console.log(err), process.exit();
	}
})();

function crawlerInit(cmdResponse) {
	cmdResponse = JSON.parse(cmdResponse);
	const countdown = new Spinner('Crawler in progress... It could take some time ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
	countdown.start();
	game = cmdResponse.game;
	maxItem = cmdResponse.maxItem;
	all = cmdResponse.all;
	itemCategory = cmdResponse.category;
	cmdResponse.language == 'french' ? url = sw.cmdSwitch(itemCategory) : url = sw.cmdSwitchEn(itemCategory);
	cmdResponse.game == 'dofus' ? url = url : url = url.replace('https://www.dofus.com', 'https://www.dofus-touch.com');
	globalUrl = url.substring(0, url.indexOf('.com/') + 4);
	requestOpts.url = url;
	getPageLinks();
}

async function getPageLinks() {
	try {
		const $ = await request(requestOpts);
		const links = [];

		// warning, classe is not a classic encyclopedia
		if (itemCategory == 'classe') {
			$('.ak-content-sections').find('.ak-section').each(function (i, div) {
				const link = globalUrl + $(this).find('a').attr('href');
				links.push(link);
			});
		} else {
			$('tbody').find('tr').each(function (i, tr) {
				if (!all) if (i >= maxItem) return false;
				const link = globalUrl + $(this).find('td').eq(1).find('a').attr('href') + '?size=3000';
				links.push(link);
			});
		}

		fsPath.writeFileSync('./data/links/' + itemCategory + '_links.json', JSON.stringify(links));
		console.log('\x1b[36m%s\x1b[0m', '\n SUCCESS : all item(s) links crawled.');
		console.log('\x1b[36m%s\x1b[0m', '\n START of item(s) crawling.');
		getItems(itemCategory, getLinksFromFile(), game);
	}
	catch (err) {
		console.log('\x1b[31m%s\x1b[0m', '/!\\Broken promise from getPageLinks');
		if (err.statusCode == '429') console.log('\x1b[31m%s\x1b[0m', '\n/!\\Error 429 detected ! You reached maximum request per hour, over pass it will provoke a ban IP from Ankama. Resume the parsing after 1h !'), process.exit();
		else if (err.code == 'ETIMEDOUT') console.log('\x1b[31m%s\x1b[0m', '\n /!\\ Error ETIMEDOUT detected ! Your connexion took too much time to respond.'), process.exit();
		else if (err.message == 'Error: read ECONNRESET') console.log('\x1b[31m%s\x1b[0m', '\n /!\\ Error ECONNRESET detected ! Connexion shutdown or reset, verify your internet connexion !'), process.exit();
		else if (err.message == 'Error: unable to verify the first certificate') console.log('\x1b[33m%s\x1b[0m', '/!\\However, don\'t worry: if your relaunch it, the app will resume the parsing from last item parsed ;)'), process.exit();
		else console.log(err), console.log('\x1b[31m%s\x1b[0m', '/!\\Broken promise from getPageLinks'), process.exit();
	}
}

async function getItems(category, links, game) {
	try {
		const items = await gi.getItems(category, links, game);
		category = category.replace(/ /g, '');
		if (fs.existsSync('./data/links/resume.json')) fs.unlinkSync('./data/links/resume.json');
		if (fs.existsSync('./data/links/' + category + '_links.json')) fs.unlinkSync('./data/links/' + category + '_links.json');
		fsPath.writeFileSync('./data/' + game + '/' + category + '.json', JSON.stringify(items, null, 4));
		console.log('\x1b[32m%s\x1b[0m', '\n SUCCESS : ' + items.length + ' item(s) were crawled.');
		console.log('\x1b[33m%s\x1b[0m', 'File ' + category + '.json' + ' was generated under "data/" folder.');
		mongoImport(category);
		process.exit();
	} catch (err) {
		console.log('\x1b[31m%s\x1b[0m', '/!\\Broken promise from getItems in app.js'), console.log(err);
	}
}

function getLinksFromFile() {
	const links = JSON.parse(fs.readFileSync('./data/links/' + itemCategory + '_links.json', 'utf8'));
	return links;
}

function resumeLastParse() {
	console.log('\x1b[33m%s\x1b[0m', '/!\\Parsing resumed, let\'s continue the adventure :D');
	const resume = JSON.parse(fs.readFileSync('./data/links/resume.json', 'utf8'));
	getItems(resume.category, resume.links, resume.game);
}

function arboInit() {
	if (!fs.existsSync(process.cwd() + '/data/dofus-touch') && !fs.existsSync(process.cwd() + '/data/dofus') && !fs.existsSync(process.cwd() + '/data/links')) {
		fsPath.mkdirSync(process.cwd() + '/data');
		fsPath.mkdirSync(process.cwd() + '/data/dofus-touch');
		fsPath.mkdirSync(process.cwd() + '/data/dofus');
		fsPath.mkdirSync(process.cwd() + '/data/links');
	}
}

// For mongo format import /!\
function mongoImport(category) {
	let items = fs.readFileSync(process.cwd() + '/data/' + game + '/' + category + '.json', 'utf8');
	items = items.replace(/,{"_id"/g, '{"_id"');
	items = items.replace(/,null/g, '');
	items = items.substring(1, items.length - 1);
	fsPath.writeFileSync(process.cwd() + '/data/' + game + '/mongo/' + category + '_mongo.json', items);
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
}

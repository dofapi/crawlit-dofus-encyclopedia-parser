import * as fsPath from 'fs-path';
import * as fs from 'fs';
import errorHandler from '../services/errorHandler';

export function asciiArt() {
	console.log(' ▄████████    ▄████████    ▄████████  ▄█     █▄   ▄█        ▄█      ███     ');
	console.log('███    ███   ███    ███   ███    ███ ███     ███ ███       ███  ▀█████████▄ ');
	console.log('███    █▀    ███    ███   ███    ███ ███     ███ ███       ███▌    ▀███▀▀██ ');
	console.log('███         ▄███▄▄▄▄██▀   ███    ███ ███     ███ ███       ███▌     ███   ▀ ');
	console.log('███        ▀▀███▀▀▀▀▀   ▀███████████ ███     ███ ███       ███▌     ███     ');
	console.log('███    █▄  ▀███████████   ███    ███ ███     ███ ███       ███      ███     ');
	console.log('███    ███   ███    ███   ███    ███ ███ ▄█▄ ███ ███▌    ▄ ███      ███     ');
	console.log('████████▀    ███    ███   ███    █▀   ▀███▀███▀  █████▄▄██ █▀      ▄████▀   ');
}

export function to(promise) {
	return promise.then(data => {
		return [null, data];
	}).catch(err => [err]);
}

export function wait(ms) {
	const d = new Date();
	let d2 = null;
	do { d2 = new Date(); }
	while (d2 - d < ms);
}

export function arboInit() {
	if (!fs.existsSync(process.cwd() + '/data/dofus-touch') && !fs.existsSync(process.cwd() + '/data/dofus') && !fs.existsSync(process.cwd() + '/data/links')) {
		fsPath.mkdirSync(process.cwd() + '/data');
		fsPath.mkdirSync(process.cwd() + '/data/dofus-touch');
		fsPath.mkdirSync(process.cwd() + '/data/dofus');
		fsPath.mkdirSync(process.cwd() + '/data/wakfu');
		fsPath.mkdirSync(process.cwd() + '/data/waven');
		fsPath.mkdirSync(process.cwd() + '/data/links');
	}
}

export function getLinksFromFile(itemCategory) {
	try {
		const links = JSON.parse(fs.readFileSync('./data/links/' + itemCategory + '_links.json', 'utf8'));
		return links;
	} catch (error) {
		new errorHandler(error);
	}
}
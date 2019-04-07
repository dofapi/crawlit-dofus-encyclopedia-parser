import fs from 'fs';
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
    mkdirSync(process.cwd() + '/data/dofus-touch', {recursive: true});
    mkdirSync(process.cwd() + '/data/dofus', {recursive: true});
    mkdirSync(process.cwd() + '/data/wakfu', {recursive: true});
    mkdirSync(process.cwd() + '/data/waven', {recursive: true});
    mkdirSync(process.cwd() + '/data/links', {recursive: true});
}

function mkdirSync(path, options) {
    if (!fs.existsSync(path)) fs.mkdirSync(path, options); 
}

export function getLinksFromFile(itemCategory) {
	try {
		const links = JSON.parse(fs.readFileSync('./data/links/' + itemCategory + '_links.json', 'utf8'));
		return links;
	} catch (error) {
		new errorHandler(error);
	}
}
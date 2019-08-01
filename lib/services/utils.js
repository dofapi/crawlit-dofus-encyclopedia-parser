import fs from 'fs';
import path from 'path';
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

function mkdirSync(dist, options = {}) {
	dist = path.resolve(dist);
	if (!fs.existsSync(dist)) {
		mkdirSync(path.dirname(dist), options);
		fs.mkdirSync(dist, options);
	}
}

export function writeFileSync(dist, content, options = {}) {
	dist = path.resolve(dist);
	mkdirSync(path.dirname(dist));
	fs.writeFileSync(dist, content, options);
}

export function getLinksFromFile(itemCategory) {
	try {
		return JSON.parse(fs.readFileSync('./data/links/' + itemCategory + '_links.json', 'utf8'));
	} catch (error) {
		new errorHandler(error);
	}
}

export function getQueryString(url) {
	const query = {};
	const split_url = url.split('?');

	if (split_url.length > 1) {
		split_url[1].split('&').forEach(param => {
			const [key, val] = param.split('=');
			query[key] = val;
		});
	}

	return query;
}

export function encodeQueryString(params) {
	return '?' + Object.keys(params).map(
		key => key + '=' + params[key]
	).join('&');
}

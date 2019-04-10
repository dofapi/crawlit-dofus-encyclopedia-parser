#!/usr/bin/env node

import fs from 'fs';
import { getCategory } from './modules/command-line/cmd';
import errorHandler from './services/errorHandler';
import { parserProcess, parserInit, getPageLinks } from './modules/global-parser/global-parser';
import { asciiArt } from './services/utils';
import { getLinksFromFile } from './services/utils';

(async function main() {
	asciiArt();
	const ifResume = fs.existsSync('./data/links/resume.json');
	try {
		const cmdResponse = ifResume === true ? await getCategory(ifResume) : JSON.parse(await getCategory(ifResume));
		if (cmdResponse !== 'yes') {
			parserInit(cmdResponse);
			await getPageLinks();
			const parsingInfo = await parserProcess(cmdResponse.category, getLinksFromFile(cmdResponse.category), cmdResponse.game);
			parsingFinished(parsingInfo);
		} else await resumeLastParse();
	} catch (err) {
		new errorHandler(err);
	}
})();

async function resumeLastParse() {
	try {
		console.log('\x1b[33m%s\x1b[0m', '/!\\Parsing resumed, let\'s continue the adventure :D');
		const resume = JSON.parse(fs.readFileSync('./data/links/resume.json', 'utf8'));
		const parsingInfo = await parserProcess(resume.category, resume.links, resume.game);
		parsingFinished(parsingInfo);
	} catch (error) {
		new errorHandler(error);
	}
}

function parsingFinished({ numberItemParsed, categoryName }) {
	console.log('\x1b[32m%s\x1b[0m', '\n SUCCESS : ' + numberItemParsed + ' item(s) were crawled.');
	console.log('\x1b[33m%s\x1b[0m', 'File ' + categoryName + '.json' + ' was generated under "data/" folder.');
	process.exit();
}
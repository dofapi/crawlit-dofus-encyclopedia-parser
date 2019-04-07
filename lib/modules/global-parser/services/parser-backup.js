import fs from 'fs';

function saveData(category, lastIndex, links, items, game) {
	category = category.replace(/ /g, '');
	const resume = resumeFileStructure(category, lastIndex, links, game);
	fs.writeFileSync('./data/' + game + '/' + category + '.json', JSON.stringify(items));
	fs.writeFileSync('./data/links/resume.json', JSON.stringify(resume));
	console.log('\x1b[33m%s\x1b[0m', '\n INFO : ' + items.length + ' item(s) were crawled.');
}

function resumeFileStructure(category, lastIndex, links, game) {
	if (fs.existsSync('./data/links/resume.json')) fs.unlinkSync('./data/links/resume.json');
	links = links.slice(lastIndex);
	const resume = { 'category': category, links: links, game: game };
	return resume;
}

export default saveData;
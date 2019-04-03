const inq = require('./interactive-shell/inquirer');
const inquirer = require('inquirer');
const commander = require('./command-line/commander');
const fs = require('fs');
const cliCategories = require('./conf/cliCategories');

let language = 'french';
let game = 'dofus';


function getCategory(ifResume) {
	if (ifResume) {
		return inquirer.prompt(cliCategories.resume).then(answers => {
			if (answers.resume === 'yes') return answers.resume;
			else fs.unlinkSync('./data/links/resume.json');
			return getCategory(false);
		});
	}
	else {
		return commander.getAnswersFromCommand(cliCategories.firstCategory, cliCategories.page, cliCategories.weapon, cliCategories.equipment) || inquirer.prompt(cliCategories.firstCategory).then(answers => {
			language = answers.language;
			game = answers.game;
			return switchCategory(answers.category);
		});
	}
}

function switchCategory(category) {
	switch (category) {
	case 'equipment':
		return inq.categoryEquipment(language, game);
	case 'weapon':
		return inq.categoryWeapon(language, game);
	case 'set':
		return inq.categorySet(language, game);
	case 'mount':
		return inq.categoryMount(language, game);
	case 'pet':
		return inq.categoryPet(language, game);
	case 'resource':
		return inq.categoryResource(language, game);
	case 'consumable':
		return inq.categoryConsumable(language, game);
	case 'profession':
		return inq.categoryProfession(language, game);
	case 'monster':
		return inq.categoryMonster(language, game);
	case 'harness':
		return inq.categoryHarness(language, game);
	case 'classe':
		return inq.categoryClasse(language, game);
	case 'idol':
		return inq.categoryIdol(language, game);
	default:
		console.log('Sorry, we are out of ' + category + '.');
	}
}

module.exports = { switchCategory, getCategory };
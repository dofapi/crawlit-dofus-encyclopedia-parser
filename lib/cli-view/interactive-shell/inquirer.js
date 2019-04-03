const inquirer = require('inquirer');
const cliCategories = require('../conf/cliCategories');

function categoryEquipment(language, game) {
	return inquirer.prompt(cliCategories.equipment).then(answers => {
		answers.language = language;
		answers.game = game;
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryWeapon(language, game) {
	return inquirer.prompt(cliCategories.weapon).then(answers => {
		answers.language = language;
		answers.game = game;
		return JSON.stringify(answers, null, '  ');
	});
}

function categorySet(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'set';
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryMount(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'mount';
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryPet(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'pet';
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryResource(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'resource';
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryConsumable(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'consumable';
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryProfession(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'profession';
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryMonster(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'monster';
		return JSON.stringify(answers, null, '  ');
	});
}

function categoryHarness(language, game) {
	return inquirer.prompt(cliCategories.page).then(answers => {
		answers.language = language;
		answers.game = game;
		answers.category = 'harness';
		return JSON.stringify(answers, null, '  ');
	});
}
module.exports = { categoryConsumable, categoryEquipment, categoryHarness, categoryMonster, categoryMount, categoryPet, categoryProfession, categoryResource, categorySet, categoryWeapon };
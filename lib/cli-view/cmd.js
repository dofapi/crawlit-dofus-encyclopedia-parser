const inq = require('./interactive-shell/inquirer');
const inquirer = require('inquirer');
const commander = require('./command-line/commander');
let language = 'french';
let game = 'dofus';

const firstCategory = [
	{
		type: 'list',
		name: 'language',
		message: 'Which version of Dofus encyclopedia you want to parse ?',
		choices: ['French', 'English'],
		filter: function (val) {
			return val.toLowerCase();
		}
	},
	{
		type: 'list',
		name: 'game',
		message: 'Which game you want to parse ?',
		choices: ['Dofus', 'Dofus-Touch'],
		filter: function (val) {
			return val.toLowerCase();
		}
	},
	{
		type: 'list',
		name: 'category',
		message: 'What\'s item\'s category you want to parse ?',
		choices: ['Equipment', 'Weapon', 'Set', 'Pet', 'Mount', 'Resource', 'Consumable', 'Monster', 'Profession', 'Harness'],
		filter: function (val) {
			return val.toLowerCase();
		}
	}
];

const equipment = [
	{
		type: 'list',
		name: 'category',
		message: 'What\'s equipment\'s category / subcategory you want to parse ?',
		choices: ['ALL EQUIPMENTS', 'Helmet', 'Cloak', 'Amulet', 'Boot', 'Ring', 'Belt', 'Backpack', 'Shield', 'Trophy', 'Dofus'],
		filter: function (val) {
			return val.toLowerCase().replace(/ /g, '');
		}
	},
	{
		type: 'confirm',
		name: 'all',
		message: 'Do you want to parse [ALL/MAX] items of the category ?'
	},
	{
		type: 'input',
		name: 'maxItem',
		message: 'How many items do you want to parse ?',
		default: '1',
		when: function (answers) {
			return !answers.all;
		},
		validate: function (value) {
			const valid = !isNaN(parseFloat(value));
			return valid || 'Please enter a number';
		},
		filter: Number
	}
];

const weapon = [
	{
		type: 'list',
		name: 'category',
		message: 'What\'s weapon\'s category / subcategory you want to parse ?',
		choices: ['ALL WEAPONS', 'Sword', 'Dagger', 'Axe', 'Bow', 'Hammer', 'Pickaxe', 'Scythe', 'Shovel', 'Soul stone', 'Staff', 'Tool', 'Wand'],
		filter: function (val) {
			return val.toLowerCase().replace(/ /g, '');
		}
	},
	{
		type: 'confirm',
		name: 'all',
		message: 'Do you want to parse [ALL/MAX] items of the category ?'
	},
	{
		type: 'input',
		name: 'maxItem',
		message: 'How many items do you want to parse ?',
		default: '1',
		when: function (answers) {
			return !answers.all;
		},
		validate: function (value) {
			const valid = !isNaN(parseFloat(value));
			return valid || 'Please enter a number';
		},
		filter: Number
	}
];

const page = [
	{
		type: 'confirm',
		name: 'all',
		message: 'Do you want to parse [ALL/MAX] items of the category ?'
	},
	{
		type: 'input',
		name: 'maxItem',
		message: 'How many items do you want to parse ?',
		default: '1',
		when: function (answers) {
			return !answers.all;
		},
		validate: function (value) {
			const valid = !isNaN(parseFloat(value));
			return valid || 'Please enter a number';
		},
		filter: Number
	}
];

const resume = [
	{
		type: 'list',
		name: 'resume',
		message: 'Do you want to resume your last parse ?',
		choices: ['Yes', 'No'],
		filter: function (val) {
			return val.toLowerCase();
		}
	}
];

function getCategory(ifResume) {
	if (ifResume) {
		return inquirer.prompt(resume).then(answers => {
			if (answers.resume === 'yes') return answers.resume;
			else fs.unlinkSync('./data/links/resume.json');
			return getCategory(false);
		});
	}
	else {
		return commander.getAnswersFromCommand(firstCategory, page, weapon, equipment) || inquirer.prompt(firstCategory).then(answers => {
			language = answers.language;
			game = answers.game;
			return switchCategory(answers.category);
		});
	}
};

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
		default:
			console.log('Sorry, we are out of ' + category + '.');
	}
}

module.exports = { switchCategory, page, firstCategory, resume, weapon, equipment, getCategory };
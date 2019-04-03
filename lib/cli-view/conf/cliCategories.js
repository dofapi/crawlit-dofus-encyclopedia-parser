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
		choices: ['Equipment', 'Weapon', 'Set', 'Pet', 'Mount', 'Resource', 'Consumable', 'Monster', 'Profession', 'Harness', 'Classe', 'Idol'],
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


module.exports = { page, firstCategory, resume, weapon, equipment };
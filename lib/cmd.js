var inquirer = require('inquirer');
var cr = require('./main');

'use strict';

var questions = [
  {
    type: 'list',
    name: 'category',
    message: 'What\'s item\'s category you want to crawl ?',
    choices: ['Helmet', 'Cloak', 'Amulet', 'Boot', 'Ring', 'Belt', 'Backpack', 'Shield', 'Trophy', 'Dofus'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'pages',
    message: 'How many page do you want de crawl ?',
	default: '1',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
  }
];
var cmd = exports.cmd = function() {
	console.log( " ▄████▄   ██▀███   ▄▄▄       █     █░ ██▓     ██▓▄▄▄█████▓");
	console.log( "▒██▀ ▀█  ▓██ ▒ ██▒▒████▄    ▓█░ █ ░█░▓██▒    ▓██▒▓  ██▒ ▓▒");
	console.log( "▒▓█    ▄ ▓██ ░▄█ ▒▒██  ▀█▄  ▒█░ █ ░█ ▒██░    ▒██▒▒ ▓██░ ▒░");
	console.log( "▒▓▓▄ ▄██▒▒██▀▀█▄  ░██▄▄▄▄██ ░█░ █ ░█ ▒██░    ░██░░ ▓██▓ ░ ");
	console.log( "▒ ▓███▀ ░░██▓ ▒██▒ ▓█   ▓██▒░░██▒██▓ ░██████▒░██░  ▒██▒ ░ ");
	console.log( "░ ░▒ ▒  ░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ▓░▒ ▒  ░ ▒░▓  ░░▓    ▒ ░░   ");
	console.log( "  ░  ▒     ░▒ ░ ▒░  ▒   ▒▒ ░  ▒ ░ ░  ░ ░ ▒  ░ ▒ ░    ░    ");
	console.log( "░          ░░   ░   ░   ▒     ░   ░    ░ ░    ▒ ░  ░      ");
	console.log( "░ ░         ░           ░  ░    ░        ░  ░ ░           ");
	console.log( "░                                                         ");
	
	inquirer.prompt(questions).then(answers => {
	  var cmdResponse = JSON.stringify(answers, null, '  ');
	  cr.crawl(cmdResponse);
	});
}
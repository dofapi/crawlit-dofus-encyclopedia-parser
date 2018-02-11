var inquirer = require('inquirer');
var cr = require('./app');
var figlet = require('figlet');

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
  console.log(figlet.textSync('Crawlit', {
      font: 'Delta Corps Priest 1',
      horizontalLayout: 'default',
      verticalLayout: 'default'
  }));
	
	inquirer.prompt(questions).then(answers => {
    console.log(require.main.filename);
	  var cmdResponse = JSON.stringify(answers, null, '  ');
	  cr.crawl(cmdResponse);
	});
}
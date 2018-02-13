var inquirer = require('inquirer');

var firstCategory = {
  type: 'list',
    name: 'category',
    message: 'What\'s item\'s category you want to crawl ?',
    choices: ['Equipment', 'Weapon', 'Pet', 'Mount', 'Class'],
    filter: function(val) {
      return val.toLowerCase();
    }
};

var equipment = {
  type: 'list',
    name: 'category',
    message: 'What\'s equipment\'s category you want to crawl ?',
    choices: ['Helmet', 'Cloak', 'Amulet', 'Boot', 'Ring', 'Belt', 'Backpack', 'Shield', 'Trophy', 'Dofus', 'Weapon'],
    filter: function(val) {
      return val.toLowerCase();
    }
};

var weapon = {
  type: 'list',
    name: 'category',
    message: 'What\'s weapon\'s category you want to crawl ?',
    choices: ['Sword', 'Dagger', 'Axe', 'Bow', 'Hammer', 'Pickaxe', 'Scythe', 'Shovel', 'Soul stone', 'Staff', 'Tool', 'Wand'],
    filter: function(val) {
      return val.toLowerCase();
    }
};

var getCategory = exports.getCategory = function() {
  inquirer.prompt(firstCategory).then(answers => {
      switchCategory(answers.category);
  });
}

function switchCategory(category) {
  switch (category) {
    case 'equipment':
      categoryEquipment();
      break;
    case 'weapon':
      categoryWeapon();
      break;
    default:
      console.log('Sorry, we are out of ' + category + '.');
}

function categoryEquipment() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(equipment).then(answers => {
      var category = JSON.stringify(answers.category, null, '  ');
      return category;
    });
  });
}

function categoryWeapon() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(weapon).then(answers => {
      var category = JSON.stringify(answers.category, null, '  ');
      return category;
    });
  });
}

function encounter2b() {
  inquirer
    .prompt({
      type: 'list',
      name: 'weapon',
      message: 'Pick one',
      choices: [
        'Use the stick',
        'Grab a large rock',
        'Try and make a run for it',
        'Attack the wolf unarmed'
      ]
    })
    .then(() => {
      console.log('The wolf mauls you. You die. The end.');
    });
}

main();



var inquirer = require('inquirer');
var cr = require('./app');
var figlet = require('figlet');

'use strict';

var questions = [
  {
    type: 'list',
    name: 'category',
    message: 'What\'s item\'s category you want to crawl ?',
    choices: ['Helmet', 'Cloak', 'Amulet', 'Boot', 'Ring', 'Belt', 'Backpack', 'Shield', 'Trophy', 'Dofus', 'Weapon'],
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
  
  return new Promise(function(resolve, reject) {
    inquirer.prompt(questions).then(answers => {
      var cmdResponse = JSON.stringify(answers, null, '  ');
      resolve(cmdResponse);
    });
  });
  
}
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

var equipment = [
  {
    type: 'list',
      name: 'category',
      message: 'What\'s equipment\'s subcategory you want to crawl ?',
      choices: ['All', 'Helmet', 'Cloak', 'Amulet', 'Boot', 'Ring', 'Belt', 'Backpack', 'Shield', 'Trophy', 'Dofus'],
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

var weapon = [
  {
    type: 'list',
      name: 'category',
      message: 'What\'s weapon\'s subcategory you want to crawl ?',
      choices: ['[All]', 'Sword', 'Dagger', 'Axe', 'Bow', 'Hammer', 'Pickaxe', 'Scythe', 'Shovel', 'Soul stone', 'Staff', 'Tool', 'Wand'],
      filter: function(val) {
        return val.toLowerCase().replace('/\b[\b/gi', '').replace('/\b]\b/gi', '');
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

var getCategory = exports.getCategory = function() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(firstCategory).then(answers => {
         resolve(switchCategory(answers.category));
    });
  });
}

function switchCategory(category) {
  switch (category) {
    case 'equipment':
      return categoryEquipment();
      break;
    case 'weapon':
      return categoryWeapon();
      break;
    default:
      console.log('Sorry, we are out of ' + category + '.');
    }
}

function categoryEquipment() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(equipment).then(answers => {
      var category = JSON.stringify(answers, null, '  ');
      resolve(category);
    });
  });
}

function categoryWeapon() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(weapon).then(answers => {
      var category = JSON.stringify(answers, null, '  ');
      resolve(category);
    });
  });
}
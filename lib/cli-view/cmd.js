var inquirer = require('inquirer');

var firstCategory = {
  type: 'list',
    name: 'category',
    message: 'What\'s item\'s category you want to crawl ?',
    choices: ['Equipment', 'Weapon', 'Set', 'Pet', 'Mount', 'Class'],
    filter: function(val) {
      return val.toLowerCase();
    }
};

var equipment = [
  {
    type: 'list',
      name: 'category',
      message: 'What\'s equipment\'s subcategory you want to crawl ?',
      choices: ['ALL EQUIPMENTS', 'Helmet', 'Cloak', 'Amulet', 'Boot', 'Ring', 'Belt', 'Backpack', 'Shield', 'Trophy', 'Dofus'],
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
      choices: ['ALL WEAPONS', 'Sword', 'Dagger', 'Axe', 'Bow', 'Hammer', 'Pickaxe', 'Scythe', 'Shovel', 'Soul stone', 'Staff', 'Tool', 'Wand'],
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

var set = [
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

var mount = [
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
    case 'set':
      return categorySet();
      break;
    case 'mount':
      return categoryMount();
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

function categorySet() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(set).then(answers => {
      answers.category = 'set';
      var category = JSON.stringify(answers, null, '  ');
      resolve(category);
    });
  });
}

function categoryMount() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(mount).then(answers => {
      answers.category = 'mount';
      var category = JSON.stringify(answers, null, '  ');
      resolve(category);
    });
  });
}
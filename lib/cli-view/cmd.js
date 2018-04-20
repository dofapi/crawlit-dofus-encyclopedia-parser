var inquirer = require('inquirer');
var fs = require('fs');
var language = 'french';
var game = 'dofus';
var firstCategory = [
  {
    type: 'list',
      name: 'language',
      message: 'Which version of Dofus encyclopedia you want to parse ?',
      choices: ['French', 'English'],
      filter: function(val) {
        return val.toLowerCase();
      }
  },
  {
    type: 'list',
      name: 'game',
      message: 'Which game you want to parse ?',
      choices: ['Dofus', 'Dofus-Touch'],
      filter: function(val) {
        return val.toLowerCase();
      }
  },
  {
    type: 'list',
      name: 'category',
      message: 'What\'s item\'s category you want to parse ?',
      choices: ['Equipment', 'Weapon', 'Set', 'Pet', 'Mount', 'Resource', 'Consumable'],
      filter: function(val) {
        return val.toLowerCase();
      }
  }
];

var equipment = [
  {
    type: 'list',
      name: 'category',
      message: 'What\'s equipment\'s subcategory you want to parse ?',
      choices: ['ALL EQUIPMENTS', 'Helmet', 'Cloak', 'Amulet', 'Boot', 'Ring', 'Belt', 'Backpack', 'Shield', 'Trophy', 'Dofus'],
      filter: function(val) {
        return val.toLowerCase().replace(/ /g,'');
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
    when: function(answers) {
      return !answers.all;
    },
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
      message: 'What\'s weapon\'s subcategory you want to parse ?',
      choices: ['ALL WEAPONS', 'Sword', 'Dagger', 'Axe', 'Bow', 'Hammer', 'Pickaxe', 'Scythe', 'Shovel', 'Soul stone', 'Staff', 'Tool', 'Wand'],
      filter: function(val) {
        return val.toLowerCase().replace(/ /g,'');
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
    when: function(answers) {
      return !answers.all;
    },
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
  }
];

var page = [
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
    when: function(answers) {
      return !answers.all;
    },
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
  }
];

var resume = [
  {
    type: 'list',
      name: 'resume',
      message: 'Do you want to resume your last parse ?',
      choices: ['Yes', 'No'],
      filter: function(val) {
        return val.toLowerCase();
      }
  }
];

var getCategory = exports.getCategory = function(ifResume) {
  if(ifResume) {
    return inquirer.prompt(resume).then(answers => {
      if(answers.resume == 'yes') return answers.resume;
      else fs.unlinkSync('./data/links/resume.json')
      return getCategory(false);
    });
  }
  else{
    return inquirer.prompt(firstCategory).then(answers => {
      language = answers.language;
      game = answers.game;
      return switchCategory(answers.category);
    });
  }
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
    case 'pet':
      return categoryPet();
      break;
    case 'resource':
      return categoryResource();
      break;
    case 'consumable':
      return categoryConsumable();
      break;
    default:
      console.log('Sorry, we are out of ' + category + '.');
    }
}

function categoryEquipment() {
  return inquirer.prompt(equipment).then(answers => {
    answers.language = language;
    answers.game = game;
    var category = JSON.stringify(answers, null, '  ');
    return category;
  });
}

function categoryWeapon() {
  return inquirer.prompt(weapon).then(answers => {
    answers.language = language;
    answers.game = game;
    var category = JSON.stringify(answers, null, '  ');
    return category;
  });
}

function categorySet() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'set';
    var category = JSON.stringify(answers, null, '  ');
    return category;
  });
}

function categoryMount() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'mount';
    var category = JSON.stringify(answers, null, '  ');
    return category;
  });
}

function categoryPet() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'pet';
    var category = JSON.stringify(answers, null, '  ');
    return category;
  });
}

function categoryResource() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'resource';
    var category = JSON.stringify(answers, null, '  ');
    return category;
  });
}
function categoryConsumable() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'consumable';
    var category = JSON.stringify(answers, null, '  ');
    return category;
  });
}
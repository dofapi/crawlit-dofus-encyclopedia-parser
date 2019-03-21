var inquirer = require('inquirer');
var commander = require('commander');
var fs = require('fs');
var language = 'french';
var game = 'dofus';
var firstCategory = [
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

var equipment = [
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
    when: function (answers) {
      return !answers.all;
    },
    validate: function (value) {
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
    filter: function (val) {
      return val.toLowerCase();
    }
  }
];


/**
 * Add an command option based on the inquirer options
 * @param type {String}
 * @param name {String} [Required]
 * @param message {String}
 * @param choices {Array}
 * @param filter {Function} [Required]
 * @param commander {commander.Command} [Required]
 * @param alternativeChoices {Array}
 */
function addOption({type, name, message, choices, filter}, commander, alternativeChoices = undefined) {
  let flag, description;
  if (type === 'confirm') {
    flag = `-${name[0]}, --${name}`;
  } else {
    flag = `-${name[0]}, --${name} <${name}>`;
  }
  if (alternativeChoices) {
    description = `(${alternativeChoices.map(filter).join('|')}) ${message}`;
  } else if (choices) {
    description = `(${choices.map(filter).join('|')}) ${message}`
  } else {
    description = message;
  }
  commander.option(
    flag,
    description,
    filter
  );
}

// Get answers based on command line options
function getAnswersFromCommand() {
  const answers = {};

  // TODO Don't forget to remove 'equipment' and 'weapon' if firstCategory[2].choices change sometime.
  // .slice(2) is here to remove 'equipment' and 'weapon' because they are not valid categories
  // TODO add new category type here if they don't match firstCategory, equipment or weapon submenu
  const allChoices = [...firstCategory[2].choices.slice(2), ...equipment[0].choices, ...weapon[0].choices];

  addOption(firstCategory[0], commander);
  addOption(firstCategory[1], commander);
  addOption(equipment[0], commander, allChoices); //equipment[0] or weapon[0] works : we need use filter() of those variable and not filter() of firstCategory
  page.forEach(question => {
    addOption(question, commander)
  });

  commander.action((command) => {
    ['language', 'game', 'category', 'maxItem', 'all'].forEach(
        name => {
          switch (name) {
            case 'language':
              if (firstCategory[0].choices.map(firstCategory[0].filter).some(choice => choice=== command[name]))
                answers[name] = command[name];
              break;
            case 'game':
              if (firstCategory[1].choices.map(firstCategory[1].filter).some(choice => choice=== command[name]))
                answers[name] = command[name];
              break;
            case 'category':
              if (allChoices.map(equipment[0].filter).some(choice => choice === command[name]))
                answers[name] = command[name];
              break;
            case 'maxItem':
              if (Number.isInteger(command[name]))
                answers[name] = command[name];
              break;
            case 'all':
                answers[name] = command[name];
              break;
          }
        }
    );
  });

  commander.parse(process.argv);

  if (answers.language &&
      answers.game &&
      answers.category &&
      (answers.maxItem || answers.all)) {

    console.log('\x1b[33m%s\x1b[0m', `Your options :\n - language : ${answers.language}\n - game : ${answers.game}\n - category : ${answers.category}\n - number of items : ${answers.all ? 'all' : answers.maxItem}`);
    return Promise.resolve(JSON.stringify(answers)); // Caller of getCategory expects a promise returning JSON
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'One of your parameter is missing or wrong, please use -h, --help to know all parameters and their options');
    return null;
  }
}

var getCategory = exports.getCategory = function (ifResume) {
  if (ifResume) {
    return inquirer.prompt(resume).then(answers => {
      if (answers.resume == 'yes') return answers.resume;
      else fs.unlinkSync('./data/links/resume.json')
      return getCategory(false);
    });
  }
  else {
    return getAnswersFromCommand() || inquirer.prompt(firstCategory).then(answers => {
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
    case 'profession':
      return categoryProfession();
      break;
    case 'monster':
      return categoryMonster();
      break;
    case 'harness':
      return categoryHarness();
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

function categoryProfession() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'profession';
    return JSON.stringify(answers, null, '  ');
  });
}

function categoryMonster() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'monster';
    return JSON.stringify(answers, null, '  ');
  });
}

function categoryHarness() {
  return inquirer.prompt(page).then(answers => {
    answers.language = language;
    answers.game = game;
    answers.category = 'harness';
    return JSON.stringify(answers, null, '  ');
  });
}

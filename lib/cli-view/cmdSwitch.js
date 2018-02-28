var cmdSwitch = exports.cmdSwitch = function(category) {
	switch (category) {
	  case 'all encyclopedia':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?';
		break;
	  case 'all equipments':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?';
		break;
	  case 'helmet':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=16&';
		break;
	  case 'cloak':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=17&';
		break;
	  case 'amulet':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id[0]=1&';
		break;
	  case 'boot':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=11&';
		break;
	  case 'ring':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=9&';
		break;
	  case 'belt':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=10&';
		break;
	  case 'backpack':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=81&';
		break;
	  case 'shield':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=82&';
		break;
	  case 'trophy':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=151&';
		break;
	  case 'dofus':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=23&';
		break;
	  case 'all weapons':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?';
		break;
	  case 'sword':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=6&';
		break;
	  case 'dagger':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=5&';
		break;
	  case 'axe':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=19&';
		break;
	  case 'bow':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=2&';
		break;
	  case 'hammer':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=7&';
		break;
	  case 'pickaxe':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=21&';
		break;
	  case 'scythe':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=22&';
		break;
	  case 'shovel':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=8&';
		break;
	  case 'soul stone':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=83&';
		break;
	  case 'staff':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=4&';
		break;
	  case 'tool':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=20&';
		break;
	  case 'wand':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=3&';
		break;
	  case 'set':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/panoplies?';
		break;
	  case 'mount':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/montures?';
		break;
	  case 'pet':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/familiers?';
		break;
	  default:
		console.log('Sorry, we are out of ' + category + '.');
	}
	return url;
}

var cmdSwitchEn = exports.cmdSwitchEn = function(category) {
	switch (category) {
	  case 'all encyclopedia':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment';
		break;
	  case 'all equipments':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment';
		break;
	  case 'helmet':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=16&';
		break;
	  case 'cloak':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=17&';
		break;
	  case 'amulet':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id[0]=1&';
		break;
	  case 'boot':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=11&';
		break;
	  case 'ring':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=9&';
		break;
	  case 'belt':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=10&';
		break;
	  case 'backpack':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=81&';
		break;
	  case 'shield':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=82&';
		break;
	  case 'trophy':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=151&';
		break;
	  case 'dofus':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=23&';
		break;
	  case 'all weapons':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?';
		break;
	  case 'sword':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=6&';
		break;
	  case 'dagger':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=5&';
		break;
	  case 'axe':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=19&';
		break;
	  case 'bow':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=2&';
		break;
	  case 'hammer':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=7&';
		break;
	  case 'pickaxe':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=21&';
		break;
	  case 'scythe':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=22&';
		break;
	  case 'shovel':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=8&';
		break;
	  case 'soul stone':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=83&';
		break;
	  case 'staff':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=4&';
		break;
	  case 'tool':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=20&';
		break;
	  case 'wand':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=3&';
		break;
	  case 'set':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/sets?';
		break;
	  case 'mount':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/mounts?';
		break;
	  case 'pet':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/pets?';
		break;
	  default:
		console.log('Sorry, we are out of ' + category + '.');
	}
	return url;
}
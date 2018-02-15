var cmdSwitch = exports.cmdSwitch = function(category) {
	switch (category) {
	  case 'all encyclopedia':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?';
		break;
	  case 'all equipments':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?';
		break;
	  case 'helmet':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=16&';
		break;
	  case 'cloak':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=17&';
		break;
	  case 'amulet':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id[0]=1&';
		break;
	  case 'boot':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=11&';
		break;
	  case 'ring':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=9&';
		break;
	  case 'belt':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=10&';
		break;
	  case 'backpack':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=81&';
		break;
	  case 'shield':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=82&';
		break;
	  case 'trophy':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=151&';
		break;
	  case 'dofus':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=23&';
		break;
	  case 'all weapons':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?';
		break;
	  case 'sword':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=6&';
		break;
	  case 'dagger':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=5&';
		break;
	  case 'axe':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=19&';
		break;
	  case 'bow':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=2&';
		break;
	  case 'hammer':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=7&';
		break;
	  case 'pickaxe':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=21&';
		break;
	  case 'scythe':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=22&';
		break;
	  case 'shovel':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=8&';
		break;
	  case 'soul stone':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=83&';
		break;
	  case 'staff':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=4&';
		break;
	  case 'tool':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=20&';
		break;
	  case 'wand':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=3&';
		break;
	  case 'set':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/panoplies?';
		break;
	  case 'mount':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/montures?';
		break;
	  case 'pet':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/familiers?';
		break;
	  default:
		console.log('Sorry, we are out of ' + category + '.');
	}
	return url;
}
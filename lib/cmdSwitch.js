var cmdSwitch = exports.cmdSwitch = function(category) {
	switch (category) {
	  case 'all':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements';
		// console.log(url);
		break;
	  case 'helmet':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=16&';
		// console.log(url);
		break;
	  case 'cloak':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=17&';
		// console.log(url);
		break;
	  case 'amulet':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id[0]=1&';
		// console.log(url);
		break;
	  case 'boot':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=11&';
		// console.log(url);
		break;
	  case 'ring':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=9&';
		// console.log(url);
		break;
	  case 'belt':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=10&';
		// console.log(url);
		break;
	  case 'backpack':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=81&';
		// console.log(url);
		break;
	  case 'shield':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=82&';
		// console.log(url);
		break;
	  case 'trophy':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=151&';
		// console.log(url);
		break;
	  case 'dofus':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=23&';
		// console.log(url);
		break;
	  case 'all':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes';
		// console.log(url);
		break;
	  case 'sword':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=6&';
		// console.log(url);
		break;
	  case 'dagger':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=5&';
		// console.log(url);
		break;
	  case 'axe':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=19&';
		// console.log(url);
		break;
	  case 'bow':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=2&';
		// console.log(url);
		break;
	  case 'hammer':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=7';
		// console.log(url);
		break;
	  case 'pickaxe':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=21&';
		// console.log(url);
		break;
	  case 'scythe':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=22&';
		// console.log(url);
		break;
	  case 'shovel':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=8&';
		// console.log(url);
		break;
	  case 'soul stone':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=83&';
		// console.log(url);
		break;
	  case 'staff':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=4&';
		// console.log(url);
		break;
	  case 'tool':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=20&';
		// console.log(url);
		break;
	  case 'wand':
		url = 'http://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=3&';
		// console.log(url);
		break;
	  default:
		console.log('Sorry, we are out of ' + category + '.');
	}
	return url;
}
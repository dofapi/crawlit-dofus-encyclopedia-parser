var cmdSwitch = exports.cmdSwitch = function(category) {
	switch (category) {
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
	  default:
		console.log('Sorry, we are out of ' + category + '.');
	}
	return url;
}
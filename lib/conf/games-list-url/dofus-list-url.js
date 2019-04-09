let url = '';

function urlSwitcherFr(category) {
	switch (category) {
	case 'allencyclopedia':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?size=3000';
		break;
	case 'allequipments':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?size=3000';
		break;
	case 'helmet':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=16&size=500';
		break;
	case 'cloak':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=17&size=500';
		break;
	case 'amulet':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id[0]=1&size=500';
		break;
	case 'boot':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=11&size=500';
		break;
	case 'ring':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=9&size=500';
		break;
	case 'belt':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=10&size=500';
		break;
	case 'backpack':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=81&size=500';
		break;
	case 'shield':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=82&size=500';
		break;
	case 'trophy':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=151&size=500';
		break;
	case 'dofus':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/equipements?text=&type_id%5B%5D=23&size=500';
		break;
	case 'allweapons':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?size=3000';
		break;
	case 'sword':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=6&size=500';
		break;
	case 'dagger':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=5&size=500';
		break;
	case 'axe':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=19&size=500';
		break;
	case 'bow':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=2&size=500';
		break;
	case 'hammer':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=7&size=500';
		break;
	case 'pickaxe':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=21&size=500';
		break;
	case 'scythe':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=22&size=500';
		break;
	case 'shovel':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=8&size=500';
		break;
	case 'soulstone':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=83&size=500';
		break;
	case 'staff':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=4&size=500';
		break;
	case 'tool':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=20&size=500';
		break;
	case 'wand':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/armes?text=&type_id[]=3&size=500';
		break;
	case 'set':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/panoplies?size=500';
		break;
	case 'mount':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/montures?size=500';
		break;
	case 'pet':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/familiers?size=500';
		break;
	case 'resource':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/ressources?size=3000';
		break;
	case 'consumable':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/consommables?size=3000';
		break;
	case 'profession':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/metiers?size=500&display=table';
		break;
	case 'monster':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/monstres?size=3000';
		break;
	case 'harness':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/harnachements?size=150';
		break;
	case 'classe':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/classes';
		break;
	case 'idol':
		url = 'https://www.dofus.com/fr/mmorpg/encyclopedie/idoles?size=100';
		break;

	default:
		console.log('Sorry, we are out of ' + category + '.');
	}
	return url;
}

function urlSwitcherEn(category) {
	switch (category) {
	case 'allencyclopedia':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?size=3000';
		break;
	case 'allequipments':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?size=3000';
		break;
	case 'helmet':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=16&size=500';
		break;
	case 'cloak':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=17&size=500';
		break;
	case 'amulet':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id[0]=1&size=500';
		break;
	case 'boot':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=11&size=500';
		break;
	case 'ring':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=9&size=500';
		break;
	case 'belt':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=10&size=500';
		break;
	case 'backpack':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=81&size=500';
		break;
	case 'shield':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=82&size=500';
		break;
	case 'trophy':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=151&size=500';
		break;
	case 'dofus':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment?text=&type_id%5B%5D=23&size=500';
		break;
	case 'allweapons':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?size=3000';
		break;
	case 'sword':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=6&size=500';
		break;
	case 'dagger':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=5&size=500';
		break;
	case 'axe':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=19&size=500';
		break;
	case 'bow':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=2&size=500';
		break;
	case 'hammer':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=7&size=500';
		break;
	case 'pickaxe':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=21&size=500';
		break;
	case 'scythe':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=22&size=500';
		break;
	case 'shovel':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=8&size=500';
		break;
	case 'soulstone':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=83&size=500';
		break;
	case 'staff':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=4&size=500';
		break;
	case 'tool':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=20&size=500';
		break;
	case 'wand':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/weapons?text=&type_id[]=3&size=500';
		break;
	case 'set':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/sets?size=500';
		break;
	case 'mount':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/mounts?size=500';
		break;
	case 'pet':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/pets?size=500';
		break;
	case 'resource':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/resources?size=3000';
		break;
	case 'consumable':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/consumables?size=3000';
		break;
	case 'profession':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/professions?size=500&display=table';
		break;
	case 'monster':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/monsters?size=3000';
		break;
	case 'harness':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/harnesses?size=150';
		break;
	case 'classe':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/classes';
		break;
	case 'idol':
		url = 'https://www.dofus.com/en/mmorpg/encyclopedia/idols?size=100';
		break;

	default:
		console.log('Sorry, we are out of ' + category + '.');
	}
	return url;
}

export default { urlSwitcherFr, urlSwitcherEn };

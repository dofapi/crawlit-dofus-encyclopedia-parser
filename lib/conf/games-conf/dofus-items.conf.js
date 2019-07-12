import getEquipments from '../../modules/category-parsers/dofus/parsers/getEquipments';
import getClasses from '../../modules/category-parsers/dofus/parsers/getClasses';
import getWeapons from '../../modules/category-parsers/dofus/parsers/getWeapons';
import getConsumables from '../../modules/category-parsers/dofus/parsers/getConsumables';
import getHarnesses from '../../modules/category-parsers/dofus/parsers/getHarnesses';
import getHavenBags from '../../modules/category-parsers/dofus/parsers/getHavenBags';
import getIdols from '../../modules/category-parsers/dofus/parsers/getIdols';
import getMounts from '../../modules/category-parsers/dofus/parsers/getMounts';
import getSets from '../../modules/category-parsers/dofus/parsers/getSets';
import getPets from '../../modules/category-parsers/dofus/parsers/getPets';
import getProfessions from '../../modules/category-parsers/dofus/parsers/getProfessions';
import getMonsters from '../../modules/category-parsers/dofus/parsers/getMonsters';
import getResources from '../../modules/category-parsers/dofus/parsers/getResources';

export default {
	'categories': [
		{
			'key': 'weapons',
			'lang': {
				'fr': 'armes',
				'en': 'weapons'
			},
			'function': getWeapons
		},
		{
			'key': 'equipments',
			'lang': {
				'fr': 'equipements',
				'en': 'equipment'
			},
			'function': getEquipments
		},
		{
			'key': 'sets',
			'lang': {
				'fr': 'panoplies',
				'en': 'sets'
			},
			'function': getSets
		},
		{
			'key': 'mounts',
			'lang': {
				'fr': 'montures',
				'en': 'mounts'
			},
			'function': getMounts
		},
		{
			'key': 'pets',
			'lang': {
				'fr': 'familiers',
				'en': 'pets'
			},
			'function': getPets
		},
		{
			'key': 'resources',
			'lang': {
				'fr': 'ressources',
				'en': 'resources'
			},
			'function': getResources
		},
		{
			'key': 'consumables',
			'lang': {
				'fr': 'consommables',
				'en': 'consumables'
			},
			'function': getConsumables
		},
		{
			'key': 'professions',
			'lang': {
				'fr': 'metiers',
				'en': 'professions'
			},
			'function': getProfessions
		},
		{
			'key': 'monsters',
			'lang': {
				'fr': 'monstres',
				'en': 'monsters'
			},
			'function': getMonsters
		},
		{
			'key': 'harnesses',
			'lang': {
				'fr': 'harnachements',
				'en': 'harnesses'
			},
			'function': getHarnesses
		},
		{
			'key': 'classes',
			'lang': {
				'fr': 'classes',
				'en': 'classes'
			},
			'function': getClasses
		},
		{
			'key': 'idols',
			'lang': {
				'fr': 'idoles',
				'en': 'idols'
			},
			'function': getIdols
		},
		{
			'key': 'havenbags',
			'lang': {
				'fr': 'havres-sacs',
				'en': 'haven-bags'
			},
			'function': getHavenBags
		}
	]
};
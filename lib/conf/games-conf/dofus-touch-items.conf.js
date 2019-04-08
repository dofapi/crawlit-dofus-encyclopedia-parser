import getEquipments from '../../modules/category-parsers/dofus-touch/parsers/getEquipments';
import getClasses from '../../modules/category-parsers/dofus-touch/parsers/getClasses';
import getWeapons from '../../modules/category-parsers/dofus-touch/parsers/getWeapons';
const getSets = require('../../modules/category-parsers/dofus-touch/parsers/getSets').getSets;
const getMounts = require('../../modules/category-parsers/dofus-touch/parsers/getMounts').getMounts;
const getPets = require('../../modules/category-parsers/dofus-touch/parsers/getPets').getPets;
const getResources = require('../../modules/category-parsers/dofus-touch/parsers/getResources').getResources;
const getMonsters = require('../../modules/category-parsers/dofus-touch/parsers/getMonsters').getMonsters;
const getConsumables = require('../../modules/category-parsers/dofus-touch/parsers/getConsumables').getConsumables;
const getProfessions = require('../../modules/category-parsers/dofus-touch/parsers/getProfessions').getProfessions;
const getHarnesses = require('../../modules/category-parsers/dofus-touch/parsers/getHarnesses').getHarnesses;
const getIdols = require('../../modules/category-parsers/dofus-touch/parsers/getIdols').getIdols;


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
		}
	]
};
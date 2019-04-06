import getEquipments from '../../modules/category-parsers/dofus/parser/getEquipments';
import getClasses from '../../modules/category-parsers/dofus/parser/getClasses';
const getWeapons = require('../../modules/category-parsers/dofus/parser/getWeapons').getWeapons;
const getSets = require('../../modules/category-parsers/dofus/parser/getSets').getSets;
const getMounts = require('../../modules/category-parsers/dofus/parser/getMounts').getMounts;
const getPets = require('../../modules/category-parsers/dofus/parser/getPets').getPets;
const getResources = require('../../modules/category-parsers/dofus/parser/getResources').getResources;
const getMonsters = require('../../modules/category-parsers/dofus/parser/getMonsters').getMonsters;
const getConsumables = require('../../modules/category-parsers/dofus/parser/getConsumables').getConsumables;
const getProfessions = require('../../modules/category-parsers/dofus/parser/getProfessions').getProfessions;
const getHarnesses = require('../../modules/category-parsers/dofus/parser/getHarnesses').getHarnesses;
const getIdols = require('../../modules/category-parsers/dofus/parser/getIdols').getIdols;


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
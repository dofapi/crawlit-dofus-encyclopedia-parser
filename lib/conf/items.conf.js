const getEquipments = require('../item-crawler/getEquipments').getEquipments;
const getWeapons = require('../item-crawler/getWeapons').getWeapons;
const getSets = require('../item-crawler/getSets').getSets;
const getMounts = require('../item-crawler/getMounts').getMounts;
const getPets = require('../item-crawler/getPets').getPets;
const getResources = require('../item-crawler/getResources').getResources;
const getMonsters = require('../item-crawler/getMonsters').getMonsters;
const getConsumables = require('../item-crawler/getConsumables').getConsumables;
const getProfessions = require('../item-crawler/getProfessions').getProfessions;
const getHarnesses = require('../item-crawler/getHarnesses').getHarnesses;


module.exports = {
	'categories': [
		{
			'key': 'weapons',
			'lang': {
				'fr': 'armes',
				'en': 'weapons'
			},
			'function': getWeapons
			,
		}, {
			'key': 'equipments',
			'lang': {
				'fr': 'equipements',
				'en': 'equipment'
			},
			'function': getEquipments
		}, {
			'key': 'sets',
			'lang': {
				'fr': 'panoplies',
				'en': 'sets'
			},
			'function': getSets
		}, {
			'key': 'mounts',
			'lang': {
				'fr': 'montures',
				'en': 'mounts'
			},
			'function': getMounts
		}, {
			'key': 'pets',
			'lang': {
				'fr': 'familiers',
				'en': 'pets'
			},
			'function': getPets
		}, {
			'key': 'resources',
			'lang': {
				'fr': 'ressources',
				'en': 'resources'
			},
			'function': getResources
		}, {
			'key': 'consumables',
			'lang': {
				'fr': 'consommables',
				'en': 'consumables'
			},
			'function': getConsumables
		}, {
			'key': 'professions',
			'lang': {
				'fr': 'metiers',
				'en': 'professions'
			},
			'function': getProfessions
		}, {
			'key': 'monsters',
			'lang': {
				'fr': 'monstres',
				'en': 'monsters'
			},
			'function': getMonsters
		}, {
			'key': 'harnesses',
			'lang': {
				'fr': 'harnachements',
				'en': 'harnesses'
			},
			'function': getHarnesses
		}
	]
};
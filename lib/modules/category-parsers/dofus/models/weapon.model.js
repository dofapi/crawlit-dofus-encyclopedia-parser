import { Item } from './item.model';

export default class Weapon extends Item {
	constructor(itemProperties, statistics, conditions, recipe, setId = null, characteristics) {
		super(itemProperties);
		this.conditions = conditions;
		this.statistics = statistics;
		this.characteristics = characteristics;
		this.recipe = recipe;
		this.setId = parseInt(setId, 10);
	}
}
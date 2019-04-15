import { Item } from './item.model';

export default class Equipment extends Item {
	constructor(itemProperties, spells, bonus, recipe, statistics) {
		super(itemProperties);
		this.statistics = statistics;
		this.spells = spells;
		this.bonus = bonus;
		this.recipe = recipe;
	}
}
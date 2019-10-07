import { Item } from './item.model';

export default class Equipment extends Item {
	constructor(itemProperties, statistics, conditions, recipe, setId = null) {
		super(itemProperties);
		this.statistics = statistics;
		this.conditions = conditions;
		this.recipe = recipe;
		this.setId = Number(setId);
	}
}
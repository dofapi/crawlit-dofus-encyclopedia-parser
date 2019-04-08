import { Item } from './item.model';

export default class Equipment extends Item {
	constructor(itemProperties, statistics, conditions, recipe, setId = null) {
		super(itemProperties);
		this.statistics = statistics;
		this.condition = conditions;
		this.recipe = recipe;
		this.setId = parseInt(setId, 10);
	}
}
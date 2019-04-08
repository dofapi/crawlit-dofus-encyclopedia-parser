import { Item } from './item.model';

export default class Equipment extends Item {
	constructor(itemProperties, stats, conditions, recipe, setId = null) {
		super(itemProperties);
		this.stats = stats;
		this.condition = conditions;
		this.recipe = recipe;
		this.setId = parseInt(setId, 10);
	}
}
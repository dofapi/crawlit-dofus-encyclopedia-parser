import { Item } from './item.model';

export default class Equipment extends Item {
	constructor(itemProperties, stats, condition, recipe, setId) {
		super(itemProperties);
		this.stats = stats;
		this.condition = condition;
		this.recipe = recipe;
		this.setId = parseInt(setId, 10);
	}
}
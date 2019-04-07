import { Item } from './item.model';

export default class Weapon extends Item {
	constructor(itemProperties, stats, condition, recipe, setId = 0, characteristic) {
		super(itemProperties);
		this.condition = condition;
		this.stats = stats;
		this.characteristic = characteristic;
		this.recipe = recipe;
		this.setId = parseInt(setId, 10);
	}
}
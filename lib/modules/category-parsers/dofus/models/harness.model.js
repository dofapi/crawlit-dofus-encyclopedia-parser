import { Item } from './item.model';

export default class Harness extends Item {
	constructor(itemProperties, recipe) {
		super(itemProperties);
		this.recipe = recipe;
	}
}
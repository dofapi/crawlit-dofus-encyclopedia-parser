import { Item } from './item.model';

export default class Resource extends Item {
	constructor(itemProperties, recipe) {
		super(itemProperties);
		this.recipe = recipe;
	}
}
import { Item } from './item.model';

export default class Pet extends Item {
	constructor(itemProperties, statistics, conditions) {
		super(itemProperties);
		this.statistics = statistics;
		this.conditions = conditions;
	}
}
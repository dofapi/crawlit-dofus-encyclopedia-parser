import { Item } from './item.model';

export default class Monster extends Item {
	constructor(itemProperties, statistics, resistances, areas, drops) {
		super(itemProperties);
		this.statistics = statistics;
		this.resistances = resistances;
		this.areas = areas;
		this.drops = drops;
	}
}
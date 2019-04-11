import { Item } from './item.model';

export default class Set extends Item {
	constructor(itemProperties, bonus, equipment_id = null, weapon_id = null) {
		super(itemProperties);
		this.bonus = bonus;
		this.equipment_id = equipment_id;
		this.weapon_id = weapon_id;
	}
}
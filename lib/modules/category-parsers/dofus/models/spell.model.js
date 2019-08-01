import { Item } from './item.model';


export default class Class extends Item {
	constructor(itemProperties) {
		super(itemProperties);
		this.imgUrl = null;
		this.required_level = 1;
		this.caracs = {
			pa: null,
			po: null,
			critical: null,
			cooldown: 0,
			per_turn_cast: null,
			per_player_turn_cast: 1,
			changeable_range: false,
			line_of_sight: true,
			line_cast: false,
			free_cell: false,
		};
		this.effects = [];
	}
}

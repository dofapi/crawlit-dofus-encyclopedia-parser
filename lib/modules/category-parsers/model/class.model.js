import { Item } from './item.model';

export default class Class extends Item {
	constructor(itemProperties, category, title, videoUrl, roles, gender, spells) {
		super(itemProperties);
		this.category = category;
		this.title = title;
		this.videoUrl = videoUrl;
		this.roles = roles;
		this.gender = gender;
		this.spells = spells;
	}
}
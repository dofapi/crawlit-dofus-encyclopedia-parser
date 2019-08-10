import { Item } from './item.model';

export default class Class extends Item {
	constructor(itemProperties, category, title, videoUrl, roles, spells, maleImg, femaleImg) {
		super(itemProperties);
		this.category = category;
		this.title = title;
		this.videoUrl = videoUrl;
		this.roles = roles;
		this.spells = spells;
		this.maleImg = maleImg;
		this.femaleImg = femaleImg;
	}
}
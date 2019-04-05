import { Item } from './item.model';

class Class extends Item {
	constructor(category, title, videoUrl, roles, gender, spells, _id, ankamaId, name, type, imgUrl, url, description) {
		super(_id, ankamaId, name, type, imgUrl, url, description);
		this.category = category;
		this.title = title;
		this.videoUrl = videoUrl;
		this.roles = roles;
		this.gender = gender;
		this.spells = spells;
	}
}

export default new Class();
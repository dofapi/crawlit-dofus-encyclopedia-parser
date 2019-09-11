export class Item {
	constructor({ _id = 0, ankamaId = 0, name, type, imgUrl, url, description, level = null }) {
		this._id = Number(ankamaId);
		this.ankamaId = Number(ankamaId);
		this.name = name;
		this.level = level;
		this.type = type;
		this.imgUrl = imgUrl;
		this.url = url;
		this.description = description;
	}
}
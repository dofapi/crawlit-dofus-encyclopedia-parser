export class Item {
	constructor({ _id, ankamaId = 0, name, type, imgUrl, url, description }) {
		this._id = parseInt(_id, 10);
		this.ankamaId = parseInt(ankamaId, 10);
		this.name = name;
		this.type = type;
		this.imgUrl = imgUrl;
		this.url = url;
		this.description = description;
	}
}
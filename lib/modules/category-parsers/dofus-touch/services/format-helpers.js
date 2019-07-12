module.exports = {
	getId: (url) => {
		const match = /\D+\/(\d+)-.+$/.exec(url);
		return match[1] ? parseInt(match[1], 10) : 0;
	},

	getElement: (stat) => {
		const regex = /(-?\d+)\s((de|à|to|and)? (-?\d+))?/gi;
		return stat.replace(regex, '').trim();
	},

	getDate: (date) => {
		return date.split(/:(.+)/)[1].trim();
	},

	sanatizer: (string) => {
		return string.replace(/(\\n)|(\(|\))/g, '').replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s\s+/g, ' ').trim();
	}
};

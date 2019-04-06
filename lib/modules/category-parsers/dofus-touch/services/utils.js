import cheerio from 'cheerio';

const requestOpts = {
	url: '',
	transform: function (body) {
		return cheerio.load(body);
	}
};

export default requestOpts;
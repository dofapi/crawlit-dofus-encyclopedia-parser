class errorHandler {
	constructor(error) {
		this.error = error;
		this.errorCategoryDispatcher();
	}

	errorCategoryDispatcher() {
		if (this.error.hasOwnProperty('name')) this.fetchByNameError(this.error.name);
		if (this.error.hasOwnProperty('code')) this.fetchByCodeError(this.error.code);
		if (this.error.hasOwnProperty('message')) this.fetchByMessageError(this.error.message);

		console.log('\x1b[31m%s\x1b[0m', '/!\\Something get wrong :(', this.error);
		process.exit();
	}

	fetchByCodeError(errCode) {
		switch (errCode) {
		case '429':
			console.log('\x1b[31m%s\x1b[0m', '\n/!\\Error 429 detected ! You reached maximum request per hour, over pass it will provoke a ban IP from Ankama. Resume the parsing after 1h !');
			break;
		case 'ETIMEDOUT':
			console.log('\x1b[31m%s\x1b[0m', '\n /!\\ Error ETIMEDOUT detected ! Your connexion took too much time to respond.');
			break;
		}
	}

	fetchByNameError(errName) {
		switch (errName) {
		case 'toto':
			console.log('\x1b[31m%s\x1b[0m', '\n /!\\ Error toto !');
			break;
		case 'tata':
			console.log('\x1b[33m%s\x1b[0m', '/!\\tata ;)');
			break;
		}
	}

	fetchByMessageError(errMessage) {
		switch (errMessage) {
		case 'Error: read ECONNRESET':
			console.log('\x1b[31m%s\x1b[0m', '\n /!\\ Error ECONNRESET detected ! Connexion shutdown or reset, verify your internet connexion !');
			break;
		case 'Error: unable to verify the first certificate':
			console.log('\x1b[33m%s\x1b[0m', '/!\\However, don\'t worry: if your relaunch it, the app will resume the parsing from last item parsed ;)');
			break;
		}
	}
}

export default errorHandler;
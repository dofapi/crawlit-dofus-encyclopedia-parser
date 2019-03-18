const { getId, getElement } = require('./helpers');

describe('parse itemId', () => {
	const runTest = (url, expectedValue) => {
		expect(getId(url)).toBe(expectedValue);
	};

	test('normal url', () => {
		runTest('https://www.dofus-touch.com/fr/mmorpg/encyclopedie/armes/8993-epee-maudite-saigneur-guerrier', 8993);
	});

	test('url with numbers in name', () => {
		runTest('https://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements/12797-bouclier-champion-641', 12797);
	});
});

describe('parse element from item stat', () => {
	const runTest = (stat, expectedValue) => {
		expect(getElement(stat)).toBe(expectedValue);
	};

	test('stat starting with a number range', () => {
		runTest('6 à 10 Vitalité', 'Vitalité');
	});

	test('stat containing a number range', () => {
		runTest('Vole 21 à 30 Kamas', 'Vole  Kamas');
	});

	test('stat starting with a number', () => {
		runTest('15 Prospection', 'Prospection');
	});

	test('stat with parenthesis like weapon damages', () => {
		runTest('9 à 14 (dommages Neutre)', '(dommages Neutre)');
	});
});
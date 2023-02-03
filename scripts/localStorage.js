const LS_NAMES = {
	'WAS_PLAYED': 'WAS_PLAYED',
	'THEME': 'THEME',
};

class LS {
	static get(key) {
		const value = localStorage.getItem(key) || null;
		return value && JSON.parse(value);
	}

	static set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static remove(key) {
		localStorage.removeItem(key);
	}
}
class LocalStorage {
	static has(key) {
		return localStorage.getItem(key);
	}

	static get(key) {
		if (!this.has(key)) return false;
		const value = localStorage.getItem(key);
		return value && (value[0] === '{' || value[0] === '[' ? JSON.parse(value) : value);
	}

	static set(key, value) {
		if (value === undefined) return false;
		if (typeof value === 'object') value = JSON.stringify(value);
		if (typeof value !== 'string') return false;
		localStorage.setItem(key, value);
	}

	static remove(key) {
		this.has(key) && localStorage.removeItem(key);
	}
}

export default LocalStorage;

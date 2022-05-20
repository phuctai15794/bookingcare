class Cookies {
	static get(name) {
		const nameEQ = `${name}=`;
		const ca = document.cookie.split(';');

		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}

		return null;
	}

	static set(name, value, days, path) {
		let expires = '';
		const path = `; path=${path || '/'}`;

		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = `; expires=${date.toGMTString()}`;
		}

		document.cookie = `${name}=${value}${expires}${path}`;
	}

	static remove(name) {
		this.set(name, '', -1);
	}
}

export default LocalStorage;

import moment from 'moment';

class Functions {
	static formatDate(input, format, option = '') {
		if (!input) return '';

		switch (option) {
			case 'unixValue':
				return moment.unix(input / 1000).format(format);

			default:
				return moment(input).format(format);
		}
	}
}

export default Functions;

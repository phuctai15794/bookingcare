import moment from 'moment';

class Functions {
	static formatDate(date, format) {
		return (date && format && moment(date).format(format)) || '';
	}
}

module.exports = Functions;

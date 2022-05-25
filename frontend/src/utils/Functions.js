import { Buffer } from 'buffer';
import moment from 'moment';
import 'moment/locale/vi';
import { LANGUAGES, DATE_FORMAT } from './Constants';
import NoImage from '../assets/images/noimage.png';

class Functions {
	static toBase64(file) {
		return (
			(file &&
				new Promise((resole, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resole(reader.result);
					reader.onerror = (error) => reject(error);
				})) ||
			''
		);
	}

	static bufferToBase64(buffer) {
		return (buffer && new Buffer.from(buffer, 'base64').toString('binary')) || '';
	}

	static formatDate(input, format, option = '') {
		let result = '';

		if (!input) return '';

		switch (option) {
			case 'startOfDay':
				result = moment(input).startOf('day').valueOf();
				break;
			default:
				result = format && moment(input).format(format);
				break;
		}

		return result;
	}

	static getDaysOfWeek(language = LANGUAGES.VI) {
		const result = [];

		if (language === LANGUAGES.VI) {
			moment.updateLocale(LANGUAGES.VI, {
				weekdays: DATE_FORMAT.DAYS_LOCALE[LANGUAGES.VI],
			});
		}

		for (let index = 0; index < 7; index++) {
			let day = {};
			day.label = moment(new Date()).locale(language).add(index, 'days').format('dddd - DD/MM');
			day.value = moment(new Date()).locale(language).add(index, 'days').startOf('day').valueOf();
			result.push(day);
		}

		return result;
	}

	static jsonParse(jsonString) {
		return jsonString && (jsonString[0] === '{' || jsonString[0] === '[' ? JSON.parse(jsonString) : jsonString);
	}

	static isEmail(str) {
		return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(str);
	}

	static isPhone(str) {
		return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(str);
	}

	static isAlphaNum(str) {
		return /^[a-zA-Z0-9]+$/.test(str);
	}

	static isNumber(numb) {
		return /^[0-9]+$/.test(numb);
	}

	static errorImage(target) {
		target.onerror = null;
		target.src = NoImage;
		return target;
	}
}

export default Functions;

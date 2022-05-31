import { Buffer } from 'buffer';
import moment from 'moment';
import 'moment/locale/vi';
import { DATE_FORMAT, LANGUAGES } from './Constants';
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

	static toCapitalizCase(str) {
		return str && str.length >= 2 && `${str[0].toUpperCase()}${str.slice(1)}`;
	}

	static formatPrice(price, language) {
		return (
			price &&
			(language === LANGUAGES.VI
				? `${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ`
				: `${price} USD`)
		);
	}

	static formatDate(input, format, option = '', language = LANGUAGES.VI) {
		let result = '';

		if (!input) return '';

		switch (option) {
			case 'startOfDay':
				result = moment(input).startOf('day').valueOf();
				break;
			case 'dayOfWeek':
				let isToday = moment(input).isSame(moment(), 'day');
				result =
					(isToday && moment(input).locale(language).calendar()) ||
					moment(input).locale(language).format(DATE_FORMAT.DAY_OF_WEEK);
				break;
			default:
				result = format && moment(input).format(format);
				break;
		}

		return result;
	}

	static getDaysOfWeek(language = LANGUAGES.VI) {
		const result = [];

		for (let index = 0; index < 7; index++) {
			let timeStamp = moment(new Date()).locale(language).add(index, 'days').startOf('day').valueOf();
			let isToday = moment(timeStamp).isSame(moment(), 'day');
			let day = {};
			day.label =
				(isToday && moment(new Date()).locale(language).add(index, 'days').calendar()) ||
				moment(new Date()).locale(language).add(index, 'days').format(DATE_FORMAT.DAY_OF_WEEK);
			day.value = timeStamp;
			result.push(day);
		}

		return result;
	}

	static jsonParse(jsonString) {
		return jsonString && (jsonString[0] === '{' || jsonString[0] === '[' ? JSON.parse(jsonString) : jsonString);
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

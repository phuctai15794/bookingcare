import { Buffer } from 'buffer';
import moment from 'moment';
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

	static formatDate(date, format) {
		return (date && format && moment(date).format(format)) || '';
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

	static errorImage(target) {
		target.onerror = null;
		target.src = NoImage;
		return target;
	}
}

export default Functions;

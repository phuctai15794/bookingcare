import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import juice from 'juice';

let sendAPI = async (data) => {
	// Create transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.MAIL_USER, // generated ethereal user
			pass: process.env.MAIL_PASSWORD, // generated ethereal password
		},
	});

	// Config options data
	let options = {
		from: `${process.env.APP_NAME} <${process.env.MAIL_USER}>`,
		to: data.to,
		subject: data.subject,
		attachments: (data.attachments && data.attachments.content !== '') || '',
	};
	const templatePath = path.resolve(`src/libraries/templates/${data.templateName}.html`);
	// const cssPath = path.resolve('src/public/email/styles.css');

	// Check if template is exist and send
	if (data.templateName && fs.existsSync(templatePath)) {
		// Read and render html
		const template = fs.readFileSync(templatePath, 'utf-8');
		const html = ejs.render(template, data.templateVars);

		// Options for juice
		// const juiceOptions = {
		// 	extraCss: fs.readFileSync(cssPath).toString()
		// };

		// Html template with Inline CSS
		options.html = juice(html);

		// Send mail
		return await transporter.sendMail(options);
	} else {
		return false;
	}
};

module.exports = {
	sendAPI,
};

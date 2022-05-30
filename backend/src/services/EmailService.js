import nodemailer from 'nodemailer';

let sendAPI = async (data) => {
	// Create transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		secure: process.env.MAIL_SECURE, // true for 465, false for other ports
		auth: {
			user: process.env.MAIL_USER, // generated ethereal user
			pass: process.env.MAIL_PASSWORD, // generated ethereal password
		},
	});

	// Send mail with defined transport object
	let info = await transporter.sendMail({
		from: `${process.env.APP_NAME} <${process.env.MAIL_USER}>`, // sender address
		to: data.to, // list of receivers
		subject: data.subject, // Subject line
		html: data.html, // html body
	});

	console.log(info);
};

module.exports = {
	sendAPI,
};

const nodeMailer = require('nodemailer');
const path = require('path');

const transporter = nodeMailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: 'glowbadge100@gmail.com',
		pass: 'preetiWedding',
	},
});

module.exports = sendEmail;

async function sendEmail({ from, to, subject, html }) {
	await transporter.sendMail({
		from,
		to,
		subject,
		html,
		attachments: [
			{
				// binary buffer as an attachment
				filename: 'sample.csv',
				path: './sample.csv',
			},
		],
	});
}

// Here we want to pull in nodemailer. Nodemailer is a npm module that is used
// to send mail
const nodemailer = require('nodemailer');

// This will be the credentials that are used for sending the email. The fields
// may change depending on the service provider, I am using 'gmail' just to
// keep it simple
// NOTE: To allow this app to access the gmail account, you have to allow the
// gmail email to be accessed by less secure apps
const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // These are the credentials for the 'DinnerTime' email
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}

// This sets up nodemailer with the credentials for when we call 'sendEmail()'
const transporter = nodemailer.createTransport(credentials);

module.exports = async(to, content) => {

    // This is the 'to' and 'from' for the email that will be sent.
    // NOTE: The 'to' email address is being passed in from 'email.js'
    const contacts = {
        from: process.env.MAIL_USER,
        to
    }

    // Put everything into one object that can be passed to nodemailer
    const email = Object.assign({}, content, contacts);

    await transporter.sendMail(email);
}

const nodemailer = require('nodemailer')
// require('dotenv').config()

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 2525,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL }
  await transport.sendMail(email)
  return true
}

module.exports = sendEmail

// const email = {
//   from: UKR_NET_EMAIL,
//   to: 'woligag986@pyadu.com',
//   subject: 'Verify email',
//   html: `<a href="">Click verify email</a>`,
// }

// transport
//   .sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message))

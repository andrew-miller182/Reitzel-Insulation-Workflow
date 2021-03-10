let nodemailer = require('nodemailer')
let config = require('./config')
let mailService = config.mailService
let mailUser = config.mailUser
let mailPassword = config.mailPassword

let sendEmailText = async (callback, _to, _subject, _text) => {
  let status = false
  let transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
  })

  let mailOptions = {
    from: mailUser,
    to: _to,
    subject: _subject,
    text: _text,
  }

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error)
    } else {
      status = true
      callback(status, info)
    }
  })
}

let sendEmailHtml = async (callback, _to, _subject, _html) => {
  let status = false
  let transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
  })

  let mailOptions = {
    from: mailUser,
    to: _to,
    subject: _subject,
    html: _html,
  }

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error)
    } else {
      status = true
      callback(status, info)
    }
  })
}

exports.sendEmailHtml = sendEmailHtml
exports.sendEmailText = sendEmailText

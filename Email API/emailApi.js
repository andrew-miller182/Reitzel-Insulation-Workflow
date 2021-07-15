let nodemailer = require('nodemailer')
let config = require('./config')
const { encrypt, decrypt } = require('../Encryption Api/crypto')
let mailService = config.mailService
let mailUser = config.mailUser
let mailPassword = decrypt(config.mailPassword)

//----------------------------------------------------Testing Starts
// const ajax = require('../Testing/sampleBase')
// const CircularJSON = require('circular-json')
//----------------------------------------------------Testing Ends

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

  //----------------------------Original Code
  let mailOptions = {
    from: mailUser,
    to: _to,
    subject: _subject,
    html: _html,
  }
  //----------------------------Original Code

  //----------------------------Testing Code

  // let htmlFile = await ajax.ajax('/', '', 'post')
  // let stringHtmlFile = CircularJSON.stringify(htmlFile)
  // console.log(stringHtmlFile)

  // let mailOptions = {
  //   from: mailUser,
  //   to: _to,
  //   subject: _subject,
  //   html: CircularJSON.parse(stringHtmlFile),
  //}

  //----------------------------Testing Code

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

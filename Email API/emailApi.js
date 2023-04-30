const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

let config = require('./config')
const { encrypt, decrypt } = require('../Encryption Api/crypto')
let mailService = config.mailService
let mailUser = config.mailUser
let mailPassword = decrypt(config.mailPassword)
const mailToken = require('./newToken.json');
const mailInfo = require('./client_secret_238053521559-rhi5n2kmf4vko9q23sjj55tnu3s7ht5t.apps.googleusercontent.com.json');

const oauth2Client = new OAuth2(
  mailInfo.web.client_id,
  mailInfo.web.client_secret,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:mailToken.refresh_token
});

const accessToken = oauth2Client.getAccessToken();
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
    /*
    name:"mail.google.com",
    host:"https://mail.google.com/",
    */
    tls: {
      rejectUnauthorized: false
      },      
    service: mailService,
    auth: {
      type:"OAuth2",
      user: mailUser,
      clientId:mailInfo.web.client_id,
      clientSecret:mailInfo.web.client_secret,
      refreshToken:mailToken.refresh_token,
      accessToken:accessToken
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
    console.log(info);
    if (error) {
      console.log(error)
    } else {
      status = true
      callback(status, info)
    }
    transporter.close();
  })
}

let sendEmailAttach = async (callback, _to, _subject, _html, _file) => {
  let status = false
  let transporter = nodemailer.createTransport({
    /*
    name:"mail.google.com",
    host:"https://mail.google.com/",
    */
    tls: {
      rejectUnauthorized: false
      },      
    service: mailService,
    auth: {
      type:"OAuth2",
      user: mailUser,
      clientId:mailInfo.web.client_id,
      clientSecret:mailInfo.web.client_secret,
      refreshToken:mailToken.refresh_token,
      accessToken:accessToken
    },
  })

  //----------------------------Original Code
  let mailOptions = {
    from: mailUser,
    to: _to,
    subject: _subject,
    html: _html,
    attachments:[
      {
        path:_file
      }
    ]
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
    console.log(info);
    if (error) {
      console.log(error)
    } else {
      status = true
      callback(status, info)
    }
    transporter.close();
  })
}

let sendEmailPdf = async (callback, _to, _subject, _html) => {
  let status = false
  let transporter = nodemailer.createTransport({

    tls: {
      rejectUnauthorized: false
      },      
    service: mailService,
    auth: {
      type:"OAuth2",
      user: mailUser,
      clientId:mailInfo.web.client_id,
      clientSecret:mailInfo.web.client_secret,
      refreshToken:mailToken.refresh_token,
      accessToken:accessToken
    },
  })

  //----------------------------Original Code
  let mailOptions = {
    from: mailUser,
    to: _to,
    subject: _subject,
    html: _html,
    attachments:[
      {
        path:'./insulation.pdf',
        file:'isulation.pdf'
      }
    ]
  }

  transporter.sendMail(mailOptions, async function (error, info) {
    console.log(info);
    if (error) {
      console.log(error)
    } else {
      status = true
      callback(status, info)
    }
    transporter.close();
  })
}

exports.sendEmailAttach = sendEmailAttach
exports.sendEmailHtml = sendEmailHtml
exports.sendEmailText = sendEmailText
exports.sendEmailPdf = sendEmailPdf
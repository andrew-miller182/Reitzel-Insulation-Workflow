const express = require('express')
var cors = require('cors');
const bodyParser = require('body-parser')
const { encrypt, decrypt } = require('./Encryption Api/crypto')
let myApi = require('./Database API//apiAsync')
let myEmailApi = require('./Email API/emailApi')
const app = express()
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit:"200mb"}))


app.get('/', cors(), async (req, res, next) => {
  res.send('Reitzel Server Running');
})

app.options('/fetchValues', cors());

app.post('/fetchValues', cors(), async (req, res, next) => {
  //let { tableName, columns, condition } = req.body
  
  let tableName = req.body.tableName
  let columns = req.body.columns || '*'
  let condition = req.body.condition || 'true'
  let output = await myApi.fetchValues(tableName, columns, condition)
  
  res.send(output);
})

app.post('/insertValues', async (req, res, next) => {
  // let { tableName, values } = req.body
  let tableName = req.body.tableName
  let values = req.body.values
  let output = await myApi.insertValues(tableName, values)
  res.send(output)
})

app.post('/updateValues', async (req, res, next) => {
  // let { tableName, columnsAndValues, condition } = req.body
  let tableName = req.body.tableName
  let columnsAndValues = req.body.columnsAndValues
  let condition = req.body.condition || 'true'
  let output = await myApi.updateValues(tableName, columnsAndValues, condition)
  res.send(output)
})

app.post('/deleteValues', async (req, res, next) => {
  // let { tableName, condition } = req.body
  let tableName = req.body.tableName
  let condition = req.body.condition || 'true'
  let output = await myApi.deleteValues(tableName, condition)
  res.send(output)
})

app.post('/processCustomQuery', async (req, res, next) => {
  let { sql } = req.body
  let output = await myApi.processCustomQuery(sql)
  res.send(output)
})

app.post('/sendEmailText', async (req, res, next) => {
  let { to, subject, text } = req.body
  await myEmailApi.sendEmailText(
    (status, info) => {
      if (status === true) {
        res.send('Email Sent: ' + JSON.stringify(info))
      } else {
        res.send('Error Occured: ' + JSON.stringify(info))
      }
    },
    to,
    subject,
    text,
  )
})

app.post('/sendEmailHtml', async (req, res, next) => {
  let { to, subject, html, file } = req.body
  await myEmailApi.sendEmailHtml(
    (status, info) => {
      if (status === true) {
        res.send('Email Sent: ' + JSON.stringify(info))
      } else {
        res.send('Error Occured: ' + JSON.stringify(info))
      }
    },
    to,
    subject,
    html
  )
})

app.post('/sendEmailAttach', async (req, res, next) => {
  let {to, subject, html, file} = req.body;
  await myEmailApi.sendEmailAttach(
    (status, info) => {
      if(status === true) {
        res.send('Email Sent: ' + JSON.stringify(info))
      } else {
        res.send('Error Occured: ' + JSON.stringify(info))
      }
      },
      to,
      subject,
      html,
      file
  )

})

app.post('/encrypt', async (req, res, next) => {
  let { data } = req.body
  res.send(encrypt(data))
})

app.post('/decrypt', async (req, res, next) => {
  let { data } = req.body
  res.send(decrypt(data))
})

app.listen(PORT, () => {
  console.log(`REITZEL Insulation server running on PORT ${PORT}`)
})

const express = require('express')
const bodyParser = require('body-parser')
const { encrypt, decrypt } = require('./Encryption Api/crypto')
let myApi = require('./Database API//apiAsync')
let myEmailApi = require('./Email API/emailApi')
const app = express()
const PORT = process.env.PORT || 5001;



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', async (req, res, next) => {
  res.send('Reitzel Server Running');
})

app.post('/fetchValues', async (req, res, next) => {
  //let { tableName, columns, condition } = req.body
  let tableName = req.body.tableName
  let columns = req.body.columns || '*'
  let condition = req.body.condition || 'true'
  let output = await myApi.fetchValues(tableName, columns, condition)
  res.send(output)
})

app.post('/insertValues', async (req, res) => {
  // let { tableName, values } = req.body
  let tableName = req.body.tableName
  let values = req.body.values
  let output = await myApi.insertValues(tableName, values)
  res.send(output)
})

app.post('/updateValues', async (req, res) => {
  // let { tableName, columnsAndValues, condition } = req.body
  let tableName = req.body.tableName
  let columnsAndValues = req.body.columnsAndValues
  let condition = req.body.condition || 'true'
  let output = await myApi.updateValues(tableName, columnsAndValues, condition)
  res.send(output)
})

app.post('/deleteValues', async (req, res) => {
  // let { tableName, condition } = req.body
  let tableName = req.body.tableName
  let condition = req.body.condition || 'true'
  let output = await myApi.deleteValues(tableName, condition)
  res.send(output)
})

app.post('/processCustomQuery', async (req, res) => {
  let { sql } = req.body
  let output = await myApi.processCustomQuery(sql)
  res.send(output)
})

app.post('/sendEmailText', async (req, res) => {
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

app.post('/sendEmailHtml', async (req, res) => {
  let { to, subject, html } = req.body
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
    html,
  )
})

app.post('/encrypt', async (req, res) => {
  let { data } = req.body
  res.send(encrypt(data))
})

app.post('/decrypt', async (req, res) => {
  let { data } = req.body
  res.send(decrypt(data))
})

app.listen(PORT, () => {
  console.log(`REITZEL Insulation server running on PORT ${PORT}`)
})

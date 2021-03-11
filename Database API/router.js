const express = require('express')
const bodyParser = require('body-parser')
var myApi = require('./apiAsync')
const app = express()
const port = 5001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/fetchValues', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

let mysql = require('mysql2/promise')

async function getConnection() {
  var conn = await mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b1604294bb6204',
    password: '452bd316',
    database: 'heroku_89c73764e572753',
  })

  return conn
}

let insertValues = async (tableName, values) => {
  var conn = await getConnection()

  let sql = 'INSERT INTO ' + tableName + ' VALUES (' + values + ')'
  var [rows] = await conn.query(sql)
  conn.release();
  return JSON.parse(JSON.stringify(rows))
  
}

let updateValues = async (tableName, columnsAndValues, condition) => {
  var conn = await getConnection()
  let sql =
    'UPDATE ' + tableName + ' SET ' + columnsAndValues + ' WHERE ' + condition
  var [rows] = await conn.query(sql);
  conn.release();
  return JSON.parse(JSON.stringify(rows))
}

let deleteValues = async (tableName, condition) => {
  var conn = await getConnection()
  let sql = 'DELETE FROM ' + tableName + ' WHERE ' + condition
  var [rows] = await conn.query(sql);
  conn.release();
  return JSON.parse(JSON.stringify(rows))
}

let fetchValues = async (tableName, columns, condition) => {
  var conn = await getConnection()
  let sql = 'SELECT ' + columns + ' FROM ' + tableName + ' WHERE ' + condition
  var [rows] = await conn.query(sql);
  conn.release();
  return JSON.parse(JSON.stringify(rows))
}

let processCustomQuery = async (sql) => {
  var conn = await getConnection()
  var [rows] = await conn.query(sql);
  conn.release();
  return JSON.parse(JSON.stringify(rows))
}

exports.insertValues = insertValues
exports.updateValues = updateValues
exports.fetchValues = fetchValues
exports.deleteValues = deleteValues
exports.processCustomQuery = processCustomQuery

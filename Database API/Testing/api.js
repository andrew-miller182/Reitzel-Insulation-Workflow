var mysql = require('mysql')

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reitzel_insulation',
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

let insertValues = (callback, tableName, values) => {
  var sql = 'INSERT INTO ' + tableName + ' VALUES ' + values
  con.query(sql, function (err, result) {
    if (err) callback(err, null)
    callback(null, result.affectedRows)
  })
}

let updateValues = (callback, tableName, columnsAndValues, condition) => {
  var sql =
    'UPDATE ' + tableName + ' SET ' + columnsAndValues + ' WHERE ' + condition
  con.query(sql, function (err, result) {
    if (err) callback(err, null)
    callback(null, result.affectedRows)
  })
}

let fetchValues = (callback, tableName, columns = '*', condition = '') => {
  con.query(
    'SELECT ' + columns + ' FROM ' + tableName + ' ' + condition,
    function (err, result) {
      if (err) callback(err, null)
      result = JSON.parse(JSON.stringify(result))
      callback(null, result)
    },
  )
}

exports.insertValues = insertValues
exports.updateValues = updateValues
exports.fetchValues = fetchValues

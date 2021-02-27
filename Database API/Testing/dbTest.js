var myApi = require('./Database API/api')

myApi.insertValues(
  function (err, rowsAffected) {
    if (err) throw err
    //Logic goes here..
    if (rowsAffected > 0) {
      console.log(rowsAffected + ' Rows Affected')
    } else {
      console.log('Some Issues')
    }
  },
  'Users',
  "(null,'sampleuser@gmail.com','sample','Manager')",
)

myApi.updateValues(
  function (err, rowsAffected) {
    if (err) throw err
    //Logic goes here...
    if (rowsAffected > 0) {
      console.log(rowsAffected + ' Rows Affected')
    } else {
      console.log('Some Issues')
    }
  },
  'Users',
  'SecurityLevel = "Admin"',
  'UserID = 20',
)

myApi.fetchValues(function (err, result) {
  if (err) throw err
  //Logic goes here...
  for (let i = 0; i < result.length; i++) {
    console.log(i + 1, result[i])
  }
}, 'Users')

myApi.fetchValues(
  function (err, result) {
    if (err) throw err
    //Logic goes here....
    console.log(result)
  },
  'Users',
  'Email,SecurityLevel',
)
